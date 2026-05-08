import {
  BehaviorSubject,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  _toasts$ = new BehaviorSubject([]);
  toasts$ = this._toasts$.asObservable();
  show(message, type = "success", duration = 3e3) {
    const id = Date.now().toString(36);
    const toast = { id, message, type };
    this._toasts$.next([...this._toasts$.value, toast]);
    setTimeout(() => this.dismiss(id), duration);
  }
  dismiss(id) {
    this._toasts$.next(this._toasts$.value.filter((t) => t.id !== id));
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ToastService
};
//# sourceMappingURL=chunk-ZS6BNEOG.js.map
