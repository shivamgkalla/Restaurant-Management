import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState, Order, Table, Customer, MenuItem, RfidCard, Due, Bill, Staff, Zone } from '../models';
import { getInitialAppState } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class StateService {
  private _state$ = new BehaviorSubject<AppState>(getInitialAppState());

  get state$(): Observable<AppState> { return this._state$.asObservable(); }
  get snapshot(): AppState { return this._state$.value; }

  select<K extends keyof AppState>(key: K): Observable<AppState[K]> {
    return this._state$.pipe(map(s => s[key]));
  }

  // ── Orders ────────────────────────────────────────────────────
  addOrder(order: Order): void {
    this.patch({ orders: [...this.snapshot.orders, order] });
  }

  updateOrder(updated: Order): void {
    this.patch({ orders: this.snapshot.orders.map(o => o.id === updated.id ? updated : o) });
  }

  // ── Tables ────────────────────────────────────────────────────
  addZone(zone: Zone): void {
    this.patch({ zones: [...this.snapshot.zones, zone] });
  }

  addTable(table: Table): void {
    this.patch({ tables: [...this.snapshot.tables, table] });
  }

  updateTable(updated: Table): void {
    this.patch({ tables: this.snapshot.tables.map(t => t.id === updated.id ? updated : t) });
  }

  // ── Staff ─────────────────────────────────────────────────────
  addStaff(staff: Staff): void {
    this.patch({ staff: [...this.snapshot.staff, staff] });
  }

  // ── Customers ─────────────────────────────────────────────────
  addCustomer(customer: Customer): void {
    this.patch({ customers: [...this.snapshot.customers, customer] });
  }

  updateCustomer(updated: Customer): void {
    this.patch({ customers: this.snapshot.customers.map(c => c.id === updated.id ? updated : c) });
  }

  // ── Menu Items ────────────────────────────────────────────────
  addMenuItem(item: MenuItem): void {
    this.patch({ menuItems: [...this.snapshot.menuItems, item] });
  }

  updateMenuItem(updated: MenuItem): void {
    this.patch({ menuItems: this.snapshot.menuItems.map(m => m.id === updated.id ? updated : m) });
  }

  // ── Bills ─────────────────────────────────────────────────────
  addBill(bill: Bill): void {
    this.patch({ bills: [...this.snapshot.bills, bill] });
  }

  // ── RFID ──────────────────────────────────────────────────────
  updateRfidCard(updated: RfidCard): void {
    this.patch({ rfidCards: this.snapshot.rfidCards.map(r => r.id === updated.id ? updated : r) });
  }

  // ── Dues ──────────────────────────────────────────────────────
  updateDue(updated: Due): void {
    this.patch({ dues: this.snapshot.dues.map(d => d.id === updated.id ? updated : d) });
  }

  private patch(partial: Partial<AppState>): void {
    this._state$.next({ ...this.snapshot, ...partial });
  }
}
