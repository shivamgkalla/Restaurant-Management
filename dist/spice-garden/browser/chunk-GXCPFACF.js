import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import "./chunk-YRUH6UFD.js";
import {
  FormsModule
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import {
  Component,
  LowerCasePipe,
  NgClass,
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-UJPJV6NU.js";

// src/app/features/rfid/rfid.component.ts
var MIN_LOAD_AMOUNT = 100;
var RfidComponent = class _RfidComponent {
  state;
  toast;
  cards = [];
  customers = [];
  activeTab = "inventory";
  scanInput = "";
  scanError = false;
  scannedCard = null;
  modalType = "";
  selectedCard = null;
  bindCardId = null;
  bindCustomerId = "";
  bindAmount = null;
  bindMode = "Cash";
  loadAmount = null;
  loadMode = "Cash";
  deductAmount = null;
  deductOrderRef = "";
  cardsSub;
  customersSub;
  constructor(state, toast) {
    this.state = state;
    this.toast = toast;
  }
  ngOnInit() {
    this.cardsSub = this.state.select("rfidCards").subscribe((list) => {
      this.cards = list ?? [];
      this.refreshScannedCard();
      this.refreshSelectedCard();
    });
    this.customersSub = this.state.select("customers").subscribe((list) => {
      this.customers = list ?? [];
    });
  }
  ngOnDestroy() {
    this.cardsSub?.unsubscribe();
    this.customersSub?.unsubscribe();
  }
  get activeCount() {
    return this.cards.filter((c) => c.status === "Active").length;
  }
  get availableCount() {
    return this.cards.filter((c) => c.status === "Available").length;
  }
  get blockedCount() {
    return this.cards.filter((c) => c.status === "Blocked").length;
  }
  get totalBalance() {
    return this.cards.filter((c) => c.status === "Active").reduce((sum, c) => sum + (c.balance || 0), 0);
  }
  get availableCards() {
    return this.cards.filter((c) => c.status === "Available");
  }
  fmt(value) {
    const n = Number(value ?? 0);
    return `\u20B9${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  setTab(tab) {
    this.activeTab = tab;
  }
  trackById(_index, card) {
    return card.id;
  }
  getCustomer(id) {
    if (!id)
      return null;
    return this.customers.find((c) => c.id === id) ?? null;
  }
  onScanKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.scanCard();
    }
  }
  scanCard() {
    const query = this.scanInput.trim().toLowerCase();
    if (!query) {
      this.scanError = false;
      this.scannedCard = null;
      return;
    }
    const match = this.cards.find((c) => c.cardNo.toLowerCase() === query || c.id.toLowerCase() === query);
    if (match) {
      this.scannedCard = match;
      this.scanError = false;
    } else {
      this.scannedCard = null;
      this.scanError = true;
    }
  }
  openBindModal(card) {
    this.modalType = "bind";
    this.selectedCard = card ?? null;
    this.bindCardId = card ? card.id : this.availableCards[0]?.id ?? null;
    this.bindCustomerId = "";
    this.bindAmount = null;
    this.bindMode = "Cash";
  }
  openLoadModal(card) {
    this.modalType = "load";
    this.selectedCard = card;
    this.loadAmount = null;
    this.loadMode = "Cash";
  }
  openDeductModal(card) {
    this.modalType = "deduct";
    this.selectedCard = card;
    this.deductAmount = null;
    this.deductOrderRef = "";
  }
  openHistoryModal(card) {
    this.modalType = "history";
    this.selectedCard = card;
  }
  closeModal() {
    this.modalType = "";
    this.selectedCard = null;
    this.bindCardId = null;
    this.bindCustomerId = "";
    this.bindAmount = null;
    this.loadAmount = null;
    this.deductAmount = null;
    this.deductOrderRef = "";
  }
  confirmBind() {
    if (!this.bindCardId) {
      this.toast.show("Select a card to bind", "warning");
      return;
    }
    const card = this.cards.find((c) => c.id === this.bindCardId);
    if (!card) {
      this.toast.show("Card not found", "error");
      return;
    }
    if (card.status !== "Available") {
      this.toast.show("Only available cards can be bound", "warning");
      return;
    }
    const initialLoad = Number(this.bindAmount ?? 0);
    if (initialLoad < 0) {
      this.toast.show("Initial load cannot be negative", "warning");
      return;
    }
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const customerId = this.bindCustomerId ? this.bindCustomerId : null;
    const updated = __spreadProps(__spreadValues({}, card), {
      customerId,
      balance: initialLoad,
      status: "Active",
      loadHistory: initialLoad > 0 ? [...card.loadHistory, { amount: initialLoad, mode: this.bindMode, date: today, balance: initialLoad }] : [...card.loadHistory]
    });
    this.state.updateRfidCard(updated);
    this.toast.show(`Card ${card.cardNo} bound and activated`);
    this.closeModal();
  }
  confirmLoad() {
    if (!this.selectedCard)
      return;
    const amount = Number(this.loadAmount ?? 0);
    if (amount < MIN_LOAD_AMOUNT) {
      this.toast.show(`Minimum top-up is ${this.fmt(MIN_LOAD_AMOUNT)}`, "warning");
      return;
    }
    const newBalance = this.selectedCard.balance + amount;
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const updated = __spreadProps(__spreadValues({}, this.selectedCard), {
      balance: newBalance,
      status: "Active",
      loadHistory: [
        ...this.selectedCard.loadHistory,
        { amount, mode: this.loadMode, date: today, balance: newBalance }
      ]
    });
    this.state.updateRfidCard(updated);
    this.toast.show(`${this.fmt(amount)} loaded to ${this.selectedCard.cardNo}`);
    this.closeModal();
  }
  confirmDeduct() {
    if (!this.selectedCard)
      return;
    const amount = Number(this.deductAmount ?? 0);
    if (amount <= 0) {
      this.toast.show("Enter a valid deduction amount", "warning");
      return;
    }
    if (amount > this.selectedCard.balance) {
      this.toast.show("Amount exceeds available balance", "error");
      return;
    }
    const newBalance = this.selectedCard.balance - amount;
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const note = this.deductOrderRef.trim() ? `Order ${this.deductOrderRef.trim()}` : "Deduction";
    const updated = __spreadProps(__spreadValues({}, this.selectedCard), {
      balance: newBalance,
      loadHistory: [
        ...this.selectedCard.loadHistory,
        { amount: -amount, mode: note, date: today, balance: newBalance }
      ]
    });
    this.state.updateRfidCard(updated);
    this.toast.show(`${this.fmt(amount)} deducted from ${this.selectedCard.cardNo}`);
    this.closeModal();
  }
  toggleBlock(card) {
    const updated = __spreadProps(__spreadValues({}, card), {
      status: card.status === "Blocked" ? "Active" : "Blocked"
    });
    this.state.updateRfidCard(updated);
    this.toast.show(`Card ${card.cardNo} ${updated.status === "Blocked" ? "blocked" : "unblocked"}`, updated.status === "Blocked" ? "warning" : "success");
  }
  clearCard(card) {
    if (card.balance > 0) {
      this.toast.show("Clear is only allowed when balance is zero", "warning");
      return;
    }
    const updated = __spreadProps(__spreadValues({}, card), {
      customerId: null,
      status: "Available"
    });
    this.state.updateRfidCard(updated);
    this.toast.show(`Card ${card.cardNo} cleared and returned to inventory`);
  }
  refreshScannedCard() {
    if (!this.scannedCard)
      return;
    const updated = this.cards.find((c) => c.id === this.scannedCard.id);
    this.scannedCard = updated ?? null;
  }
  refreshSelectedCard() {
    if (!this.selectedCard)
      return;
    const updated = this.cards.find((c) => c.id === this.selectedCard.id);
    if (updated)
      this.selectedCard = updated;
  }
  static \u0275fac = function RfidComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RfidComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RfidComponent, selectors: [["app-rfid"]], decls: 7, vars: 0, consts: [[1, "rfid-page"], [1, "section-header"], [1, "section-header-left"]], template: function RfidComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275text(4, "RFID card system");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Register inventory, bind to customers, load balance, pay bills, and clear cards \u2014 wired to your backend APIs.");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [FormsModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RfidComponent, [{
    type: Component,
    args: [{ selector: "app-rfid", standalone: true, imports: [NgForOf, NgIf, NgClass, LowerCasePipe, FormsModule], template: '<div class="rfid-page">\r\n  <div class="section-header">\r\n    <div class="section-header-left">\r\n      <h2>RFID card system</h2>\r\n      <p>Register inventory, bind to customers, load balance, pay bills, and clear cards \u2014 wired to your backend APIs.</p>\r\n    </div>\r\n  </div>\r\n\r\n\r\n' }]
  }], () => [{ type: StateService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RfidComponent, { className: "RfidComponent", filePath: "src/app/features/rfid/rfid.component.ts", lineNumber: 22 });
})();
export {
  RfidComponent
};
//# sourceMappingURL=chunk-GXCPFACF.js.map
