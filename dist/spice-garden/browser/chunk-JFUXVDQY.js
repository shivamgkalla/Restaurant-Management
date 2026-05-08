import {
  AuthService
} from "./chunk-5N2V3KFI.js";
import {
  Router
} from "./chunk-DMA3YDAG.js";
import {
  ApiLoaderComponent
} from "./chunk-SWBXCHKP.js";
import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import "./chunk-E7QOHDKE.js";
import {
  Component,
  Injectable,
  NgIf,
  finalize,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/login.service.ts
var LoginService = class _LoginService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  login(credentials) {
    return this.genricService.Post("auth/login", credentials);
  }
  forgotPassword(payload) {
    return this.genricService.Post("user/forgot-password", payload);
  }
  verificationCode(payload) {
    return this.genricService.Post("user/verify-otp", payload);
  }
  static \u0275fac = function LoginService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoginService, factory: _LoginService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

// src/app/features/login/login.component.ts
function LoginComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMsg);
  }
}
var LoginComponent = class _LoginComponent {
  auth;
  router;
  toast;
  loginService;
  username = "";
  password = "";
  errorMsg = "";
  /** Prevents double submit while login request is in flight */
  isSubmitting = false;
  quickRoles = [
    { label: "Admin", icon: "\u{1F451}", username: "admin", password: "admin123" },
    { label: "Manager", icon: "\u{1F4CA}", username: "manager", password: "manager123" },
    { label: "Captain", icon: "\u{1F37D}\uFE0F", username: "captain1", password: "cap123" },
    { label: "Cashier", icon: "\u{1F4B0}", username: "cashier", password: "cash123" },
    { label: "Kitchen", icon: "\u{1F52A}", username: "kitchen", password: "kitchen123" },
    { label: "Captain 2", icon: "\u{1F37D}\uFE0F", username: "captain2", password: "cap456" }
  ];
  constructor(auth, router, toast, loginService) {
    this.auth = auth;
    this.router = router;
    this.toast = toast;
    this.loginService = loginService;
  }
  quickLogin(role) {
    this.username = role.username;
    this.password = role.password;
    this.doLogin();
  }
  onSubmit() {
    this.doLogin();
  }
  doLogin() {
    if (this.isSubmitting) {
      return;
    }
    this.errorMsg = "";
    const username = this.username.trim();
    const password = this.password;
    if (!username || !password) {
      this.errorMsg = "Please enter username/username and password.";
      return;
    }
    this.isSubmitting = true;
    this.loginService.login({ username, password }).pipe(finalize(() => this.isSubmitting = false)).subscribe({
      next: (res) => {
        const responseCode = Number(res?.responseCode ?? 200);
        const responseMessage = res?.message;
        if (responseCode === 400) {
          this.errorMsg = responseMessage ?? "Invalid request. Please check your credentials.";
          return;
        }
        if (responseCode === 404) {
          this.errorMsg = responseMessage ?? "User not found.";
          return;
        }
        if (responseCode === 500) {
          this.errorMsg = responseMessage ?? "Server error. Please try again later.";
          return;
        }
        if (responseCode !== 200) {
          this.errorMsg = responseMessage ?? `Login failed with code ${responseCode}.`;
          return;
        }
        const payload = res?.access_token ? res : res?.data ?? res?.result ?? res;
        const accessToken = payload.access_token ?? payload.accessToken;
        const refreshToken = payload.refresh_token ?? payload.refreshToken;
        const staff = payload.staff;
        if (!accessToken || !refreshToken || !staff?.role) {
          this.errorMsg = "Login failed: invalid server response.";
          return;
        }
        this.auth.setSession({ accessToken, refreshToken, staff });
        this.toast.show(`Welcome back, ${staff?.name?.split(" ")[0] ?? "User"}!`);
        this.router.navigate(["/app/dashboard"]);
      },
      error: (err) => {
        const status = Number(err?.status);
        const serverMessage = err?.error?.message ?? err?.message;
        if (status === 400) {
          this.errorMsg = serverMessage ?? "Invalid request. Please check your credentials.";
          return;
        }
        if (status === 404) {
          this.errorMsg = serverMessage ?? "User not found.";
          return;
        }
        if (status === 500) {
          this.errorMsg = serverMessage ?? "Server error. Please try again later.";
          return;
        }
        this.errorMsg = serverMessage ?? "Login failed. Please try again.";
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(LoginService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 26, vars: 10, consts: [[1, "login-screen"], [3, "show", "fullscreen", "message"], [1, "login-box"], [1, "login-logo"], [1, "logo-icon"], [1, "quick-login-label"], [1, "login-divider"], [3, "ngSubmit"], [1, "form-group"], ["for", "username", 1, "form-label"], ["id", "username", "type", "text", "placeholder", "e.g. admin, captain1, cashier\u2026", "autocomplete", "username", "name", "username", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "password", 1, "form-label"], ["id", "password", "type", "password", "placeholder", "Enter password\u2026", "autocomplete", "current-password", "name", "password", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["class", "co-form-error", "style", "margin-bottom:8px", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "btn-full", "btn-lg", 2, "margin-top", "8px", 3, "disabled"], [1, "co-form-error", 2, "margin-bottom", "8px"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-api-loader", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "\u{1F33F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7, "Spice Garden");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9, "Restaurant Management System");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "p", 5);
      \u0275\u0275text(11, "Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6);
      \u0275\u0275text(13, "or enter credentials manually");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "form", 7);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_14_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(15, "div", 8)(16, "label", 9);
      \u0275\u0275text(17, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 8)(20, "label", 11);
      \u0275\u0275text(21, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(23, LoginComponent_div_23_Template, 2, 1, "div", 13);
      \u0275\u0275elementStart(24, "button", 14);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("show", ctx.isSubmitting)("fullscreen", true)("message", "Signing in\u2026");
      \u0275\u0275advance(17);
      \u0275\u0275twoWayProperty("ngModel", ctx.username);
      \u0275\u0275property("disabled", ctx.isSubmitting);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275property("disabled", ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMsg);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Signing in\u2026" : "Sign In \u2192", " ");
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, NgIf, ApiLoaderComponent], styles: ['\n\n.login-screen[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-primary);\n  padding: 24px;\n}\n.login-box[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  padding: 32px;\n}\n.login-logo[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 28px;\n}\n.login-logo[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  display: block;\n  margin-bottom: 8px;\n}\n.login-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.login-logo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.quick-login-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  margin-bottom: 12px;\n}\n.login-quick-roles[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.login-divider[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 11px;\n  color: var(--text-muted);\n  margin: 16px 0;\n  position: relative;\n}\n.login-divider[_ngcontent-%COMP%]::before, \n.login-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  width: 30%;\n  height: 1px;\n  background: var(--border);\n}\n.login-divider[_ngcontent-%COMP%]::before {\n  left: 0;\n}\n.login-divider[_ngcontent-%COMP%]::after {\n  right: 0;\n}\n.customer-order-banner[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 14px;\n  background: rgba(220, 38, 38, 0.06);\n  border: 1px solid rgba(220, 38, 38, 0.18);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.login-hint[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 12px;\n  background: var(--bg-input);\n  border-radius: var(--radius-md);\n  font-size: 11px;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [FormsModule, NgIf, ApiLoaderComponent], template: `    <div class="login-screen">\r
      <app-api-loader [show]="isSubmitting" [fullscreen]="true" [message]="'Signing in\u2026'"></app-api-loader>\r
      <div class="login-box">\r
        <div class="login-logo">\r
          <span class="logo-icon">\u{1F33F}</span>\r
          <h1>Spice Garden</h1>\r
          <p>Restaurant Management System</p>\r
        </div>\r
\r
        <p class="quick-login-label">Login</p>\r
        <!-- <div class="login-quick-roles">\r
          <button *ngFor="let r of quickRoles" class="role-btn" (click)="quickLogin(r)">\r
            <div style="font-size:16px;margin-bottom:2px">{{ r.icon }}</div>\r
            <div>{{ r.label }}</div>\r
          </button>\r
        </div> -->\r
\r
        <div class="login-divider">or enter credentials manually</div>\r
\r
        <form (ngSubmit)="onSubmit()">\r
          <div class="form-group">\r
            <label class="form-label" for="username">Username</label>\r
            <input id="username" class="form-input" type="text"\r
              placeholder="e.g. admin, captain1, cashier\u2026"\r
              autocomplete="username"\r
              [(ngModel)]="username" name="username" required\r
              [disabled]="isSubmitting">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label" for="password">Password</label>\r
            <input id="password" class="form-input" type="password"\r
              placeholder="Enter password\u2026"\r
              autocomplete="current-password"\r
              [(ngModel)]="password" name="password" required\r
              [disabled]="isSubmitting">\r
          </div>\r
          <div *ngIf="errorMsg" class="co-form-error" style="margin-bottom:8px">{{ errorMsg }}</div>\r
          <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:8px"\r
            [disabled]="isSubmitting">\r
            {{ isSubmitting ? 'Signing in\u2026' : 'Sign In \u2192' }}\r
          </button>\r
        </form>\r
\r
        <!-- <div class="customer-order-banner">\r
          <span style="font-size:22px">\u{1F6CD}\uFE0F</span>\r
          <div style="flex:1;font-size:12px;color:var(--text-secondary);line-height:1.5">\r
            Placing a <strong style="color:var(--text-primary)">pickup order</strong> as a customer?\r
          </div>\r
          <a [routerLink]="['/order']" class="btn btn-secondary btn-sm" style="flex-shrink:0">Order Online</a>\r
        </div>\r
\r
        <div class="login-hint">\r
          <strong style="color:var(--text-secondary)">Staff credentials:</strong><br>\r
          admin / admin123 &nbsp;|&nbsp; manager / manager123 &nbsp;|&nbsp; captain1 / cap123<br>\r
          cashier / cash123 &nbsp;|&nbsp; kitchen / kitchen123\r
        </div> -->\r
      </div>\r
    </div>\r
  \r
`, styles: ['/* src/app/features/login/login.component.css */\n.login-screen {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-primary);\n  padding: 24px;\n}\n.login-box {\n  width: 100%;\n  max-width: 440px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  padding: 32px;\n}\n.login-logo {\n  text-align: center;\n  margin-bottom: 28px;\n}\n.login-logo .logo-icon {\n  font-size: 48px;\n  display: block;\n  margin-bottom: 8px;\n}\n.login-logo h1 {\n  font-size: 24px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.login-logo p {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.quick-login-label {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  margin-bottom: 12px;\n}\n.login-quick-roles {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.login-divider {\n  text-align: center;\n  font-size: 11px;\n  color: var(--text-muted);\n  margin: 16px 0;\n  position: relative;\n}\n.login-divider::before,\n.login-divider::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  width: 30%;\n  height: 1px;\n  background: var(--border);\n}\n.login-divider::before {\n  left: 0;\n}\n.login-divider::after {\n  right: 0;\n}\n.customer-order-banner {\n  margin-top: 16px;\n  padding: 14px;\n  background: rgba(220, 38, 38, 0.06);\n  border: 1px solid rgba(220, 38, 38, 0.18);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.login-hint {\n  margin-top: 12px;\n  padding: 12px;\n  background: var(--bg-input);\n  border-radius: var(--radius-md);\n  font-size: 11px;\n  color: var(--text-muted);\n  line-height: 1.7;\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }, { type: ToastService }, { type: LoginService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/login/login.component.ts", lineNumber: 25 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-JFUXVDQY.js.map
