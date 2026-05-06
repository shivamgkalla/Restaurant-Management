import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, LowerCasePipe, UpperCasePipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../../core/services/state.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Category, MenuItem, Order, OrderItem, OrderStatus } from '../../core/models';

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
  tables = [] as typeof this.state.snapshot.tables;
  captains = [] as typeof this.state.snapshot.staff;
  customers = [] as typeof this.state.snapshot.customers;
  menuItems = [] as typeof this.state.snapshot.menuItems;
  categories: Category[] = [];

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
  ) {}

  ngOnInit(): void {
    this.tables = this.state.snapshot.tables;
    this.captains = this.state.snapshot.staff.filter(
      s => s.role === 'Captain' || s.role === 'Manager' || s.role === 'Admin',
    );
    this.customers = this.state.snapshot.customers;
    this.menuItems = this.state.snapshot.menuItems;
    this.categories = [...this.state.snapshot.categories].sort((a, b) => a.order - b.order);
    this.filteredOrders$ = combineLatest([this.state.select('orders'), this.activeFilter$]).pipe(
      map(([orders, filter]) => (filter === 'All' ? orders : orders.filter(o => o.status === filter))),
    );
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
    return this.categories.find(c => c.id === categoryId)?.name ?? categoryId;
  }

  filteredMenuItems(): MenuItem[] {
    const q = this.menuSearch.trim().toLowerCase();
    return this.menuItems.filter(m => {
      if (!m.available) return false;
      if (!q) return true;
      const cat = this.categoryName(m.categoryId).toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        (m.description?.toLowerCase().includes(q) ?? false) ||
        m.sku.toLowerCase().includes(q) ||
        cat.includes(q)
      );
    });
  }

  menuGroupedByCategory(): { category: Category; items: MenuItem[] }[] {
    const filtered = this.filteredMenuItems();
    const byCat = new Map<string, MenuItem[]>();
    for (const m of filtered) {
      const list = byCat.get(m.categoryId) ?? [];
      list.push(m);
      byCat.set(m.categoryId, list);
    }
    return this.categories
      .filter(c => c.active)
      .map(c => ({
        category: c,
        items: (byCat.get(c.id) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter(g => g.items.length > 0);
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
    this.newOrder = {
      tableId: this.tables[0]?.id ?? '',
      captainId: this.defaultCaptainId(),
      customerId: '',
    };
    this.showAddModal = true;
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
}
