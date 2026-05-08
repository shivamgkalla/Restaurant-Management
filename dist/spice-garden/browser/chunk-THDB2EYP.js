import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import {
  DAILY_SALES,
  SALES_SUMMARY,
  TOP_ITEMS
} from "./chunk-YRUH6UFD.js";
import {
  AuthService
} from "./chunk-5N2V3KFI.js";
import {
  RouterLink
} from "./chunk-DMA3YDAG.js";
import "./chunk-E7QOHDKE.js";
import {
  AsyncPipe,
  Component,
  DecimalPipe,
  LowerCasePipe,
  NgForOf,
  NgIf,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UJPJV6NU.js";

// src/app/features/dashboard/dashboard.component.ts
function DashboardComponent_ng_container_62_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275text(2, "\u{1F389}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "All orders fulfilled!");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_ng_container_62_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div")(2, "div", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275pipe(7, "lowercase");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r1.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Table ", o_r1.tableId, " \xB7 ", o_r1.items.length, " items");
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("badge badge-", \u0275\u0275pipeBind1(7, 7, o_r1.status), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r1.status);
  }
}
function DashboardComponent_ng_container_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DashboardComponent_ng_container_62_div_1_Template, 5, 0, "div", 24)(2, DashboardComponent_ng_container_62_div_2_Template, 9, 9, "div", 20);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const orders_r2 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", orders_r2.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", orders_r2.slice(0, 4));
  }
}
function DashboardComponent_div_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 30)(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 32);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(i_r4 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r3.qty, " sold");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(11, 4, item_r3.revenue), "");
  }
}
function DashboardComponent_tr_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 33);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.orders);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind1(7, 3, d_r5.revenue), "");
  }
}
function greeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12)
    return "Morning";
  if (h < 17)
    return "Afternoon";
  return "Evening";
}
var DashboardComponent = class _DashboardComponent {
  state;
  auth;
  greet = greeting();
  today = SALES_SUMMARY["today"];
  topItems = TOP_ITEMS;
  dailySales = DAILY_SALES;
  firstName$;
  activeOrders$;
  availTables$;
  occupiedTables$;
  totalTables$;
  constructor(state, auth) {
    this.state = state;
    this.auth = auth;
  }
  ngOnInit() {
    this.firstName$ = this.auth.currentUser$.pipe(map((u) => u?.name?.split(" ")[0] ?? ""));
    this.activeOrders$ = this.state.select("orders").pipe(map((orders) => orders.filter((o) => ["Pending", "Preparing", "Served"].includes(o.status))));
    this.availTables$ = this.state.select("tables").pipe(map((t) => t.filter((x) => x.status === "Available").length));
    this.occupiedTables$ = this.state.select("tables").pipe(map((t) => t.filter((x) => x.status === "Occupied").length));
    this.totalTables$ = this.state.select("tables").pipe(map((t) => t.length));
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 93, vars: 31, consts: [[1, "section-header"], [1, "section-header-left"], [1, "stats-grid"], [1, "stat-card", 2, "--stat-color", "var(--accent-gold)"], [1, "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", "up"], [1, "stat-card", 2, "--stat-color", "var(--accent-blue)"], [1, "stat-card", 2, "--stat-color", "var(--status-available)"], [1, "stat-change"], [1, "stat-card", 2, "--stat-color", "var(--accent-purple)"], [1, "grid-2", 2, "gap", "20px", "margin-bottom", "24px"], [1, "card"], [1, "card-header"], [2, "font-size", "20px"], [1, "card-title"], [1, "card-subtitle"], ["routerLink", "/app/orders", 1, "btn", "btn-primary", "btn-sm", 2, "margin-left", "auto"], [4, "ngIf"], ["class", "order-row", 4, "ngFor", "ngForOf"], [2, "overflow-x", "auto"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "empty-state"], [1, "empty-icon"], [1, "order-row"], [2, "font-weight", "600", "font-size", "13px"], [2, "font-size", "11px", "color", "var(--text-muted)"], [2, "display", "flex", "align-items", "center", "gap", "10px"], [2, "font-size", "11px", "font-weight", "700", "color", "var(--text-muted)", "width", "16px"], [2, "font-weight", "600", "color", "var(--accent-gold)", "font-size", "13px"], [2, "color", "var(--accent-gold)"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Here's what's happening at Spice Garden today.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 2)(8, "div", 3)(9, "span", 4);
      \u0275\u0275text(10, "\u{1F4B0}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 5);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 6);
      \u0275\u0275text(15, "Today's Revenue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 7);
      \u0275\u0275text(17, "\u2191 9.4% vs yesterday");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 8)(19, "span", 4);
      \u0275\u0275text(20, "\u{1F4CB}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 5);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 6);
      \u0275\u0275text(24, "Orders Today");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 7);
      \u0275\u0275text(26, "\u2191 6 from yesterday");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 4);
      \u0275\u0275text(29, "\u{1FA91}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 5);
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "async");
      \u0275\u0275pipe(33, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 6);
      \u0275\u0275text(35, "Tables Available");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 10);
      \u0275\u0275text(37);
      \u0275\u0275pipe(38, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 11)(40, "span", 4);
      \u0275\u0275text(41, "\u{1F465}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 5);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 6);
      \u0275\u0275text(45, "Guests Served");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 7);
      \u0275\u0275text(47);
      \u0275\u0275pipe(48, "number");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "div", 12)(50, "div", 13)(51, "div", 14)(52, "span", 15);
      \u0275\u0275text(53, "\u{1F4CB}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "div")(55, "div", 16);
      \u0275\u0275text(56, "Active Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 17);
      \u0275\u0275text(58);
      \u0275\u0275pipe(59, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "a", 18);
      \u0275\u0275text(61, "View All");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(62, DashboardComponent_ng_container_62_Template, 3, 2, "ng-container", 19);
      \u0275\u0275pipe(63, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 13)(65, "div", 14)(66, "span", 15);
      \u0275\u0275text(67, "\u{1F3C6}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div")(69, "div", 16);
      \u0275\u0275text(70, "Top Selling Items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 17);
      \u0275\u0275text(72, "This week");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(73, DashboardComponent_div_73_Template, 12, 6, "div", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 13)(75, "div", 14)(76, "span", 15);
      \u0275\u0275text(77, "\u{1F4C8}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div")(79, "div", 16);
      \u0275\u0275text(80, "Sales This Week");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(81, "div", 21)(82, "table", 22)(83, "thead")(84, "tr")(85, "th");
      \u0275\u0275text(86, "Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "th");
      \u0275\u0275text(88, "Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "th");
      \u0275\u0275text(90, "Revenue");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(91, "tbody");
      \u0275\u0275template(92, DashboardComponent_tr_92_Template, 8, 5, "tr", 23);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Good ", ctx.greet, ", ", \u0275\u0275pipeBind1(4, 13, ctx.firstName$), "! \u{1F44B}");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(13, 15, ctx.today.revenue, "1.2-2"), "");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.today.orders);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(32, 18, ctx.availTables$), " / ", \u0275\u0275pipeBind1(33, 20, ctx.totalTables$), "");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(38, 22, ctx.occupiedTables$), " occupied");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.today.customers);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Avg. \u20B9", \u0275\u0275pipeBind2(48, 24, ctx.today.avgOrderValue, "1.0-0"), "/order");
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1("", (tmp_7_0 = \u0275\u0275pipeBind1(59, 27, ctx.activeOrders$)) == null ? null : tmp_7_0.length, " in progress");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(63, 29, ctx.activeOrders$));
      \u0275\u0275advance(11);
      \u0275\u0275property("ngForOf", ctx.topItems);
      \u0275\u0275advance(19);
      \u0275\u0275property("ngForOf", ctx.dailySales);
    }
  }, dependencies: [AsyncPipe, NgForOf, NgIf, RouterLink, DecimalPipe, LowerCasePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [AsyncPipe, NgForOf, NgIf, RouterLink, DecimalPipe, LowerCasePipe], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Good {{ greet }}, {{ firstName$ | async }}! \u{1F44B}</h2>\r
        <p>Here's what's happening at Spice Garden today.</p>\r
      </div>\r
    </div>\r
\r
    <div class="stats-grid">\r
      <div class="stat-card" style="--stat-color: var(--accent-gold)">\r
        <span class="stat-icon">\u{1F4B0}</span>\r
        <div class="stat-value">\u20B9{{ today.revenue | number:'1.2-2' }}</div>\r
        <div class="stat-label">Today's Revenue</div>\r
        <div class="stat-change up">\u2191 9.4% vs yesterday</div>\r
      </div>\r
      <div class="stat-card" style="--stat-color: var(--accent-blue)">\r
        <span class="stat-icon">\u{1F4CB}</span>\r
        <div class="stat-value">{{ today.orders }}</div>\r
        <div class="stat-label">Orders Today</div>\r
        <div class="stat-change up">\u2191 6 from yesterday</div>\r
      </div>\r
      <div class="stat-card" style="--stat-color: var(--status-available)">\r
        <span class="stat-icon">\u{1FA91}</span>\r
        <div class="stat-value">{{ (availTables$ | async) }} / {{ (totalTables$ | async) }}</div>\r
        <div class="stat-label">Tables Available</div>\r
        <div class="stat-change">{{ occupiedTables$ | async }} occupied</div>\r
      </div>\r
      <div class="stat-card" style="--stat-color: var(--accent-purple)">\r
        <span class="stat-icon">\u{1F465}</span>\r
        <div class="stat-value">{{ today.customers }}</div>\r
        <div class="stat-label">Guests Served</div>\r
        <div class="stat-change up">Avg. \u20B9{{ today.avgOrderValue | number:'1.0-0' }}/order</div>\r
      </div>\r
    </div>\r
\r
    <div class="grid-2" style="gap:20px;margin-bottom:24px">\r
      <div class="card">\r
        <div class="card-header">\r
          <span style="font-size:20px">\u{1F4CB}</span>\r
          <div>\r
            <div class="card-title">Active Orders</div>\r
            <div class="card-subtitle">{{ (activeOrders$ | async)?.length }} in progress</div>\r
          </div>\r
          <a routerLink="/app/orders" class="btn btn-primary btn-sm" style="margin-left:auto">View All</a>\r
        </div>\r
        <ng-container *ngIf="activeOrders$ | async as orders">\r
          <div *ngIf="orders.length === 0" class="empty-state">\r
            <div class="empty-icon">\u{1F389}</div><p>All orders fulfilled!</p>\r
          </div>\r
          <div *ngFor="let o of orders.slice(0, 4)" class="order-row">\r
            <div>\r
              <div style="font-weight:600;font-size:13px">{{ o.id }}</div>\r
              <div style="font-size:11px;color:var(--text-muted)">Table {{ o.tableId }} \xB7 {{ o.items.length }} items</div>\r
            </div>\r
            <span class="badge badge-{{ o.status | lowercase }}">{{ o.status }}</span>\r
          </div>\r
        </ng-container>\r
      </div>\r
\r
      <div class="card">\r
        <div class="card-header">\r
          <span style="font-size:20px">\u{1F3C6}</span>\r
          <div>\r
            <div class="card-title">Top Selling Items</div>\r
            <div class="card-subtitle">This week</div>\r
          </div>\r
        </div>\r
        <div *ngFor="let item of topItems; let i = index" class="order-row">\r
          <div style="display:flex;align-items:center;gap:10px">\r
            <span style="font-size:11px;font-weight:700;color:var(--text-muted);width:16px">{{ i + 1 }}</span>\r
            <div>\r
              <div style="font-weight:600;font-size:13px">{{ item.name }}</div>\r
              <div style="font-size:11px;color:var(--text-muted)">{{ item.qty }} sold</div>\r
            </div>\r
          </div>\r
          <div style="font-weight:600;color:var(--accent-gold);font-size:13px">\u20B9{{ item.revenue | number }}</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="card">\r
      <div class="card-header">\r
        <span style="font-size:20px">\u{1F4C8}</span>\r
        <div><div class="card-title">Sales This Week</div></div>\r
      </div>\r
      <div style="overflow-x:auto">\r
        <table class="data-table">\r
          <thead><tr><th>Date</th><th>Orders</th><th>Revenue</th></tr></thead>\r
          <tbody>\r
            <tr *ngFor="let d of dailySales">\r
              <td>{{ d.date }}</td>\r
              <td>{{ d.orders }}</td>\r
              <td style="color:var(--accent-gold)">\u20B9{{ d.revenue | number }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
  \r
` }]
  }], () => [{ type: StateService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 25 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-THDB2EYP.js.map
