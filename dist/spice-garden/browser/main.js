import {
  AuthService
} from "./chunk-5N2V3KFI.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-DMA3YDAG.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import {
  provideHttpClient,
  withInterceptors
} from "./chunk-E7QOHDKE.js";
import {
  AsyncPipe,
  Component,
  NgForOf,
  inject,
  map,
  provideZoneChangeDetection,
  setClassMetadata,
  take,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-UJPJV6NU.js";

// src/app/core/guards/auth.guard.ts
var authGuard = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn$.pipe(take(1), map((loggedIn) => {
    if (!loggedIn) {
      router.navigate(["/login"]);
      return false;
    }
    const module = route.data["module"];
    if (module && !auth.canAccess(module)) {
      router.navigate(["/app/dashboard"]);
      return false;
    }
    return true;
  }));
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./chunk-JFUXVDQY.js").then((m) => m.LoginComponent)
  },
  {
    path: "order",
    loadComponent: () => import("./chunk-KPFJYZBZ.js").then((m) => m.CustomerOrderComponent)
  },
  {
    path: "app",
    loadComponent: () => import("./chunk-BE4FH4S7.js").then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", loadComponent: () => import("./chunk-THDB2EYP.js").then((m) => m.DashboardComponent), canActivate: [authGuard], data: { module: "dashboard" } },
      { path: "zones", loadComponent: () => import("./chunk-JR54QMYK.js").then((m) => m.ZonesComponent), canActivate: [authGuard], data: { module: "zones" } },
      { path: "tables", loadComponent: () => import("./chunk-UQGVKUVU.js").then((m) => m.TablesComponent), canActivate: [authGuard], data: { module: "tables" } },
      { path: "orders", loadComponent: () => import("./chunk-H2ZUBBRW.js").then((m) => m.OrdersComponent), canActivate: [authGuard], data: { module: "orders" } },
      { path: "kitchen-station", loadComponent: () => import("./chunk-6ENIMCBG.js").then((m) => m.KitchenStationComponent), canActivate: [authGuard], data: { module: "kitchen-station" } },
      { path: "billing", loadComponent: () => import("./chunk-7KROCVPK.js").then((m) => m.BillingComponent), canActivate: [authGuard], data: { module: "billing" } },
      { path: "rfid", loadComponent: () => import("./chunk-GXCPFACF.js").then((m) => m.RfidComponent), canActivate: [authGuard], data: { module: "rfid" } },
      { path: "customers", loadComponent: () => import("./chunk-HETXWH73.js").then((m) => m.CustomersComponent), canActivate: [authGuard], data: { module: "customers" } },
      { path: "category", loadComponent: () => import("./chunk-B7DGEYA7.js").then((m) => m.CategoryComponent), canActivate: [authGuard], data: { module: "category" } },
      { path: "menu", loadComponent: () => import("./chunk-3KLAJEDL.js").then((m) => m.MenuComponent), canActivate: [authGuard], data: { module: "menu" } },
      { path: "staff", loadComponent: () => import("./chunk-64GJFRR2.js").then((m) => m.StaffComponent), canActivate: [authGuard], data: { module: "staff" } },
      { path: "reports", loadComponent: () => import("./chunk-RAN2AZQT.js").then((m) => m.ReportsComponent), canActivate: [authGuard], data: { module: "reports" } },
      { path: "admin", loadComponent: () => import("./chunk-NOP6HTBW.js").then((m) => m.AdminComponent), canActivate: [authGuard], data: { module: "admin" } }
    ]
  },
  { path: "**", redirectTo: "login" }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getAccessToken();
  if (!token)
    return next(req);
  return next(req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

// src/app/shared/components/toast/toast.component.ts
function ToastComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function ToastComponent_div_1_Template_div_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toastService.dismiss(t_r2.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("toast ", t_r2.type, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.icons[t_r2.type]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.message);
  }
}
var ICONS = {
  success: "\u2705",
  error: "\u274C",
  warning: "\u26A0\uFE0F",
  info: "\u2139\uFE0F"
};
var ToastComponent = class _ToastComponent {
  toastService;
  icons = ICONS;
  constructor(toastService) {
    this.toastService = toastService;
  }
  static \u0275fac = function ToastComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastComponent)(\u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastComponent, selectors: [["app-toast"]], decls: 3, vars: 3, consts: [[1, "toast-container"], [3, "class", "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function ToastComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, ToastComponent_div_1_Template, 5, 5, "div", 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(2, 1, ctx.toastService.toasts$));
    }
  }, dependencies: [AsyncPipe, NgForOf], styles: ["\n\n.toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 1000;\n}\n/*# sourceMappingURL=toast.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastComponent, [{
    type: Component,
    args: [{ selector: "app-toast", standalone: true, imports: [AsyncPipe, NgForOf], template: '    <div class="toast-container">\r\n      <div *ngFor="let t of toastService.toasts$ | async"\r\n           class="toast {{ t.type }}"\r\n           (click)="toastService.dismiss(t.id)">\r\n        <span>{{ icons[t.type] }}</span>\r\n        <span>{{ t.message }}</span>\r\n      </div>\r\n    </div>\r\n  \r\n', styles: ["/* src/app/shared/components/toast/toast.component.css */\n.toast-container {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 1000;\n}\n/*# sourceMappingURL=toast.component.css.map */\n"] }]
  }], () => [{ type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src/app/shared/components/toast/toast.component.ts", lineNumber: 17 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet")(1, "app-toast");
    }
  }, dependencies: [RouterOutlet, ToastComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet, ToastComponent], template: "    <router-outlet></router-outlet>\r\n    <app-toast></app-toast>\r\n  \r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 12 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
