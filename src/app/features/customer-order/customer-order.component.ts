import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../core/services/state.service';
import { ToastService } from '../../core/services/toast.service';
import { CustomerAuthService } from '../../core/services/customer-auth.service';
import { MenuItem, Category } from '../../core/models';

interface CartItem {
  item: MenuItem;
  qty: number;
}

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, DecimalPipe],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css',
})
export class CustomerOrderComponent implements OnInit {
  categories: Category[] = [];
  menuItems: MenuItem[] = [];
  selectedCat = '';
  cart: CartItem[] = [];
  drawerOpen = false;
  orderPlaced = false;
  confirmedOrderId = '';

  constructor(
    private state: StateService,
    private toast: ToastService,
    private customerAuth: CustomerAuthService,
  ) {}

  get customerName(): string {
    return this.customerAuth.currentCustomer?.name ?? '';
  }

  customerLogout(): void {
    this.customerAuth.logout();
  }

  ngOnInit(): void {
    this.categories = this.state.snapshot.categories.filter(c => c.active);
    this.menuItems = this.state.snapshot.menuItems.filter(m => m.available);
    if (this.categories.length) this.selectedCat = this.categories[0].id;
  }

  filteredItems(): MenuItem[] {
    return this.menuItems.filter(m => m.categoryId === this.selectedCat);
  }

  cartQty(item: MenuItem): number {
    return this.cart.find(e => e.item.id === item.id)?.qty ?? 0;
  }

  addToCart(item: MenuItem): void {
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

  get totalQty(): number { return this.cart.reduce((s, e) => s + e.qty, 0); }
  get cartTotal(): number { return this.cart.reduce((s, e) => s + e.item.price * e.qty, 0); }

  placeOrder(): void {
    if (this.cart.length === 0) return;
    this.confirmedOrderId = 'ONLINE-' + Date.now().toString(36).toUpperCase();
    this.orderPlaced = true;
    this.drawerOpen = false;
    this.toast.show('Order placed successfully!');
  }

  resetOrder(): void {
    this.cart = [];
    this.orderPlaced = false;
    this.confirmedOrderId = '';
  }
}
