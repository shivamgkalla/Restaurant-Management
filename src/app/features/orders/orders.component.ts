import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, LowerCasePipe, UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Category, Customer, MenuItem, Order, OrderItem, OrderStatus, Table } from '../../core/models';
import { OrderService, OrderTableApiItem } from '../../core/services/order.service';
import { CustomerApiItem, CustomerService } from '../../core/services/customer.service';
import { MenuApiItem, MenuService, MenuSearchResponse } from '../../core/services/menu.service';

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
  imports: [AsyncPipe, NgFor, NgIf, LowerCasePipe, UpperCasePipe, DatePipe, DecimalPipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  filters = ['All', 'Pending', 'Preparing', 'Served', 'Completed'];
  private activeFilter$ = new BehaviorSubject<string>('All');
  selectedOrder: Order | null = null;
  filteredOrders$!: Observable<Order[]>;
  showAddModal = false;
  tables: Table[] = [];
  captains = [] as typeof this.state.snapshot.staff;
  customers = [] as typeof this.state.snapshot.customers;
  menuItems = [] as typeof this.state.snapshot.menuItems;
  menuCategoryNameById: Record<string, string> = {};
  categories: Category[] = [];
  private menuSearch$ = new Subject<string>();

  menuSearch = '';
  cart: CartLine[] = [];

  /** GST rate shown in the new-order summary (matches dine-in POS preview). */
  readonly gstRate = 0.05;

  newOrder = {
    tableId: '',
    captainId: '',
    customerId: '',
  };

  get activeFilter(): string {
    return this.activeFilter$.value;
  }
  set activeFilter(v: string) {
    this.activeFilter$.next(v);
  }

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
    this.filteredOrders$ = combineLatest([this.state.select('orders'), this.activeFilter$]).pipe(
      map(([orders, filter]) => (filter === 'All' ? orders : orders.filter(o => o.status === filter))),
    );

    this.loadTables();
    this.loadCustomers();
    this.listenMenuSearch();
    this.loadMenuItems();
  }

  countByStatus(status: string): Observable<number> {
    return this.state.select('orders').pipe(map(orders => orders.filter(o => o.status === status).length));
  }

  captainName(id: string): string {
    return this.state.snapshot.staff.find(s => s.id === id)?.name ?? id;
  }

  orderTotal(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  canAdvance(order: Order): boolean {
    return ['Pending', 'Preparing', 'Served'].includes(order.status);
  }

  nextStatus(status: OrderStatus): string {
    const nextMap: Partial<Record<OrderStatus, string>> = {
      Pending: 'Preparing',
      Preparing: 'Served',
      Served: 'Completed',
    };
    return nextMap[status] ?? '';
  }

  advance(order: Order): void {
    const next = this.nextStatus(order.status) as OrderStatus;
    if (!next) return;
    this.state.updateOrder({ ...order, status: next, updatedAt: new Date().toISOString() });
    this.toast.show(`Order ${order.id} → ${next}`);
  }

  viewOrder(order: Order): void {
    this.selectedOrder = order;
  }

  orderNotes(order: Order): string {
    return order.items.map(i => i.instructions).filter(s => !!s).join(' | ');
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

  placeOrder(): void {
    if (!this.newOrder.tableId || !this.newOrder.captainId || this.cart.length === 0) {
      this.toast.show('Choose a table and add at least one item', 'warning');
      return;
    }
    const now = new Date().toISOString();
    const id = `ORD-${String(this.state.snapshot.orders.length + 1).padStart(4, '0')}`;
    const items: OrderItem[] = this.cart.map(line => ({
      itemId: line.itemId,
      name: line.name,
      variant: line.variant,
      qty: line.qty,
      price: line.price,
      instructions: '',
      status: 'Pending',
    }));
    this.state.addOrder({
      id,
      tableId: this.newOrder.tableId,
      captainId: this.newOrder.captainId,
      customerId: this.newOrder.customerId || null,
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
      items,
    });
    this.toast.show(`Order ${id} placed`);
    this.showAddModal = false;
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
