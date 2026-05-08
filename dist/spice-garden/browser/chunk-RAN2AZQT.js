import {
  CAPTAIN_PERFORMANCE,
  DAILY_SALES,
  REVENUE_LEAKAGE,
  SALES_SUMMARY,
  TOP_ITEMS
} from "./chunk-YRUH6UFD.js";
import {
  Component,
  DecimalPipe,
  NgForOf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-UJPJV6NU.js";

// src/app/features/reports/reports.component.ts
function ReportsComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 18);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r2 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.qty);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(9, 4, item_r1.revenue), "");
  }
}
function ReportsComponent_tr_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 18);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 17);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r3.orders);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(7, 4, c_r3.revenue), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(10, 6, c_r3.avgValue), "");
  }
}
function ReportsComponent_tr_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 21);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 22);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.orderId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.tableId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.captain);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-\u20B9", \u0275\u0275pipeBind1(12, 6, r_r4.amount), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.reason);
  }
}
var ReportsComponent = class _ReportsComponent {
  summaryToday = SALES_SUMMARY["today"];
  summaryWeek = SALES_SUMMARY["thisWeek"];
  summaryMonth = SALES_SUMMARY["thisMonth"];
  topItems = TOP_ITEMS;
  captainPerf = CAPTAIN_PERFORMANCE;
  leakage = REVENUE_LEAKAGE;
  dailySales = DAILY_SALES;
  static \u0275fac = function ReportsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], decls: 99, vars: 15, consts: [[1, "section-header"], [1, "section-header-left"], [1, "stats-grid", 2, "margin-bottom", "24px"], [1, "stat-card", 2, "--stat-color", "var(--accent-gold)"], [1, "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", "up"], [1, "stat-card", 2, "--stat-color", "var(--accent-blue)"], [1, "stat-card", 2, "--stat-color", "var(--accent-purple)"], [1, "grid-2", 2, "gap", "20px", "margin-bottom", "24px"], [1, "card"], [1, "card-header"], [2, "font-size", "20px"], [1, "card-title"], [1, "data-table"], [4, "ngFor", "ngForOf"], [2, "color", "var(--text-muted)"], [2, "color", "var(--accent-gold)"], [1, "badge", "badge-reserved"], [2, "font-size", "12px"], [2, "color", "var(--danger)"], [2, "font-size", "11px", "color", "var(--text-muted)"]], template: function ReportsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "MIS Reports & Analytics");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Business intelligence for Spice Garden");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 2)(7, "div", 3)(8, "span", 4);
      \u0275\u0275text(9, "\u{1F4B0}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 5);
      \u0275\u0275text(11);
      \u0275\u0275pipe(12, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 6);
      \u0275\u0275text(14, "Today's Revenue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 7);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 8)(18, "span", 4);
      \u0275\u0275text(19, "\u{1F4C5}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 5);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 6);
      \u0275\u0275text(24, "This Week");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 7);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 4);
      \u0275\u0275text(29, "\u{1F4C6}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 5);
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 6);
      \u0275\u0275text(34, "This Month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 7);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 10)(38, "div", 11)(39, "div", 12)(40, "span", 13);
      \u0275\u0275text(41, "\u{1F3C6}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 14);
      \u0275\u0275text(43, "Top Items");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "table", 15)(45, "thead")(46, "tr")(47, "th");
      \u0275\u0275text(48, "#");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "th");
      \u0275\u0275text(50, "Item");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "th");
      \u0275\u0275text(52, "Qty");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "th");
      \u0275\u0275text(54, "Revenue");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "tbody");
      \u0275\u0275template(56, ReportsComponent_tr_56_Template, 10, 6, "tr", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(57, "div", 11)(58, "div", 12)(59, "span", 13);
      \u0275\u0275text(60, "\u{1F468}\u200D\u{1F373}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "div", 14);
      \u0275\u0275text(62, "Captain Performance");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "table", 15)(64, "thead")(65, "tr")(66, "th");
      \u0275\u0275text(67, "Captain");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "th");
      \u0275\u0275text(69, "Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "th");
      \u0275\u0275text(71, "Revenue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "th");
      \u0275\u0275text(73, "Avg");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(74, "tbody");
      \u0275\u0275template(75, ReportsComponent_tr_75_Template, 11, 8, "tr", 16);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(76, "div", 11)(77, "div", 12)(78, "span", 13);
      \u0275\u0275text(79, "\u26A0\uFE0F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 14);
      \u0275\u0275text(81, "Revenue Leakage Log");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(82, "table", 15)(83, "thead")(84, "tr")(85, "th");
      \u0275\u0275text(86, "Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "th");
      \u0275\u0275text(88, "Order");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th");
      \u0275\u0275text(90, "Table");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "th");
      \u0275\u0275text(92, "Captain");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "th");
      \u0275\u0275text(94, "Amount");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "th");
      \u0275\u0275text(96, "Reason");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(97, "tbody");
      \u0275\u0275template(98, ReportsComponent_tr_98_Template, 15, 8, "tr", 16);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(12, 9, ctx.summaryToday.revenue), "");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.summaryToday.orders, " orders");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(22, 11, ctx.summaryWeek.revenue), "");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.summaryWeek.orders, " orders");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(32, 13, ctx.summaryMonth.revenue), "");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.summaryMonth.orders, " orders");
      \u0275\u0275advance(20);
      \u0275\u0275property("ngForOf", ctx.topItems);
      \u0275\u0275advance(19);
      \u0275\u0275property("ngForOf", ctx.captainPerf);
      \u0275\u0275advance(23);
      \u0275\u0275property("ngForOf", ctx.leakage);
    }
  }, dependencies: [NgForOf, DecimalPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsComponent, [{
    type: Component,
    args: [{ selector: "app-reports", standalone: true, imports: [NgForOf, DecimalPipe], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>MIS Reports & Analytics</h2>\r
        <p>Business intelligence for Spice Garden</p>\r
      </div>\r
    </div>\r
\r
    <div class="stats-grid" style="margin-bottom:24px">\r
      <div class="stat-card" style="--stat-color:var(--accent-gold)">\r
        <span class="stat-icon">\u{1F4B0}</span>\r
        <div class="stat-value">\u20B9{{ summaryToday.revenue | number }}</div>\r
        <div class="stat-label">Today's Revenue</div>\r
        <div class="stat-change up">{{ summaryToday.orders }} orders</div>\r
      </div>\r
      <div class="stat-card" style="--stat-color:var(--accent-blue)">\r
        <span class="stat-icon">\u{1F4C5}</span>\r
        <div class="stat-value">\u20B9{{ summaryWeek.revenue | number }}</div>\r
        <div class="stat-label">This Week</div>\r
        <div class="stat-change up">{{ summaryWeek.orders }} orders</div>\r
      </div>\r
      <div class="stat-card" style="--stat-color:var(--accent-purple)">\r
        <span class="stat-icon">\u{1F4C6}</span>\r
        <div class="stat-value">\u20B9{{ summaryMonth.revenue | number }}</div>\r
        <div class="stat-label">This Month</div>\r
        <div class="stat-change up">{{ summaryMonth.orders }} orders</div>\r
      </div>\r
    </div>\r
\r
    <div class="grid-2" style="gap:20px;margin-bottom:24px">\r
      <div class="card">\r
        <div class="card-header"><span style="font-size:20px">\u{1F3C6}</span><div class="card-title">Top Items</div></div>\r
        <table class="data-table">\r
          <thead><tr><th>#</th><th>Item</th><th>Qty</th><th>Revenue</th></tr></thead>\r
          <tbody>\r
            <tr *ngFor="let item of topItems; let i = index">\r
              <td style="color:var(--text-muted)">{{ i + 1 }}</td>\r
              <td>{{ item.name }}</td>\r
              <td>{{ item.qty }}</td>\r
              <td style="color:var(--accent-gold)">\u20B9{{ item.revenue | number }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <div class="card">\r
        <div class="card-header"><span style="font-size:20px">\u{1F468}\u200D\u{1F373}</span><div class="card-title">Captain Performance</div></div>\r
        <table class="data-table">\r
          <thead><tr><th>Captain</th><th>Orders</th><th>Revenue</th><th>Avg</th></tr></thead>\r
          <tbody>\r
            <tr *ngFor="let c of captainPerf">\r
              <td>{{ c.name }}</td>\r
              <td>{{ c.orders }}</td>\r
              <td style="color:var(--accent-gold)">\u20B9{{ c.revenue | number }}</td>\r
              <td style="color:var(--text-muted)">\u20B9{{ c.avgValue | number }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
\r
    <div class="card">\r
      <div class="card-header"><span style="font-size:20px">\u26A0\uFE0F</span><div class="card-title">Revenue Leakage Log</div></div>\r
      <table class="data-table">\r
        <thead><tr><th>Type</th><th>Order</th><th>Table</th><th>Captain</th><th>Amount</th><th>Reason</th></tr></thead>\r
        <tbody>\r
          <tr *ngFor="let r of leakage">\r
            <td><span class="badge badge-reserved">{{ r.type }}</span></td>\r
            <td style="font-size:12px">{{ r.orderId }}</td>\r
            <td>{{ r.tableId }}</td>\r
            <td>{{ r.captain }}</td>\r
            <td style="color:var(--danger)">-\u20B9{{ r.amount | number }}</td>\r
            <td style="font-size:11px;color:var(--text-muted)">{{ r.reason }}</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
  \r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src/app/features/reports/reports.component.ts", lineNumber: 13 });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-RAN2AZQT.js.map
