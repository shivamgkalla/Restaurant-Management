import {
  getInitialAppState
} from "./chunk-YRUH6UFD.js";
import {
  BehaviorSubject,
  Injectable,
  __spreadValues,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/state.service.ts
var StateService = class _StateService {
  _state$ = new BehaviorSubject(getInitialAppState());
  get state$() {
    return this._state$.asObservable();
  }
  get snapshot() {
    return this._state$.value;
  }
  select(key) {
    return this._state$.pipe(map((s) => s[key]));
  }
  // ── Orders ────────────────────────────────────────────────────
  addOrder(order) {
    this.patch({ orders: [...this.snapshot.orders, order] });
  }
  updateOrder(updated) {
    this.patch({ orders: this.snapshot.orders.map((o) => o.id === updated.id ? updated : o) });
  }
  // ── Tables ────────────────────────────────────────────────────
  addZone(zone) {
    this.patch({ zones: [...this.snapshot.zones, zone] });
  }
  addTable(table) {
    this.patch({ tables: [...this.snapshot.tables, table] });
  }
  updateTable(updated) {
    this.patch({ tables: this.snapshot.tables.map((t) => t.id === updated.id ? updated : t) });
  }
  // ── Staff ─────────────────────────────────────────────────────
  addStaff(staff) {
    this.patch({ staff: [...this.snapshot.staff, staff] });
  }
  // ── Customers ─────────────────────────────────────────────────
  addCustomer(customer) {
    this.patch({ customers: [...this.snapshot.customers, customer] });
  }
  updateCustomer(updated) {
    this.patch({ customers: this.snapshot.customers.map((c) => c.id === updated.id ? updated : c) });
  }
  // ── Menu Items ────────────────────────────────────────────────
  addMenuItem(item) {
    this.patch({ menuItems: [...this.snapshot.menuItems, item] });
  }
  updateMenuItem(updated) {
    this.patch({ menuItems: this.snapshot.menuItems.map((m) => m.id === updated.id ? updated : m) });
  }
  // ── Bills ─────────────────────────────────────────────────────
  addBill(bill) {
    this.patch({ bills: [...this.snapshot.bills, bill] });
  }
  // ── RFID ──────────────────────────────────────────────────────
  updateRfidCard(updated) {
    this.patch({ rfidCards: this.snapshot.rfidCards.map((r) => r.id === updated.id ? updated : r) });
  }
  // ── Dues ──────────────────────────────────────────────────────
  updateDue(updated) {
    this.patch({ dues: this.snapshot.dues.map((d) => d.id === updated.id ? updated : d) });
  }
  patch(partial) {
    this._state$.next(__spreadValues(__spreadValues({}, this.snapshot), partial));
  }
  static \u0275fac = function StateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StateService, factory: _StateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  StateService
};
//# sourceMappingURL=chunk-NQ4ELL5G.js.map
