import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StateService } from '../../core/services/state.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Category, Customer, MenuItem, Order, OrderItem, OrderStatus, Table } from '../../core/models';
import { CreateOrderPayloadItem, GenerateBillResponse, OrderPaginationApiItem, OrderService, OrderTableApiItem } from '../../core/services/order.service';
import { CustomerApiItem, CustomerService } from '../../core/services/customer.service';
import { MenuApiItem, MenuService, MenuSearchResponse } from '../../core/services/menu.service';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

/** Line in the new-order cart (item + variant uniquely identifies a row). */
interface CartLine {
  key: string;
  itemId: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
  veg: boolean;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe, DecimalPipe, FormsModule, ApiLoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  orderApiIdByOrderNumber: Record<string, number> = {};
  orderMetaByOrderNumber: Record<string, { table_id: number; customer_id: number | null; notes: string; items: CreateOrderPayloadItem[] }> = {};
  isLoadingOrders = false;
  isCreatingOrder = false;
  isUpdatingOrder = false;
  cancellingOrderId: number | null = null;
  generatingBillOrderId: number | null = null;
  orderSearchInput = '';
  appliedOrderSearch = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  showAddModal = false;
  isEditingOrder = false;
  editingOrderId = 0;
  editingOrderNumber = '';
  tables: Table[] = [];
  captains = [] as typeof this.state.snapshot.staff;
  customers = [] as typeof this.state.snapshot.customers;
  menuItems = [] as typeof this.state.snapshot.menuItems;
  menuCategoryNameById: Record<string, string> = {};
  categories: Category[] = [];
  private menuSearch$ = new Subject<string>();

  menuSearch = '';
  cart: CartLine[] = [];
  orderNotes = '';

  /** GST rate shown in the new-order summary (matches dine-in POS preview). */
  readonly gstRate = 0.05;

  newOrder = {
    tableId: '',
    captainId: '',
    customerId: '',
  };

  constructor(
    private state: StateService,
    private auth: AuthService,
    private toast: ToastService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.tables = [...this.state.snapshot.tables];
    this.captains = this.state.snapshot.staff.filter(
      s => s.role === 'Captain' || s.role === 'Manager' || s.role === 'Admin',
    );
    this.customers = this.state.snapshot.customers;
    this.menuItems = this.state.snapshot.menuItems;
    this.categories = [...this.state.snapshot.categories].sort((a, b) => a.order - b.order);

    this.loadTables();
    this.loadCustomers();
    this.listenMenuSearch();
    this.loadMenuItems();
    this.loadOrders(1);
  }

  filteredOrders(): Order[] {
    return this.orders;
  }

  get hasNoOrders(): boolean {
    return !this.isLoadingOrders && this.orders.length === 0;
  }

  captainName(id: string): string {
    return this.state.snapshot.staff.find(s => s.id === id)?.name ?? id;
  }

  orderTotal(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  /** Default captain = logged-in staff when role fits; else first captain/manager in list. */
  defaultCaptainId(): string {
    const u = this.auth.currentUser;
    if (u && (u.role === 'Captain' || u.role === 'Manager' || u.role === 'Admin')) {
      const match = this.state.snapshot.staff.find(s => s.id === u.id);
      if (match) return match.id;
    }
    return this.captains[0]?.id ?? '';
  }

  tableOptionLabel(t: (typeof this.tables)[number]): string {
    return `${t.name} — ${t.zone} (${t.capacity} seats, ${t.status})`;
  }

  categoryName(categoryId: string): string {
    return this.menuCategoryNameById[categoryId] ?? this.categories.find(c => c.id === categoryId)?.name ?? categoryId;
  }

  filteredMenuItems(): MenuItem[] {
    return this.menuItems.filter(m => m.available);
  }

  menuGroupedByCategory(): { category: Category; items: MenuItem[] }[] {
    const groups = new Map<string, MenuItem[]>();
    for (const item of this.filteredMenuItems()) {
      const key = item.categoryId;
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    }
    return Array.from(groups.entries())
      .map(([categoryId, items]) => ({
        category: {
          id: categoryId,
          name: this.categoryName(categoryId),
          description: '',
          icon: '',
          order: 0,
          active: true,
          gstRate: 0,
        },
        items: items.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.category.name.localeCompare(b.category.name));
  }

  /** One-line subtitle under menu item name (description, not variant chips). */
  itemSubtitle(item: MenuItem): string {
    const d = item.description?.trim() ?? '';
    if (!d) return '';
    return d.length > 90 ? `${d.slice(0, 87)}…` : d;
  }

  /** Adds one line per menu item; uses first configured variant for KOT/billing. */
  addItemToCart(item: MenuItem): void {
    const variant = item.variants[0] ?? 'Standard';
    const key = item.id;
    const idx = this.cart.findIndex(l => l.key === key);
    if (idx >= 0) {
      const copy = [...this.cart];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
      this.cart = copy;
    } else {
      this.cart = [
        ...this.cart,
        {
          key,
          itemId: item.id,
          name: item.name,
          variant,
          qty: 1,
          price: item.price,
          veg: item.veg,
        },
      ];
    }
  }

  adjustCartQty(line: CartLine, delta: number): void {
    const idx = this.cart.findIndex(l => l.key === line.key);
    if (idx < 0) return;
    const nextQty = this.cart[idx].qty + delta;
    if (nextQty < 1) {
      this.cart = this.cart.filter(l => l.key !== line.key);
    } else {
      const copy = [...this.cart];
      copy[idx] = { ...copy[idx], qty: nextQty };
      this.cart = copy;
    }
  }

  cartSubtotal(): number {
    return this.cart.reduce((s, l) => s + l.price * l.qty, 0);
  }

  cartGstAmount(): number {
    return this.cartSubtotal() * this.gstRate;
  }

  cartGrandTotal(): number {
    return this.cartSubtotal() + this.cartGstAmount();
  }

  openAddModal(): void {
    this.menuSearch = '';
    this.cart = [];
    this.orderNotes = '';
    this.isEditingOrder = false;
    this.editingOrderId = 0;
    this.editingOrderNumber = '';
    this.loadTables();
    this.loadCustomers();
    this.loadMenuItems();
    this.newOrder = {
      tableId: this.tables[0]?.id ?? '',
      captainId: this.defaultCaptainId(),
      customerId: '',
    };
    this.showAddModal = true;
  }

  onMenuSearchChange(value: string): void {
    this.menuSearch$.next(value);
  }

  applyOrderSearch(): void {
    this.appliedOrderSearch = this.orderSearchInput.trim();
    this.loadOrders(1);
  }

  clearOrderSearch(): void {
    if (!this.orderSearchInput && !this.appliedOrderSearch) return;
    this.orderSearchInput = '';
    this.appliedOrderSearch = '';
    this.loadOrders(1);
  }

  hasActiveOrderSearch(): boolean {
    return !!this.orderSearchInput || !!this.appliedOrderSearch;
  }

  prevOrderPage(): void {
    if (this.currentPage <= 1 || this.isLoadingOrders) return;
    this.loadOrders(this.currentPage - 1);
  }

  nextOrderPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoadingOrders) return;
    this.loadOrders(this.currentPage + 1);
  }

  openEditOrderModal(order: Order): void {
    const orderId = this.orderApiIdByOrderNumber[order.id];
    const meta = this.orderMetaByOrderNumber[order.id];
    if (!orderId || !meta) {
      this.toast.show('Unable to identify order details', 'warning');
      return;
    }
    this.menuSearch = '';
    this.loadTables();
    this.loadCustomers();
    this.loadMenuItems();
    this.isEditingOrder = true;
    this.editingOrderId = orderId;
    this.editingOrderNumber = order.id;
    this.newOrder = {
      tableId: String(meta.table_id),
      captainId: this.defaultCaptainId(),
      customerId: meta.customer_id != null ? String(meta.customer_id) : '',
    };
    this.orderNotes = meta.notes || '';
    this.cart = meta.items.map(item => {
      const menu = this.menuItems.find(m => Number(m.id) === item.menu_item_id);
      return {
        key: String(item.menu_item_id),
        itemId: String(item.menu_item_id),
        name: menu?.name || `Item ${item.menu_item_id}`,
        variant: 'Standard',
        qty: Math.max(1, Number(item.quantity) || 1),
        price: menu?.price ?? 0,
        veg: menu?.veg ?? false,
      };
    });
    this.showAddModal = true;
  }

  cancelOrder(order: Order): void {
    if (this.cancellingOrderId !== null) return;
    const apiOrderId = this.orderApiIdByOrderNumber[order.id];
    if (!apiOrderId) {
      this.toast.show('Unable to identify order to cancel', 'warning');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `This action will cancel order "${order.id}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (!result.isConfirmed) return;
      this.cancellingOrderId = apiOrderId;
      this.orderService.cancelOrder(apiOrderId).subscribe({
        next: () => {
          this.toast.show(`Order ${order.id} cancelled`);
          this.cancellingOrderId = null;
          this.loadOrders(this.currentPage);
        },
        error: (err: HttpErrorResponse) => {
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to cancel order.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
          this.cancellingOrderId = null;
        },
      });
    });
  }

  generateBill(order: Order): void {
    if (this.generatingBillOrderId !== null) return;
    const apiOrderId = this.orderApiIdByOrderNumber[order.id];
    if (!apiOrderId) {
      this.toast.show('Unable to identify order for bill generation', 'warning');
      return;
    }
    this.generatingBillOrderId = apiOrderId;
    this.orderService.generateBill({ order_id: apiOrderId }).subscribe({
      next: (response: GenerateBillResponse) => {
        this.generatingBillOrderId = null;
        const statusCode = response?.statusCode;
        if (statusCode !== undefined && statusCode !== 200 && statusCode !== 201) {
          this.toast.show(response?.message || 'Failed to generate bill', 'warning');
          return;
        }
        this.toast.show(response?.message || `Bill generated for ${order.id}`);
      },
      error: (err: HttpErrorResponse) => {
        this.generatingBillOrderId = null;
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to generate bill.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  placeOrder(): void {
    if (this.isEditingOrder) {
      this.updateOrderFromModal();
      return;
    }
    if (!this.newOrder.tableId || !this.newOrder.captainId || this.cart.length === 0) {
      this.toast.show('Choose a table and add at least one item', 'warning');
      return;
    }
    const orderItemsPayload: CreateOrderPayloadItem[] = this.cart
      .map(line => {
        const menuItemId = Number(line.itemId);
        if (!Number.isInteger(menuItemId) || menuItemId <= 0) {
          return null;
        }
        return {
          menu_item_id: menuItemId,
          quantity: Math.max(1, Number(line.qty) || 1),
          special_instructions: '',
        };
      })
      .filter((item): item is CreateOrderPayloadItem => item !== null);

    if (orderItemsPayload.length === 0) {
      this.toast.show('Please add valid menu items before placing order', 'warning');
      return;
    }

    const tableIdForApi = Number(this.newOrder.tableId);
    if (!Number.isInteger(tableIdForApi) || tableIdForApi <= 0) {
      this.toast.show('Invalid table selected', 'warning');
      return;
    }

    const customerIdForApi = this.newOrder.customerId ? Number(this.newOrder.customerId) : 0;
    const payload = {
      table_id: tableIdForApi,
      customer_id: Number.isInteger(customerIdForApi) && customerIdForApi > 0 ? customerIdForApi : 0,
      notes: this.orderNotes || '',
      is_urgent: false,
      totalAmount: this.cartGrandTotal(),
      items: orderItemsPayload,
    };
    this.isCreatingOrder = true;
    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.isCreatingOrder = false;
        this.handleCreateOrderSuccess();
      },
      error: (err: HttpErrorResponse) => {
        this.isCreatingOrder = false;
        const apiMessage =
          err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to place order.';
        const prefix = err.status ? `Error ${err.status}: ` : '';
        this.toast.show(`${prefix}${apiMessage}`, 'error');
      },
    });
  }

  private handleCreateOrderSuccess(): void {
    this.toast.show('Order placed successfully');
    this.showAddModal = false;
    this.loadOrders(1);
  }

  private updateOrderFromModal(): void {
    if (this.isUpdatingOrder) return;
    const tableId = Number(this.newOrder.tableId);
    if (!Number.isInteger(tableId) || tableId <= 0) {
      this.toast.show('Please select a valid table', 'warning');
      return;
    }
    const items = this.cart
      .map(line => ({
        menu_item_id: Number(line.itemId),
        quantity: Math.max(1, Number(line.qty) || 1),
        special_instructions: '',
      }))
      .filter(item => Number.isInteger(item.menu_item_id) && item.menu_item_id > 0);
    if (items.length === 0) {
      this.toast.show('Add at least one valid item in order', 'warning');
      return;
    }
    const customerId = this.newOrder.customerId ? Number(this.newOrder.customerId) : 0;
    this.isUpdatingOrder = true;
    this.orderService
      .updateOrder(this.editingOrderId, {
        table_id: tableId,
        customer_id: Number.isInteger(customerId) && customerId > 0 ? customerId : 0,
        notes: this.orderNotes || '',
        items,
      })
      .subscribe({
        next: () => {
          this.toast.show('Order updated successfully');
          this.showAddModal = false;
          this.isUpdatingOrder = false;
          this.loadOrders(this.currentPage);
        },
        error: (err: HttpErrorResponse) => {
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to update order.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
          this.isUpdatingOrder = false;
        },
      });
  }

  private loadTables(): void {
    this.orderService
      .getAllTables()
      .pipe(
        map(response => response.data ?? []),
        map(items => items.map(item => this.toUiTable(item))),
        catchError(() => {
          this.toast.show('Unable to load tables from server. Showing local list.', 'warning');
          return of([...this.state.snapshot.tables]);
        }),
      )
      .subscribe(tables => {
        this.tables = tables;
        if (!tables.some(t => t.id === this.newOrder.tableId)) {
          this.newOrder.tableId = tables[0]?.id ?? '';
        }
      });
  }

  private toUiTable(item: OrderTableApiItem): Table {
    return {
      id: String(item.id),
      name: `Table ${item.table_number}`,
      capacity: item.seating_capacity,
      zone: item.zone?.name ?? 'General',
      shape: 'rectangle',
      status: this.normalizeTableStatus(item.status),
      notes: '',
      mergedWith: null,
    };
  }

  private normalizeTableStatus(status: string): Table['status'] {
    const value = status.trim().toLowerCase();
    if (value === 'available') return 'Available';
    if (value === 'occupied') return 'Occupied';
    if (value === 'reserved') return 'Reserved';
    if (value === 'cleaning') return 'Cleaning';
    return 'Available';
  }

  private loadCustomers(): void {
    this.customerService
      .getAllCustomers()
      .pipe(
        map(response => response.data ?? []),
        map(items => items.map(item => this.toUiCustomer(item))),
        catchError(() => {
          this.toast.show('Unable to load customers from server. Showing local list.', 'warning');
          return of([...this.state.snapshot.customers]);
        }),
      )
      .subscribe(customers => {
        this.customers = customers;
        if (this.newOrder.customerId && !customers.some(c => c.id === this.newOrder.customerId)) {
          this.newOrder.customerId = '';
        }
      });
  }

  private toUiCustomer(item: CustomerApiItem): Customer {
    return {
      id: String(item.id),
      name: item.name,
      phone: item.phone ?? '',
      email: item.email ?? '',
      address: item.address ?? '',
      dob: item.date_of_birth ?? '',
      notes: item.notes ?? '',
      type: this.normalizeCustomerType(item.customer_type),
      regDate: item.registered_at ?? '',
      active: item.is_active ?? true,
    };
  }

  private normalizeCustomerType(type: string): Customer['type'] {
    const value = type.trim().toLowerCase();
    if (value === 'vip') return 'VIP';
    if (value === 'regular') return 'Regular';
    return 'New';
  }

  private listenMenuSearch(): void {
    this.menuSearch$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(search =>
          this.menuService.getAllWithSearch(search).pipe(
            catchError(() => {
              this.toast.show('Unable to load menu items from server.', 'warning');
              return of({
                success: false,
                statusCode: 500,
                message: 'Menu API request failed',
                data: [],
              } as MenuSearchResponse);
            }),
          ),
        ),
      )
      .subscribe(response => this.handleMenuResponse(response));
  }

  private loadMenuItems(): void {
    this.menuService
      .getAllWithSearch(this.menuSearch)
      .pipe(
        catchError(() => {
          this.toast.show('Unable to load menu items from server. Showing local list.', 'warning');
          return of(null);
        }),
      )
      .subscribe(response => {
        if (!response) {
          this.menuItems = [...this.state.snapshot.menuItems];
          return;
        }
        this.handleMenuResponse(response);
      });
  }

  private handleMenuResponse(response: MenuSearchResponse): void {
    if (!response.success || response.statusCode !== 200) {
      this.toast.show(response.message || 'Could not load menu items.', 'warning');
      this.menuItems = [];
      this.menuCategoryNameById = {};
      return;
    }
    const mapped = response.data.map(item => this.toUiMenuItem(item));
    this.menuItems = mapped.filter(item => item.available);
    const categoryById: Record<string, string> = {};
    for (const item of response.data) {
      categoryById[String(item.category_id)] = item.category_name?.trim() || `Category ${item.category_id}`;
    }
    this.menuCategoryNameById = categoryById;
  }

  private loadOrders(page: number): void {
    this.isLoadingOrders = true;
    this.orderService
      .getOrders({
        page,
        limit: this.pageSize,
        search: this.appliedOrderSearch || undefined,
      })
      .subscribe({
        next: response => {
          this.isLoadingOrders = false;
          if (!response?.success || response?.statusCode !== 200) {
            this.toast.show(response?.message || 'Could not load orders.', 'warning');
            this.orders = [];
            this.totalRecords = 0;
            this.totalPages = 1;
            return;
          }
          const rows = Array.isArray(response.data) ? response.data : [];
          this.orderApiIdByOrderNumber = {};
          this.orderMetaByOrderNumber = {};
          for (const row of rows) {
            this.orderApiIdByOrderNumber[row.order_number] = row.id;
            this.orderMetaByOrderNumber[row.order_number] = {
              table_id: row.table_id,
              customer_id: row.customer_id,
              notes: row.notes ?? '',
              items: (row.item_details ?? []).map(detail => ({
                menu_item_id: detail.menu_item_id,
                quantity: detail.quantity,
                special_instructions: '',
              })),
            };
          }
          this.orders = rows.map(row => this.toUiOrder(row));
          this.currentPage = response.meta?.page ?? page;
          this.pageSize = response.meta?.limit ?? this.pageSize;
          this.totalRecords = response.meta?.total ?? this.orders.length;
          this.totalPages = Math.max(
            1,
            response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize),
          );
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingOrders = false;
          this.orders = [];
          const apiMessage =
            err.error?.message || err.error?.errors?.[0] || err.message || 'Failed to load orders.';
          const prefix = err.status ? `Error ${err.status}: ` : '';
          this.toast.show(`${prefix}${apiMessage}`, 'error');
        },
      });
  }

  private toUiOrder(item: OrderPaginationApiItem): Order {
    return {
      id: item.order_number || `ORD-${item.id}`,
      tableId: item.table_name || `Table ${item.table_id}`,
      captainId: String(item.captain_id ?? ''),
      customerId: item.customer_id != null ? String(item.customer_id) : null,
      status: this.normalizeOrderStatus(item.status),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      items: (item.item_details ?? []).map(detail => this.toUiOrderItem(detail.menu_item_id, detail.menu_item_name, detail.quantity, detail.unit_price)),
    };
  }

  private toUiOrderItem(menuItemId: number, name: string, quantity: number, unitPrice: number): OrderItem {
    return {
      itemId: String(menuItemId),
      name: name || `Item ${menuItemId}`,
      variant: 'Standard',
      qty: quantity || 0,
      price: unitPrice || 0,
      instructions: '',
      status: 'Pending',
    };
  }

  private normalizeOrderStatus(status: string): OrderStatus {
    const value = status?.trim().toLowerCase();
    if (value === 'pending') return 'Pending';
    if (value === 'preparing') return 'Preparing';
    if (value === 'served') return 'Served';
    if (value === 'cancelled') return 'Cancelled';
    return 'Completed';
  }

  private toUiMenuItem(item: MenuApiItem): MenuItem {
    const spice = item.spice_level;
    return {
      id: String(item.id),
      name: item.name,
      sku: item.sku ?? '',
      categoryId: String(item.category_id),
      description: item.description ?? '',
      price: item.base_price,
      prepTime: item.prep_time_minutes,
      veg: item.food_type === 'veg',
      spiceLevel: spice === null ? null : spice <= 1 ? 'mild' : spice <= 3 ? 'medium' : spice <= 4 ? 'hot' : 'extra-hot',
      chefSpecial: item.is_chef_special,
      isNew: false,
      available: item.is_available && !item.is_archived,
      station: 'Kitchen',
      variants: ['Standard'],
    };
  }
}
