import {
  ApiLoaderComponent
} from "./chunk-SWBXCHKP.js";
import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import "./chunk-E7QOHDKE.js";
import {
  Component,
  DecimalPipe,
  Injectable,
  NgForOf,
  NgIf,
  TitleCasePipe,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/bill-payment.service.ts
var BillPaymentService = class _BillPaymentService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  getBillsPagination(params = {}) {
    const q = new URLSearchParams();
    const skip = Math.max(0, params.skip ?? 0);
    const limit = Math.min(200, Math.max(1, params.limit ?? 50));
    q.set("skip", String(skip));
    q.set("limit", String(limit));
    const status = params.status?.trim();
    if (status)
      q.set("status", status);
    if (params.order_id != null && Number.isInteger(params.order_id) && params.order_id > 0) {
      q.set("order_id", String(params.order_id));
    }
    const dateFrom = params.date_from?.trim();
    if (dateFrom)
      q.set("date_from", dateFrom);
    const dateTo = params.date_to?.trim();
    if (dateTo)
      q.set("date_to", dateTo);
    return this.genricService.Get(`bills?${q.toString()}`);
  }
  addPayment(billId, payload) {
    return this.genricService.Post(`bills/${billId}/payments`, payload);
  }
  cancelBill(billId) {
    return this.genricService.DeleteRequest(`bills/${billId}`);
  }
  printBill(billId) {
    return this.genricService.Get(`bills/${billId}/print`);
  }
  static \u0275fac = function BillPaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BillPaymentService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BillPaymentService, factory: _BillPaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillPaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

// src/app/features/billing/billing.component.ts
function BillingComponent_tr_35_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mode_r4 = ctx.$implicit;
    \u0275\u0275property("value", mode_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, mode_r4));
  }
}
function BillingComponent_tr_35_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "button", 23);
    \u0275\u0275listener("click", function BillingComponent_tr_35_div_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const b_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.settleBill(b_r2));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 24);
    \u0275\u0275listener("click", function BillingComponent_tr_35_div_19_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const b_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelBill(b_r2));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.settlingBillId === b_r2.id || ctx_r2.cancellingBillId === b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.settlingBillId === b_r2.id ? "Settling..." : "Settle", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.cancellingBillId === b_r2.id || ctx_r2.settlingBillId === b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.cancellingBillId === b_r2.id ? "Cancelling..." : "Cancel", " ");
  }
}
function BillingComponent_tr_35_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "button", 25);
    \u0275\u0275text(2, " Settled ");
    \u0275\u0275elementEnd()();
  }
}
function BillingComponent_tr_35_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "button", 26);
    \u0275\u0275text(2, " Cancelled ");
    \u0275\u0275elementEnd()();
  }
}
function BillingComponent_tr_35_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "\u{1F5A8}\uFE0F");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_tr_35_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 14);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "select", 15);
    \u0275\u0275listener("ngModelChange", function BillingComponent_tr_35_Template_select_ngModelChange_16_listener($event) {
      const b_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPaymentModeChange(b_r2.id, $event));
    });
    \u0275\u0275template(17, BillingComponent_tr_35_option_17_Template, 3, 4, "option", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275template(19, BillingComponent_tr_35_div_19_Template, 5, 4, "div", 17)(20, BillingComponent_tr_35_div_20_Template, 3, 0, "div", 17)(21, BillingComponent_tr_35_div_21_Template, 3, 0, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td")(23, "button", 18);
    \u0275\u0275listener("click", function BillingComponent_tr_35_Template_button_click_23_listener() {
      const b_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printBill(b_r2));
    });
    \u0275\u0275template(24, BillingComponent_tr_35_span_24_Template, 2, 0, "span", 19)(25, BillingComponent_tr_35_span_25_Template, 2, 0, "span", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r2.bill_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r2.order_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(8, 13, b_r2.subtotal, "1.0-0"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(11, 16, b_r2.total_tax, "1.2-2"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(14, 19, b_r2.grand_total, "1.2-2"), "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.paymentModeForBill(b_r2.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.paymentModes);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", b_r2.status === "draft");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", b_r2.status === "settled");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", b_r2.status === "cancelled");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.printingBillId === b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.printingBillId !== b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.printingBillId === b_r2.id);
  }
}
function BillingComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "No bill found");
    \u0275\u0275elementEnd();
  }
}
var BillingComponent = class _BillingComponent {
  billPaymentService;
  toast;
  bills = [];
  paymentModes = ["cash", "online", "card"];
  selectedPaymentModeByBillId = {};
  settlingBillId = null;
  cancellingBillId = null;
  printingBillId = null;
  isLoadingBills = false;
  selectedStatus = "";
  orderIdFilter = "";
  dateFromFilter = "";
  dateToFilter = "";
  skip = 0;
  limit = 10;
  total = 0;
  pageSizeOptions = [10, 25, 50];
  constructor(billPaymentService, toast) {
    this.billPaymentService = billPaymentService;
    this.toast = toast;
  }
  ngOnInit() {
    this.loadBills();
  }
  get currentPage() {
    return Math.floor(this.skip / this.limit) + 1;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }
  get hasNoBills() {
    return !this.isLoadingBills && this.bills.length === 0;
  }
  applyFilters() {
    this.skip = 0;
    this.loadBills();
  }
  clearFilters() {
    if (!this.selectedStatus && !this.orderIdFilter && !this.dateFromFilter && !this.dateToFilter)
      return;
    this.selectedStatus = "";
    this.orderIdFilter = "";
    this.dateFromFilter = "";
    this.dateToFilter = "";
    this.skip = 0;
    this.loadBills();
  }
  onLimitChange() {
    this.skip = 0;
    this.loadBills();
  }
  prevPage() {
    if (this.skip <= 0 || this.isLoadingBills)
      return;
    this.skip = Math.max(0, this.skip - this.limit);
    this.loadBills();
  }
  nextPage() {
    if (this.isLoadingBills)
      return;
    const nextSkip = this.skip + this.limit;
    if (nextSkip >= this.total)
      return;
    this.skip = nextSkip;
    this.loadBills();
  }
  paymentModeForBill(billId) {
    return this.selectedPaymentModeByBillId[billId] || "cash";
  }
  onPaymentModeChange(billId, mode) {
    this.selectedPaymentModeByBillId[billId] = mode;
  }
  settleBill(bill) {
    if (this.settlingBillId !== null)
      return;
    const billStatus = bill.status?.toLowerCase();
    if (billStatus !== "draft")
      return;
    const mode = this.paymentModeForBill(bill.id);
    this.settlingBillId = bill.id;
    this.billPaymentService.addPayment(bill.id, {
      payment_method: mode,
      amount: Number(bill.grand_total || 0),
      reference_number: "",
      card_uid: ""
    }).subscribe({
      next: (response) => {
        this.settlingBillId = null;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if (statusCode !== void 0 && statusCode !== 200 && statusCode !== 201 || success === false) {
          this.toast.show(response?.message || "Failed to settle bill", "warning");
          return;
        }
        this.toast.show(response?.message || `${bill.bill_number} settled successfully`);
        this.loadBills();
      },
      error: (err) => {
        this.settlingBillId = null;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to settle bill.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  cancelBill(bill) {
    if (this.cancellingBillId !== null)
      return;
    const billStatus = bill.status?.toLowerCase();
    if (billStatus !== "draft")
      return;
    this.cancellingBillId = bill.id;
    this.billPaymentService.cancelBill(bill.id).subscribe({
      next: (response) => {
        this.cancellingBillId = null;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if (statusCode !== void 0 && statusCode !== 200 || success === false) {
          this.toast.show(response?.message || "Failed to cancel bill", "warning");
          return;
        }
        this.toast.show(response?.message || `${bill.bill_number} cancelled successfully`);
        this.loadBills();
      },
      error: (err) => {
        this.cancellingBillId = null;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to cancel bill.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  printBill(bill) {
    if (this.printingBillId !== null)
      return;
    this.printingBillId = bill.id;
    this.billPaymentService.printBill(bill.id).subscribe({
      next: (response) => {
        this.printingBillId = null;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if (statusCode !== void 0 && statusCode !== 200 || success === false) {
          this.toast.show(response?.message || "Failed to fetch print data", "warning");
          return;
        }
        if (!response?.data) {
          this.toast.show("Print data is empty", "warning");
          return;
        }
        this.openPrintWindow(response.data);
      },
      error: (err) => {
        this.printingBillId = null;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to fetch print data.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  loadBills() {
    const orderIdInput = String(this.orderIdFilter ?? "").trim();
    const parsedOrderId = Number(orderIdInput);
    const orderId = orderIdInput && Number.isInteger(parsedOrderId) && parsedOrderId > 0 ? parsedOrderId : null;
    this.isLoadingBills = true;
    this.billPaymentService.getBillsPagination({
      status: this.selectedStatus || null,
      order_id: orderId,
      date_from: this.dateFromFilter ? new Date(this.dateFromFilter).toISOString() : null,
      date_to: this.dateToFilter ? new Date(this.dateToFilter).toISOString() : null,
      skip: this.skip,
      limit: this.limit
    }).subscribe({
      next: (response) => {
        this.isLoadingBills = false;
        const statusCode = response?.statusCode;
        const success = response?.success;
        if (statusCode !== void 0 && statusCode !== 200 || success === false) {
          this.toast.show(response?.message || "Failed to load bills", "warning");
          this.bills = [];
          this.total = 0;
          return;
        }
        if ("meta" in response) {
          this.bills = Array.isArray(response.data) ? response.data : [];
          this.total = Number(response.meta?.total ?? 0);
          this.skip = Number(response.meta?.skip ?? 0);
          this.limit = Number(response.meta?.limit ?? this.limit);
        } else {
          this.bills = Array.isArray(response.items) ? response.items : [];
          this.total = Number(response.total ?? 0);
          this.skip = Number(response.skip ?? 0);
          this.limit = Number(response.limit ?? this.limit);
        }
      },
      error: (err) => {
        this.isLoadingBills = false;
        this.bills = [];
        this.total = 0;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load bills.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  openPrintWindow(data) {
    const printWindow = window.open("", "_blank", "width=420,height=720");
    if (!printWindow) {
      this.toast.show("Popup blocked. Please allow popups to print bills.", "warning");
      return;
    }
    const itemsRows = (data.items || []).map((item) => `
          <tr>
            <td>
              ${item.menu_item_name}${item.variant_name ? ` (${item.variant_name})` : ""}
            </td>
            <td style="text-align:center;">${item.quantity}</td>
            <td style="text-align:right;">${item.unit_price.toFixed(2)}</td>
            <td style="text-align:right;">${item.line_total.toFixed(2)}</td>
          </tr>
        `).join("");
    const paymentsRows = (data.payments || []).map((payment) => `
          <tr>
            <td>${this.capitalize(payment.payment_method)}</td>
            <td style="text-align:right;">${payment.amount.toFixed(2)}</td>
          </tr>
        `).join("");
    const customerName = data.customer_name || "Walk-in";
    const tableNumber = data.table_number || "-";
    const captainName = data.captain_name || "-";
    const createdAt = data.created_at ? new Date(data.created_at).toLocaleString() : "-";
    printWindow.document.write(`
      <html>
        <head>
          <title>${data.bill_number}</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; color: #111; margin: 0; padding: 14px; }
            .head { text-align: center; margin-bottom: 10px; }
            .title { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
            .muted { color: #555; }
            .meta { margin: 8px 0; line-height: 1.5; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { padding: 6px 4px; border-bottom: 1px dashed #ccc; }
            th { text-align: left; font-weight: 700; }
            .summary { margin-top: 10px; }
            .row { display: flex; justify-content: space-between; margin: 3px 0; }
            .grand { font-size: 14px; font-weight: 700; border-top: 1px solid #000; padding-top: 6px; margin-top: 6px; }
            .foot { text-align: center; margin-top: 14px; font-size: 11px; color: #444; }
          </style>
        </head>
        <body>
          <div class="head">
            <div class="title">Restaurant Receipt</div>
            <div class="muted">${data.bill_number}</div>
          </div>
          <div class="meta">
            <div><strong>Order:</strong> ${data.order_number}</div>
            <div><strong>Table:</strong> ${tableNumber}</div>
            <div><strong>Customer:</strong> ${customerName}</div>
            <div><strong>Captain:</strong> ${captainName}</div>
            <div><strong>Date:</strong> ${createdAt}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Rate</th>
                <th style="text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
          <div class="summary">
            <div class="row"><span>Subtotal</span><span>${data.subtotal.toFixed(2)}</span></div>
            <div class="row"><span>Discount</span><span>${data.discount_amount.toFixed(2)}</span></div>
            <div class="row"><span>CGST</span><span>${data.cgst_amount.toFixed(2)}</span></div>
            <div class="row"><span>SGST</span><span>${data.sgst_amount.toFixed(2)}</span></div>
            <div class="row"><span>Total Tax</span><span>${data.total_tax.toFixed(2)}</span></div>
            <div class="row grand"><span>Grand Total</span><span>${data.grand_total.toFixed(2)}</span></div>
          </div>
          <table>
            <thead>
              <tr><th>Payment Mode</th><th style="text-align:right;">Amount</th></tr>
            </thead>
            <tbody>${paymentsRows || '<tr><td colspan="2">Not paid yet</td></tr>'}</tbody>
          </table>
          <div class="foot">Thank you. Visit again.</div>
          <script>
            window.onload = function () {
              window.print();
              window.close();
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
  capitalize(value) {
    if (!value)
      return "";
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  static \u0275fac = function BillingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BillingComponent)(\u0275\u0275directiveInject(BillPaymentService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BillingComponent, selectors: [["app-billing"]], decls: 47, vars: 16, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right", "billing-toolbar"], ["type", "number", "min", "1", "placeholder", "Order ID", "aria-label", "Filter by order id", 1, "form-input", "billing-filter-order-id", 3, "ngModelChange", "ngModel"], ["type", "date", "aria-label", "Filter from date", 1, "form-input", "billing-filter-date", 3, "ngModelChange", "ngModel"], ["type", "date", "aria-label", "Filter to date", 1, "form-input", "billing-filter-date", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-secondary", "btn-sm", "billing-filter-btn", 3, "click", "disabled"], [1, "card", "billing-table-card"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "billing-no-bills-message justify-center", 4, "ngIf"], [1, "staff-pagination"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [3, "show", "fullscreen", "message"], [1, "billing-total-cell"], ["aria-label", "Bill payment mode", 1, "form-select", "billing-payment-mode-select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "billing-action-buttons", 4, "ngIf"], ["type", "button", "title", "Print bill", "aria-label", "Print bill", 1, "btn", "btn-sm", "billing-print-btn", 3, "click", "disabled"], ["aria-hidden", "true", 4, "ngIf"], [4, "ngIf"], [3, "value"], [1, "billing-action-buttons"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-sm", "order-cancel-btn", 3, "click", "disabled"], ["type", "button", "disabled", "", 1, "btn", "btn-sm", "billing-settled-btn"], ["type", "button", "disabled", "", 1, "btn", "btn-sm", "billing-cancelled-btn"], ["aria-hidden", "true"], [1, "billing-no-bills-message", "justify-center"]], template: function BillingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Billing & Settlement");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function BillingComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.orderIdFilter, $event) || (ctx.orderIdFilter = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function BillingComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.dateFromFilter, $event) || (ctx.dateFromFilter = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function BillingComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.dateToFilter, $event) || (ctx.dateToFilter = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function BillingComponent_Template_button_click_10_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275text(11, "Apply");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 6);
      \u0275\u0275listener("click", function BillingComponent_Template_button_click_12_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275text(13, "Clear");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 7)(15, "table", 8)(16, "thead")(17, "tr")(18, "th");
      \u0275\u0275text(19, "Bill #");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th");
      \u0275\u0275text(21, "Order");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th");
      \u0275\u0275text(23, "Subtotal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th");
      \u0275\u0275text(25, "GST");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th");
      \u0275\u0275text(27, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th");
      \u0275\u0275text(29, "Payment Mode");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th");
      \u0275\u0275text(31, "Actions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th");
      \u0275\u0275text(33, "Print");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "tbody");
      \u0275\u0275template(35, BillingComponent_tr_35_Template, 26, 22, "tr", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(36, BillingComponent_div_36_Template, 2, 0, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 11)(38, "button", 12);
      \u0275\u0275listener("click", function BillingComponent_Template_button_click_38_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(39, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span");
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 12);
      \u0275\u0275listener("click", function BillingComponent_Template_button_click_44_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(45, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(46, "app-api-loader", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Manage bills and payment records (Total: ", ctx.total, ")");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.orderIdFilter);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.dateFromFilter);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.dateToFilter);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingBills);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoadingBills);
      \u0275\u0275advance(23);
      \u0275\u0275property("ngForOf", ctx.bills);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hasNoBills);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.skip <= 0 || ctx.isLoadingBills);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.total, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.skip + ctx.limit >= ctx.total || ctx.isLoadingBills);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.isLoadingBills)("fullscreen", true)("message", "Loading bills...");
    }
  }, dependencies: [NgForOf, NgIf, DecimalPipe, TitleCasePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, ApiLoaderComponent], styles: ["\n\n.billing-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n.billing-filter-status[_ngcontent-%COMP%] {\n  width: 110px;\n  min-width: 110px;\n}\n.billing-filter-order-id[_ngcontent-%COMP%] {\n  width: 90px;\n  min-width: 90px;\n}\n.billing-filter-date[_ngcontent-%COMP%] {\n  width: 130px;\n  min-width: 130px;\n}\n.billing-filter-btn[_ngcontent-%COMP%] {\n  min-width: 64px;\n}\n.billing-page-size-select[_ngcontent-%COMP%] {\n  width: 72px;\n  min-width: 72px;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.billing-no-bills-message[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.billing-table-card[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.billing-discount-cell[_ngcontent-%COMP%] {\n  color: var(--status-available);\n}\n.billing-total-cell[_ngcontent-%COMP%] {\n  color: var(--accent-gold);\n  font-weight: 700;\n}\n.billing-payment-mode-select[_ngcontent-%COMP%] {\n  width: 110px;\n  min-width: 110px;\n}\n.billing-action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.order-cancel-btn[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n}\n.order-cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.billing-settled-btn[_ngcontent-%COMP%] {\n  background: #6b7280;\n  border-color: #6b7280;\n  color: #fff;\n  cursor: not-allowed;\n  opacity: 0.9;\n}\n.billing-cancelled-btn[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.18);\n  border-color: rgba(239, 68, 68, 0.35);\n  color: #ef4444;\n  cursor: not-allowed;\n  opacity: 0.95;\n}\n.billing-print-btn[_ngcontent-%COMP%] {\n  border-color: rgba(16, 185, 129, 0.45);\n  color: #059669;\n  background: rgba(16, 185, 129, 0.12);\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  padding: 0;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n}\n.billing-print-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(16, 185, 129, 0.22);\n  border-color: #059669;\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=billing.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingComponent, [{
    type: Component,
    args: [{ selector: "app-billing", standalone: true, imports: [NgForOf, NgIf, DecimalPipe, TitleCasePipe, FormsModule, ApiLoaderComponent], template: `    <div class="section-header">
      <div class="section-header-left">
        <h2>Billing & Settlement</h2>
        <p>Manage bills and payment records (Total: {{ total }})</p>
      </div>
      <div class="section-header-right billing-toolbar">
        <!-- <select class="form-select billing-filter-status" aria-label="Filter bill status" [(ngModel)]="selectedStatus">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="settled">Settled</option>
          <option value="cancelled">Cancelled</option>
        </select> -->
        <input
          class="form-input billing-filter-order-id"
          type="number"
          min="1"
          placeholder="Order ID"
          aria-label="Filter by order id"
          [(ngModel)]="orderIdFilter"
        />
        <input
          class="form-input billing-filter-date"
          type="date"
          aria-label="Filter from date"
          [(ngModel)]="dateFromFilter"
        />
        <input
          class="form-input billing-filter-date"
          type="date"
          aria-label="Filter to date"
          [(ngModel)]="dateToFilter"
        />
        <button class="btn btn-secondary btn-sm billing-filter-btn" [disabled]="isLoadingBills" (click)="applyFilters()">Apply</button>
        <button class="btn btn-secondary btn-sm billing-filter-btn" [disabled]="isLoadingBills" (click)="clearFilters()">Clear</button>
      </div>
    </div>

    <div class="card billing-table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Bill #</th><th>Order</th><th>Subtotal</th>
            <!-- <th>Discount</th> -->
            <th>GST</th><th>Total</th>
            <th>Payment Mode</th><th>Actions</th><th>Print</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let b of bills">
            <td><strong>{{ b.bill_number }}</strong></td>
            <td>{{ b.order_id }}</td>
            <td>\u20B9{{ b.subtotal | number:'1.0-0' }}</td>
            <!-- <td class="billing-discount-cell">
              <span *ngIf="b.discount_amount > 0">-\u20B9{{ b.discount_amount | number:'1.0-0' }}</span>
              <span *ngIf="!b.discount_amount">-</span>
            </td> -->
            <td>\u20B9{{ b.total_tax | number:'1.2-2' }}</td>
            <td class="billing-total-cell">\u20B9{{ b.grand_total | number:'1.2-2' }}</td>
            <td>
              <select
                class="form-select billing-payment-mode-select"
                [ngModel]="paymentModeForBill(b.id)"
                (ngModelChange)="onPaymentModeChange(b.id, $event)"
                aria-label="Bill payment mode"
              >
                <option *ngFor="let mode of paymentModes" [value]="mode">{{ mode | titlecase }}</option>
              </select>
            </td>
            <td>
              <div *ngIf="b.status === 'draft'" class="billing-action-buttons">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  [disabled]="settlingBillId === b.id || cancellingBillId === b.id"
                  (click)="settleBill(b)"
                >
                  {{ settlingBillId === b.id ? 'Settling...' : 'Settle' }}
                </button>
                <button
                  type="button"
                  class="btn btn-sm order-cancel-btn"
                  [disabled]="cancellingBillId === b.id || settlingBillId === b.id"
                  (click)="cancelBill(b)"
                >
                  {{ cancellingBillId === b.id ? 'Cancelling...' : 'Cancel' }}
                </button>
              </div>
              <div *ngIf="b.status === 'settled'" class="billing-action-buttons">
                <button type="button" class="btn btn-sm billing-settled-btn" disabled>
                  Settled
                </button>
              </div>
              <div *ngIf="b.status === 'cancelled'" class="billing-action-buttons">
                <button type="button" class="btn btn-sm billing-cancelled-btn" disabled>
                  Cancelled
                </button>
              </div>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm billing-print-btn"
                [disabled]="printingBillId === b.id"
                title="Print bill"
                aria-label="Print bill"
                (click)="printBill(b)"
              >
                <span *ngIf="printingBillId !== b.id" aria-hidden="true">\u{1F5A8}\uFE0F</span>
                <span *ngIf="printingBillId === b.id">...</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="hasNoBills" class="billing-no-bills-message justify-center">No bill found</div>
    </div>
    <div class="staff-pagination">
     
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="skip <= 0 || isLoadingBills" (click)="prevPage()">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <span>Total: {{ total }}</span>
      <!-- <select class="form-select billing-page-size-select" aria-label="Bills page size" [(ngModel)]="limit" (change)="onLimitChange()">
        <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
      </select> -->
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="(skip + limit) >= total || isLoadingBills" (click)="nextPage()">Next</button>
      <app-api-loader [show]="isLoadingBills" [fullscreen]="true" [message]="'Loading bills...'"></app-api-loader>
    </div>
  
`, styles: ["/* src/app/features/billing/billing.component.css */\n.billing-toolbar {\n  display: flex;\n  gap: 6px;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n.billing-filter-status {\n  width: 110px;\n  min-width: 110px;\n}\n.billing-filter-order-id {\n  width: 90px;\n  min-width: 90px;\n}\n.billing-filter-date {\n  width: 130px;\n  min-width: 130px;\n}\n.billing-filter-btn {\n  min-width: 64px;\n}\n.billing-page-size-select {\n  width: 72px;\n  min-width: 72px;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.billing-no-bills-message {\n  width: 100%;\n  text-align: center;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.billing-table-card {\n  overflow-x: auto;\n}\n.billing-discount-cell {\n  color: var(--status-available);\n}\n.billing-total-cell {\n  color: var(--accent-gold);\n  font-weight: 700;\n}\n.billing-payment-mode-select {\n  width: 110px;\n  min-width: 110px;\n}\n.billing-action-buttons {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.order-cancel-btn {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n}\n.order-cancel-btn:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.billing-settled-btn {\n  background: #6b7280;\n  border-color: #6b7280;\n  color: #fff;\n  cursor: not-allowed;\n  opacity: 0.9;\n}\n.billing-cancelled-btn {\n  background: rgba(239, 68, 68, 0.18);\n  border-color: rgba(239, 68, 68, 0.35);\n  color: #ef4444;\n  cursor: not-allowed;\n  opacity: 0.95;\n}\n.billing-print-btn {\n  border-color: rgba(16, 185, 129, 0.45);\n  color: #059669;\n  background: rgba(16, 185, 129, 0.12);\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  padding: 0;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n}\n.billing-print-btn:hover:not(:disabled) {\n  background: rgba(16, 185, 129, 0.22);\n  border-color: #059669;\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=billing.component.css.map */\n"] }]
  }], () => [{ type: BillPaymentService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BillingComponent, { className: "BillingComponent", filePath: "src/app/features/billing/billing.component.ts", lineNumber: 25 });
})();
export {
  BillingComponent
};
//# sourceMappingURL=chunk-7KROCVPK.js.map
