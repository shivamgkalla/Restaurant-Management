import {
  Router
} from "./chunk-DMA3YDAG.js";
import {
  BehaviorSubject,
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/models/index.ts
var ROLE_PERMISSIONS = {
  Admin: ["dashboard", "zones", "customers", "category", "menu", "tables", "orders", "kitchen-station", "staff", "billing", "rfid", "reports", "admin"],
  Manager: ["dashboard", "customers", "category", "tables", "orders", "kitchen-station", "billing", "reports", "admin"],
  Captain: ["dashboard", "tables", "orders"],
  Cashier: ["dashboard", "billing", "rfid", "customers"],
  Kitchen: ["dashboard", "orders", "kitchen-station"]
};

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  router;
  static ACCESS_TOKEN_KEY = "spicegarden_access_token";
  static REFRESH_TOKEN_KEY = "spicegarden_refresh_token";
  static CURRENT_USER_KEY = "spicegarden_current_user";
  _currentUser$ = new BehaviorSubject(null);
  currentUser$ = this._currentUser$.asObservable();
  isLoggedIn$ = this._currentUser$.pipe(map((u) => u !== null));
  constructor(router) {
    this.router = router;
    this.restoreFromStorage();
  }
  get currentUser() {
    return this._currentUser$.value;
  }
  setSession(payload) {
    const role = normalizeRole(payload.staff.role);
    const user = {
      id: String(payload.staff.employee_id ?? payload.staff.id),
      name: payload.staff.name,
      role,
      username: payload.staff.username,
      password: "",
      phone: "",
      email: "",
      doj: "",
      status: "Active",
      photo: null,
      address: ""
    };
    localStorage.setItem(_AuthService.ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(_AuthService.REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.setItem(_AuthService.CURRENT_USER_KEY, JSON.stringify(user));
    this._currentUser$.next(user);
  }
  logout() {
    this._currentUser$.next(null);
    try {
      localStorage.clear();
    } catch {
      localStorage.removeItem(_AuthService.ACCESS_TOKEN_KEY);
      localStorage.removeItem(_AuthService.REFRESH_TOKEN_KEY);
      localStorage.removeItem(_AuthService.CURRENT_USER_KEY);
    }
    void this.router.navigate(["/login"], { replaceUrl: true });
  }
  canAccess(module) {
    const user = this._currentUser$.value;
    if (!user)
      return false;
    return (ROLE_PERMISSIONS[user.role] ?? []).includes(module);
  }
  canAccess$(module) {
    return this._currentUser$.pipe(map((user) => {
      if (!user)
        return false;
      return (ROLE_PERMISSIONS[user.role] ?? []).includes(module);
    }));
  }
  getAllowedRoutes() {
    const user = this._currentUser$.value;
    if (!user)
      return [];
    return ROLE_PERMISSIONS[user.role] ?? [];
  }
  getAccessToken() {
    return localStorage.getItem(_AuthService.ACCESS_TOKEN_KEY);
  }
  restoreFromStorage() {
    const raw = localStorage.getItem(_AuthService.CURRENT_USER_KEY);
    if (!raw)
      return;
    try {
      const user = JSON.parse(raw);
      if (!user?.username)
        return;
      this._currentUser$.next(user);
    } catch {
    }
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Router }], null);
})();
function normalizeRole(role) {
  const r = (role ?? "").trim().toLowerCase();
  if (r === "admin")
    return "Admin";
  if (r === "manager")
    return "Manager";
  if (r === "captain")
    return "Captain";
  if (r === "cashier")
    return "Cashier";
  if (r === "kitchen")
    return "Kitchen";
  return "Captain";
}

export {
  AuthService
};
//# sourceMappingURL=chunk-5N2V3KFI.js.map
