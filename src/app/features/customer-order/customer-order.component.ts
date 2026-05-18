import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { CustomerAuthService } from '../../core/services/customer-auth.service';
import {
  CustomerCategoryApiItem,
  CustomerMenuApiItem,
  CustomerMenuService,
} from '../../core/services/customer-menu.service';
import {
  CustomerCreateOrderItem,
  CustomerCreateOrderResponse,
  CustomerOrderApi,
  CustomerOrderService,
} from '../../core/services/customer-order.service';

type CustomerView = 'menu' | 'orders' | 'order-detail';
import { MenuItem, SpiceLevel } from '../../core/models';
import { ApiLoaderComponent } from '../../shared/components/api-loader/api-loader.component';

interface CartItem {
  item: MenuItem;
  qty: number;
}

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, NgClass, FormsModule, DecimalPipe, DatePipe, ApiLoaderComponent],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css',
})
export class CustomerOrderComponent implements OnInit {
  categories: CustomerCategoryApiItem[] = [];
  menuItems: MenuItem[] = [];
  /** Empty string = all categories (matches menu management filter). */
  selectedCategoryId = '';
  searchInput = '';
  private appliedSearch = '';
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;
  totalRecords = 0;
  isLoadingCategories = false;
  isLoadingItems = false;
  isPlacingOrder = false;
  isLoadingOrders = false;
  isLoadingOrderDetail = false;
  activeView: CustomerView = 'menu';
  orders: CustomerOrderApi[] = [];
  selectedOrder: CustomerOrderApi | null = null;
  cart: CartItem[] = [];
  drawerOpen = false;
  orderPlaced = false;
  confirmedOrderId = '';

  constructor(
    private toast: ToastService,
    private customerAuth: CustomerAuthService,
    private customerMenuService: CustomerMenuService,
    private customerOrderService: CustomerOrderService,
  ) {}

  get customerName(): string {
    return this.customerAuth.currentCustomer?.name ?? '';
  }

  get showLoader(): boolean {
    return (
      this.isLoadingCategories ||
      this.isLoadingItems ||
      this.isPlacingOrder ||
      this.isLoadingOrders ||
      this.isLoadingOrderDetail
    );
  }

  get loaderMessage(): string {
    if (this.isPlacingOrder) return 'Placing your order…';
    if (this.isLoadingOrderDetail) return 'Loading order details…';
    if (this.isLoadingOrders) return 'Loading your orders…';
    return 'Loading menu…';
  }

  get hasNoOrders(): boolean {
    return !this.isLoadingOrders && this.orders.length === 0;
  }

  get hasActiveSearch(): boolean {
    return !!this.appliedSearch;
  }

  get hasNoMenuItems(): boolean {
    return !this.isLoadingItems && this.menuItems.length === 0;
  }

  customerLogout(): void {
    this.customerAuth.logout();
  }

  openOrderHistory(): void {
    const customer = this.customerAuth.currentCustomer;
    if (!customer?.id) {
      this.toast.show('Please sign in to view order history.', 'warning');
      return;
    }
    this.activeView = 'orders';
    this.selectedOrder = null;
    this.loadMyOrders(customer.id);
  }

  closeOrderHistory(): void {
    this.activeView = 'menu';
    this.selectedOrder = null;
    this.orders = [];
  }

  backToOrderList(): void {
    this.activeView = 'orders';
    this.selectedOrder = null;
  }

  openOrderDetail(order: CustomerOrderApi): void {
    if (!order?.id) return;
    this.isLoadingOrderDetail = true;
    this.customerOrderService.getOrderById(order.id).subscribe({
      next: response => {
        this.isLoadingOrderDetail = false;
        if (!this.isSuccessResponse(response?.statusCode, response?.success) || !response.data) {
          this.toast.show(response?.message || 'Failed to load order details.', 'warning');
          return;
        }
        this.selectedOrder = response.data;
        this.activeView = 'order-detail';
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingOrderDetail = false;
        this.toast.show(this.apiErrorMessage(err, 'Failed to load order details.'), 'error');
      },
    });
  }

  orderLineTotal(item: { quantity: number; unit_price: number }): number {
    return item.quantity * item.unit_price;
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  statusClass(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'completed') return 'co-status-completed';
    if (s === 'pending') return 'co-status-pending';
    if (s === 'cancelled' || s === 'canceled') return 'co-status-cancelled';
    return 'co-status-default';
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadMenuItems(1);
  }

  applySearch(): void {
    this.appliedSearch = this.searchInput.trim();
    this.loadMenuItems(1);
  }

  clearSearch(): void {
    if (!this.searchInput && !this.appliedSearch) return;
    this.searchInput = '';
    this.appliedSearch = '';
    this.loadMenuItems(1);
  }

  onCategoryChange(): void {
    this.loadMenuItems(1);
  }

  prevPage(): void {
    if (this.currentPage <= 1 || this.isLoadingItems) return;
    this.loadMenuItems(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages || this.isLoadingItems) return;
    this.loadMenuItems(this.currentPage + 1);
  }

  cartQty(item: MenuItem): number {
    return this.cart.find(e => e.item.id === item.id)?.qty ?? 0;
  }

  addToCart(item: MenuItem): void {
    if (!item.available) return;
    const entry = this.cart.find(e => e.item.id === item.id);
    if (entry) entry.qty++;
    else this.cart.push({ item, qty: 1 });
  }

  removeFromCart(item: MenuItem): void {
    const idx = this.cart.findIndex(e => e.item.id === item.id);
    if (idx === -1) return;
    if (this.cart[idx].qty > 1) this.cart[idx].qty--;
    else this.cart.splice(idx, 1);
  }

  get totalQty(): number {
    return this.cart.reduce((s, e) => s + e.qty, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((s, e) => s + e.item.price * e.qty, 0);
  }

  placeOrder(): void {
    if (this.isPlacingOrder || this.cart.length === 0) return;

    const customer = this.customerAuth.currentCustomer;
    if (!customer?.id) {
      this.toast.show('Please sign in to place an order.', 'warning');
      return;
    }

    const items = this.buildOrderItemsPayload();
    if (items.length === 0) {
      this.toast.show('Please add valid menu items before placing order.', 'warning');
      return;
    }

    this.isPlacingOrder = true;
    this.customerOrderService
      .createOrder({
        customer_id: customer.id,
        notes: '',
        is_urgent: false,
        items,
      })
      .subscribe({
        next: (response) => {
          this.isPlacingOrder = false;
          if (!this.isSuccessResponse(response?.statusCode, response?.success)) {
            this.toast.show(response?.message || 'Failed to place order.', 'warning');
            return;
          }
          this.confirmedOrderId = this.parseConfirmedOrderId(response);
          this.orderPlaced = true;
          this.drawerOpen = false;
          this.cart = [];
          this.toast.show(response?.message || 'Order placed successfully!');
        },
        error: (err: HttpErrorResponse) => {
          this.isPlacingOrder = false;
          this.toast.show(this.apiErrorMessage(err, 'Failed to place order.'), 'error');
        },
      });
  }

  private buildOrderItemsPayload(): CustomerCreateOrderItem[] {
    return this.cart
      .map(entry => {
        const menuItemId = Number(entry.item.id);
        if (!Number.isInteger(menuItemId) || menuItemId <= 0) {
          return null;
        }
        return {
          menu_item_id: menuItemId,
          quantity: Math.max(1, entry.qty),
          special_instructions: '',
        };
      })
      .filter((item): item is CustomerCreateOrderItem => item !== null);
  }

  private parseConfirmedOrderId(response: CustomerCreateOrderResponse): string {
    const data = response?.data;
    if (data && typeof data === 'object') {
      const orderNumber = data.order_number != null ? String(data.order_number).trim() : '';
      if (orderNumber) return orderNumber;
      if (data.id != null) return String(data.id);
    }
    return 'ONLINE-' + Date.now().toString(36).toUpperCase();
  }

  resetOrder(): void {
    this.cart = [];
    this.orderPlaced = false;
    this.confirmedOrderId = '';
  }

  private loadMyOrders(customerId: number): void {
    this.isLoadingOrders = true;
    this.orders = [];
    this.customerOrderService.getMyOrders(customerId).subscribe({
      next: response => {
        this.isLoadingOrders = false;
        if (!this.isSuccessResponse(response?.statusCode, response?.success)) {
          this.toast.show(response?.message || 'Failed to load orders.', 'warning');
          this.orders = [];
          return;
        }
        const rows = Array.isArray(response.data) ? response.data : [];
        this.orders = rows.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingOrders = false;
        this.orders = [];
        this.toast.show(this.apiErrorMessage(err, 'Failed to load orders.'), 'error');
      },
    });
  }

  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.customerMenuService.getCategories().subscribe({
      next: (response) => {
        this.isLoadingCategories = false;
        if (!this.isSuccessResponse(response?.statusCode, response?.success)) {
          this.toast.show(response?.message || 'Failed to load categories', 'warning');
          this.categories = [];
          return;
        }
        this.categories = Array.isArray(response.data)
          ? response.data.filter(c => c.is_active !== false)
          : [];
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingCategories = false;
        this.categories = [];
        this.toast.show(this.apiErrorMessage(err, 'Failed to load categories'), 'error');
      },
    });
  }

  private loadMenuItems(page: number): void {
    this.isLoadingItems = true;
    const categoryId = this.parseCategoryFilter();
    this.customerMenuService
      .getMenuItems({
        page,
        limit: this.pageSize,
        search: this.appliedSearch || undefined,
        category_id: categoryId,
      })
      .subscribe({
        next: (response) => {
          this.isLoadingItems = false;
          if (!this.isSuccessResponse(response?.statusCode, response?.success)) {
            this.toast.show(response?.message || 'Failed to load menu items', 'warning');
            this.menuItems = [];
            this.totalRecords = 0;
            this.totalPages = 1;
            this.currentPage = 1;
            return;
          }
          const rows = Array.isArray(response.data) ? response.data : [];
          this.menuItems = rows.map(row => this.mapMenuItem(row));
          this.currentPage = response.meta?.page ?? page;
          this.pageSize = response.meta?.limit ?? this.pageSize;
          this.totalPages = Math.max(1, response.meta?.total_pages ?? 1);
          this.totalRecords = response.meta?.total ?? rows.length;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingItems = false;
          this.menuItems = [];
          this.totalRecords = 0;
          this.totalPages = 1;
          this.toast.show(this.apiErrorMessage(err, 'Failed to load menu items'), 'error');
        },
      });
  }

  private parseCategoryFilter(): number | null {
    const raw = String(this.selectedCategoryId ?? '').trim();
    if (!raw) return null;
    const id = Number(raw);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private mapMenuItem(item: CustomerMenuApiItem): MenuItem {
    const spice = item.spice_level;
    let spiceLevel: SpiceLevel | null = null;
    if (spice !== null && spice !== undefined) {
      if (spice <= 1) spiceLevel = 'mild';
      else if (spice <= 3) spiceLevel = 'medium';
      else if (spice <= 4) spiceLevel = 'hot';
      else spiceLevel = 'extra-hot';
    }
    return {
      id: String(item.id),
      name: item.name,
      sku: item.sku ?? '',
      categoryId: String(item.category_id),
      description: item.description ?? '',
      price: item.base_price,
      prepTime: item.prep_time_minutes,
      veg: item.food_type === 'veg',
      spiceLevel,
      chefSpecial: item.is_chef_special,
      isNew: false,
      available: item.is_available && !item.is_archived,
      station: 'Kitchen',
      variants: ['Standard'],
    };
  }

  private isSuccessResponse(statusCode?: number, success?: boolean): boolean {
    if (success === false) return false;
    if (statusCode === undefined) return true;
    return statusCode === 200 || statusCode === 201;
  }

  private apiErrorMessage(err: HttpErrorResponse, fallback: string): string {
    const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || fallback;
    return apiMessage?.trim() || fallback;
  }
}
