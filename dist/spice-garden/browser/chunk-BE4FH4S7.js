import {
  AuthService
} from "./chunk-5N2V3KFI.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-DMA3YDAG.js";
import "./chunk-E7QOHDKE.js";
import {
  AsyncPipe,
  Component,
  NgForOf,
  NgIf,
  interval,
  setClassMetadata,
  startWith,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-UJPJV6NU.js";

// src/app/features/shell/shell.component.ts
var _c0 = () => ({ exact: false });
function ShellComponent_ng_container_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.section);
  }
}
function ShellComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ShellComponent_ng_container_10_div_1_Template, 2, 1, "div", 17);
    \u0275\u0275elementStart(2, "a", 18)(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isFirstInSection(i_r2));
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r1.route)("routerLinkActiveOptions", \u0275\u0275pureFunction0(5, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function ShellComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 26);
    \u0275\u0275listener("click", function ShellComponent_div_11_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.logout());
    });
    \u0275\u0275text(10, "\u{1F6AA} Sign Out");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.ngIf;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.initials(user_r5.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.role);
  }
}
var ALL_NAV = [
  { id: "dashboard", icon: "\u{1F4CA}", label: "Dashboard", section: "MAIN", route: "/app/dashboard" },
  { id: "zones", icon: "\u{1F4CD}", label: "Zone Management", section: "OPERATIONS", route: "/app/zones" },
  { id: "tables", icon: "\u{1FA91}", label: "Table Management", section: "OPERATIONS", route: "/app/tables" },
  { id: "orders", icon: "\u{1F4CB}", label: "Order Management", section: "OPERATIONS", route: "/app/orders" },
  { id: "kitchen-station", icon: "\u{1F373}", label: "Kitchen Station Management", section: "OPERATIONS", route: "/app/kitchen-station" },
  { id: "billing", icon: "\u{1F9FE}", label: "Billing & Settlement", section: "OPERATIONS", route: "/app/billing" },
  { id: "rfid", icon: "\u{1F4B3}", label: "RFID Card System", section: "OPERATIONS", route: "/app/rfid" },
  { id: "customers", icon: "\u{1F465}", label: "Customer Management", section: "MANAGEMENT", route: "/app/customers" },
  { id: "category", icon: "\u{1F5C2}\uFE0F", label: "Menu Category Management", section: "MANAGEMENT", route: "/app/category" },
  { id: "menu", icon: "\u{1F37D}\uFE0F", label: "Menu Management", section: "MANAGEMENT", route: "/app/menu" },
  { id: "staff", icon: "\u{1F464}", label: "Staff Management", section: "MANAGEMENT", route: "/app/staff" },
  { id: "reports", icon: "\u{1F4C8}", label: "MIS Reports", section: "ANALYTICS", route: "/app/reports" },
  { id: "admin", icon: "\u2699\uFE0F", label: "Admin Controls", section: "SETTINGS", route: "/app/admin" }
];
var ShellComponent = class _ShellComponent {
  auth;
  router;
  visibleNav = [];
  currentUser$;
  clock = "";
  pageTitle = "Dashboard";
  clockSub;
  routerSub;
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
  }
  ngOnInit() {
    this.currentUser$ = this.auth.currentUser$;
    this.visibleNav = ALL_NAV.filter((item) => this.auth.canAccess(item.id));
    this.clockSub = interval(1e3).pipe(startWith(0)).subscribe(() => {
      this.clock = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    });
    this.routerSub = this.router.events.subscribe(() => {
      const url = this.router.url.split("?")[0].split("/").pop() ?? "";
      this.pageTitle = PAGE_TITLES[url] ?? "Spice Garden";
    });
  }
  ngOnDestroy() {
    this.clockSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }
  isFirstInSection(index) {
    if (index === 0)
      return true;
    return this.visibleNav[index].section !== this.visibleNav[index - 1].section;
  }
  initials(name) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }
  logout() {
    this.auth.logout();
  }
  static \u0275fac = function ShellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShellComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["app-shell"]], decls: 26, vars: 6, consts: [[1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], [1, "sidebar-title"], [1, "sidebar-subtitle"], [1, "sidebar-nav"], [4, "ngFor", "ngForOf"], ["class", "sidebar-footer", 4, "ngIf"], [1, "main-content"], [1, "topbar"], [1, "topbar-title-wrapper"], [1, "topbar-title"], [1, "flex", "items-center", "gap-md"], [1, "topbar-clock"], [1, "topbar-divider"], [1, "topbar-location"], [1, "page-content"], ["class", "nav-section-label", 4, "ngIf"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink", "routerLinkActiveOptions"], [1, "nav-icon"], [1, "nav-section-label"], [1, "sidebar-footer"], [1, "user-info"], [1, "user-avatar"], [1, "user-name"], [1, "user-role"], [1, "btn", "btn-secondary", "btn-full", "btn-sm", 3, "click"]], template: function ShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "\u{1F33F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "div", 3);
      \u0275\u0275text(6, "Spice Garden");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 4);
      \u0275\u0275text(8, "Restaurant OS");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "nav", 5);
      \u0275\u0275template(10, ShellComponent_ng_container_10_Template, 7, 6, "ng-container", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275template(11, ShellComponent_div_11_Template, 11, 3, "div", 7);
      \u0275\u0275pipe(12, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 8)(14, "header", 9)(15, "div", 10)(16, "div", 11);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 12)(19, "div", 13);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "div", 14);
      \u0275\u0275elementStart(22, "div", 15);
      \u0275\u0275text(23, "\u{1F4CD} Spice Garden, Koramangala");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "main", 16);
      \u0275\u0275element(25, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275property("ngForOf", ctx.visibleNav);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(12, 4, ctx.currentUser$));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.pageTitle);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.clock);
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgForOf, NgIf], styles: ["\n\n.topbar-title-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.topbar-clock[_ngcontent-%COMP%] {\n  text-align: right;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.topbar-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 32px;\n  background: var(--border);\n}\n.topbar-location[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n/*# sourceMappingURL=shell.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShellComponent, [{
    type: Component,
    args: [{ selector: "app-shell", standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgForOf, NgIf], template: '    <aside class="sidebar">\r\n      <div class="sidebar-header">\r\n        <span class="sidebar-logo">\u{1F33F}</span>\r\n        <div>\r\n          <div class="sidebar-title">Spice Garden</div>\r\n          <div class="sidebar-subtitle">Restaurant OS</div>\r\n        </div>\r\n      </div>\r\n\r\n      <nav class="sidebar-nav">\r\n        <ng-container *ngFor="let item of visibleNav; let i = index">\r\n          <div *ngIf="isFirstInSection(i)" class="nav-section-label">{{ item.section }}</div>\r\n          <a class="nav-item"\r\n             [routerLink]="item.route"\r\n             routerLinkActive="active"\r\n             [routerLinkActiveOptions]="{ exact: false }">\r\n            <span class="nav-icon">{{ item.icon }}</span>\r\n            <span>{{ item.label }}</span>\r\n          </a>\r\n        </ng-container>\r\n      </nav>\r\n\r\n      <div class="sidebar-footer" *ngIf="currentUser$ | async as user">\r\n        <div class="user-info">\r\n          <div class="user-avatar">{{ initials(user.name) }}</div>\r\n          <div>\r\n            <div class="user-name">{{ user.name }}</div>\r\n            <span class="user-role">{{ user.role }}</span>\r\n          </div>\r\n        </div>\r\n        <button class="btn btn-secondary btn-full btn-sm" (click)="logout()">\u{1F6AA} Sign Out</button>\r\n      </div>\r\n    </aside>\r\n\r\n    <div class="main-content">\r\n      <header class="topbar">\r\n        <div class="topbar-title-wrapper">\r\n          <div class="topbar-title">{{ pageTitle }}</div>\r\n        </div>\r\n        <div class="flex items-center gap-md">\r\n          <div class="topbar-clock">{{ clock }}</div>\r\n          <div class="topbar-divider"></div>\r\n          <div class="topbar-location">\u{1F4CD} Spice Garden, Koramangala</div>\r\n        </div>\r\n      </header>\r\n      <main class="page-content">\r\n        <router-outlet></router-outlet>\r\n      </main>\r\n    </div>\r\n  \r\n', styles: ["/* src/app/features/shell/shell.component.css */\n.topbar-title-wrapper {\n  flex: 1;\n}\n.topbar-clock {\n  text-align: right;\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.topbar-divider {\n  width: 1px;\n  height: 32px;\n  background: var(--border);\n}\n.topbar-location {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n/*# sourceMappingURL=shell.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src/app/features/shell/shell.component.ts", lineNumber: 40 });
})();
var PAGE_TITLES = {
  dashboard: "Dashboard",
  zones: "Zone Management",
  tables: "Table Management",
  orders: "Order Management",
  "kitchen-station": "Kitchen Station Management",
  billing: "Billing & Settlement",
  rfid: "RFID Card System",
  customers: "Customer Management",
  category: "Menu Category Management",
  menu: "Menu Management",
  staff: "Staff Management",
  reports: "MIS Reports & Analytics",
  admin: "Admin Controls"
};
export {
  ShellComponent
};
//# sourceMappingURL=chunk-BE4FH4S7.js.map
