import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import "./chunk-YRUH6UFD.js";
import {
  RouterLink
} from "./chunk-DMA3YDAG.js";
import {
  FormsModule
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import "./chunk-E7QOHDKE.js";
import {
  Component,
  DecimalPipe,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-UJPJV6NU.js";

// src/app/features/customer-order/customer-order.component.ts
function CustomerOrderComponent_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function CustomerOrderComponent_button_36_Template_button_click_0_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedCat = c_r2.id);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.selectedCat === c_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r2.icon, " ", c_r2.name, "");
  }
}
function CustomerOrderComponent_div_38_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "button", 39);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_38_div_11_div_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const item_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart(item_r5));
    });
    \u0275\u0275text(2, "+ Add");
    \u0275\u0275elementEnd()();
  }
}
function CustomerOrderComponent_div_38_div_11_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "button", 41);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_38_div_11_ng_template_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeFromCart(item_r5));
    });
    \u0275\u0275text(2, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 41);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_38_div_11_ng_template_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart(item_r5));
    });
    \u0275\u0275text(6, "+");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.cartQty(item_r5));
  }
}
function CustomerOrderComponent_div_38_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, CustomerOrderComponent_div_38_div_11_div_1_Template, 3, 0, "div", 38)(2, CustomerOrderComponent_div_38_div_11_ng_template_2_Template, 7, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const qtyCtrl_r7 = \u0275\u0275reference(3);
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.cartQty(item_r5) === 0)("ngIfElse", qtyCtrl_r7);
  }
}
function CustomerOrderComponent_div_38_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "Not Available");
    \u0275\u0275elementEnd();
  }
}
function CustomerOrderComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 36)(9, "span", 37);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, CustomerOrderComponent_div_38_div_11_Template, 4, 2, "div", 38)(12, CustomerOrderComponent_div_38_ng_template_12_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const unavailableBlock_r8 = \u0275\u0275reference(13);
    \u0275\u0275classProp("unavailable", !item_r5.available);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("non-veg", !item_r5.veg);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.veg ? "\u{1F7E2}" : "\u{1F534}");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", item_r5.price, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r5.available)("ngIfElse", unavailableBlock_r8);
  }
}
function CustomerOrderComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_39_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.drawerOpen = true);
    });
    \u0275\u0275text(1, " \u{1F6D2} ");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.totalQty, " item", ctx_r2.totalQty !== 1 ? "s" : "", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(8, 3, ctx_r2.cartTotal, "1.0-0"), "");
  }
}
function CustomerOrderComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_40_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.drawerOpen = false);
    });
    \u0275\u0275elementEnd();
  }
}
function CustomerOrderComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275text(2, "\u{1F6D2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Your cart is empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Browse the menu and add items to get started");
    \u0275\u0275elementEnd()();
  }
}
function CustomerOrderComponent_div_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "div", 50);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 51);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 40)(7, "button", 41);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_49_Template_button_click_7_listener() {
      const entry_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeFromCart(entry_r12.item));
    });
    \u0275\u0275text(8, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 41);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_49_Template_button_click_11_listener() {
      const entry_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart(entry_r12.item));
    });
    \u0275\u0275text(12, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 52);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r12.item.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", entry_r12.item.price, " each");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(entry_r12.qty);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u20B9", \u0275\u0275pipeBind2(15, 4, entry_r12.item.price * entry_r12.qty, "1.0-0"), " ");
  }
}
function CustomerOrderComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 54)(2, "span");
    \u0275\u0275text(3, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong", 55);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 56);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_50_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.placeOrder());
    });
    \u0275\u0275text(8, "\u2705 Place Order");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(6, 1, ctx_r2.cartTotal, "1.0-0"), "");
  }
}
function CustomerOrderComponent_div_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 58)(2, "div", 59);
    \u0275\u0275text(3, "\u{1F389}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Order Placed!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Please arrive at your pickup time \u2014 your food will be hot and ready.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 60);
    \u0275\u0275text(9, " Order ID ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 61);
    \u0275\u0275listener("click", function CustomerOrderComponent_div_51_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetOrder());
    });
    \u0275\u0275text(13, "Place Another Order");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.confirmedOrderId);
  }
}
var CustomerOrderComponent = class _CustomerOrderComponent {
  state;
  toast;
  categories = [];
  menuItems = [];
  selectedCat = "";
  cart = [];
  drawerOpen = false;
  orderPlaced = false;
  confirmedOrderId = "";
  constructor(state, toast) {
    this.state = state;
    this.toast = toast;
  }
  ngOnInit() {
    this.categories = this.state.snapshot.categories.filter((c) => c.active);
    this.menuItems = this.state.snapshot.menuItems.filter((m) => m.available);
    if (this.categories.length)
      this.selectedCat = this.categories[0].id;
  }
  filteredItems() {
    return this.menuItems.filter((m) => m.categoryId === this.selectedCat);
  }
  cartQty(item) {
    return this.cart.find((e) => e.item.id === item.id)?.qty ?? 0;
  }
  addToCart(item) {
    const entry = this.cart.find((e) => e.item.id === item.id);
    if (entry)
      entry.qty++;
    else
      this.cart.push({ item, qty: 1 });
  }
  removeFromCart(item) {
    const idx = this.cart.findIndex((e) => e.item.id === item.id);
    if (idx === -1)
      return;
    if (this.cart[idx].qty > 1)
      this.cart[idx].qty--;
    else
      this.cart.splice(idx, 1);
  }
  get totalQty() {
    return this.cart.reduce((s, e) => s + e.qty, 0);
  }
  get cartTotal() {
    return this.cart.reduce((s, e) => s + e.item.price * e.qty, 0);
  }
  placeOrder() {
    if (this.cart.length === 0)
      return;
    this.confirmedOrderId = "ONLINE-" + Date.now().toString(36).toUpperCase();
    this.orderPlaced = true;
    this.drawerOpen = false;
    this.toast.show("Order placed successfully!");
  }
  resetOrder() {
    this.cart = [];
    this.orderPlaced = false;
    this.confirmedOrderId = "";
  }
  static \u0275fac = function CustomerOrderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerOrderComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerOrderComponent, selectors: [["app-customer-order"]], decls: 52, vars: 11, consts: [["unavailableBlock", ""], ["qtyCtrl", ""], [1, "co-wrapper"], [1, "co-header"], [1, "co-brand"], [1, "co-brand-logo"], [1, "co-brand-name"], [1, "co-brand-tag"], [1, "co-header-badge"], [1, "co-cart-btn", 3, "click"], [1, "co-cart-count"], ["routerLink", "/login", 1, "btn", "btn-secondary", "btn-sm", 2, "margin-left", "8px"], [1, "co-hero"], [1, "co-hero-pills"], [1, "co-hero-pill"], [1, "co-body"], [1, "co-cat-bar"], ["class", "co-cat-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "co-menu-grid"], ["class", "co-menu-card", 3, "unavailable", 4, "ngFor", "ngForOf"], ["class", "co-bubble", 3, "click", 4, "ngIf"], ["class", "co-drawer-backdrop", 3, "click", 4, "ngIf"], [1, "co-drawer"], [1, "co-drawer-head"], [1, "co-drawer-close", 3, "click"], [1, "co-drawer-body"], ["class", "co-empty", 4, "ngIf"], ["class", "co-cart-row", 4, "ngFor", "ngForOf"], ["class", "co-drawer-foot", 4, "ngIf"], ["class", "co-confirm-screen", 4, "ngIf"], [1, "co-cat-btn", 3, "click"], [1, "co-menu-card"], [1, "co-menu-card-body"], [1, "co-veg-dot"], [2, "font-weight", "700", "font-size", "14px", "margin-bottom", "4px"], [2, "font-size", "11px", "color", "var(--text-muted)", "margin-bottom", "10px", "line-height", "1.5"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between"], [2, "font-size", "16px", "font-weight", "700", "color", "var(--accent-gold)"], [4, "ngIf", "ngIfElse"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "co-qty-ctrl"], [3, "click"], [2, "font-size", "11px", "color", "var(--text-muted)"], [1, "co-bubble", 3, "click"], [2, "opacity", ".5"], [1, "co-drawer-backdrop", 3, "click"], [1, "co-empty"], [1, "co-empty-icon"], [1, "co-cart-row"], [2, "flex", "1"], [2, "font-weight", "600", "font-size", "13px"], [2, "font-size", "12px", "color", "var(--text-muted)"], [2, "width", "70px", "text-align", "right", "font-weight", "700", "color", "var(--accent-gold)"], [1, "co-drawer-foot"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "12px", "font-size", "14px"], [2, "color", "var(--accent-gold)"], [1, "co-proceed-btn", 3, "click"], [1, "co-confirm-screen"], [1, "co-confirm-card"], [1, "co-confirm-icon"], [1, "co-confirm-id"], [1, "btn", "btn-primary", "btn-full", 3, "click"]], template: function CustomerOrderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "header", 3)(2, "div", 4)(3, "span", 5);
      \u0275\u0275text(4, "\u{1F33F}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "div", 6);
      \u0275\u0275text(7, "Spice Garden");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7);
      \u0275\u0275text(9, "Koramangala, Bengaluru");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275text(11, "\u{1F6CD}\uFE0F Pickup Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 9);
      \u0275\u0275listener("click", function CustomerOrderComponent_Template_button_click_12_listener() {
        return ctx.drawerOpen = true;
      });
      \u0275\u0275text(13, " \u{1F6D2} Cart ");
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "a", 11);
      \u0275\u0275text(17, "Staff Login");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "section", 12)(19, "h1");
      \u0275\u0275text(20, "Order Fresh,");
      \u0275\u0275element(21, "br");
      \u0275\u0275text(22, "Pick Up ");
      \u0275\u0275elementStart(23, "em");
      \u0275\u0275text(24, "Hot & Ready");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "p");
      \u0275\u0275text(26, "Browse our menu, add to cart, and swing by to collect.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 13)(28, "span", 14);
      \u0275\u0275text(29, "\u{1F559} Open until 10:00 PM");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 14);
      \u0275\u0275text(31, "\u{1F4CD} 42, MG Road, Koramangala");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span", 14);
      \u0275\u0275text(33, "\u{1F4DE} +91 80 4123 5678");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 15)(35, "div", 16);
      \u0275\u0275template(36, CustomerOrderComponent_button_36_Template, 2, 4, "button", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 18);
      \u0275\u0275template(38, CustomerOrderComponent_div_38_Template, 14, 10, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(39, CustomerOrderComponent_div_39_Template, 9, 6, "div", 20)(40, CustomerOrderComponent_div_40_Template, 1, 0, "div", 21);
      \u0275\u0275elementStart(41, "div", 22)(42, "div", 23)(43, "h2");
      \u0275\u0275text(44, "\u{1F6D2} Your Cart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 24);
      \u0275\u0275listener("click", function CustomerOrderComponent_Template_button_click_45_listener() {
        return ctx.drawerOpen = false;
      });
      \u0275\u0275text(46, "\u2715");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 25);
      \u0275\u0275template(48, CustomerOrderComponent_div_48_Template, 7, 0, "div", 26)(49, CustomerOrderComponent_div_49_Template, 16, 7, "div", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275template(50, CustomerOrderComponent_div_50_Template, 9, 4, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275template(51, CustomerOrderComponent_div_51_Template, 14, 1, "div", 29);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.totalQty);
      \u0275\u0275advance(21);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredItems());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.totalQty > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.drawerOpen);
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.drawerOpen);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.cart.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.cart);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.cart.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.orderPlaced);
    }
  }, dependencies: [RouterLink, NgForOf, NgIf, FormsModule, DecimalPipe], styles: ["\n\n.co-wrapper[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--bg-primary);\n}\n.co-qty-ctrl[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.co-qty-ctrl[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--bg-input);\n  border: 1px solid var(--border);\n  color: var(--text-primary);\n  font-size: 16px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.co-qty-ctrl[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 700;\n  min-width: 20px;\n  text-align: center;\n}\n.co-menu-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n  padding: 20px;\n}\n.co-menu-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n.co-menu-card.unavailable[_ngcontent-%COMP%] {\n  opacity: .5;\n}\n.co-menu-card-body[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.co-cart-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n}\n.co-drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .5);\n  z-index: 99;\n}\n.co-confirm-screen[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--bg-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 200;\n}\n.co-confirm-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  padding: 40px;\n  max-width: 440px;\n  text-align: center;\n}\n.co-confirm-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.co-confirm-id[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  padding: 16px;\n  background: var(--bg-input);\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.co-confirm-id[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 18px;\n  color: var(--accent-gold);\n  margin-top: 4px;\n}\n/*# sourceMappingURL=customer-order.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerOrderComponent, [{
    type: Component,
    args: [{ selector: "app-customer-order", standalone: true, imports: [RouterLink, NgForOf, NgIf, FormsModule, DecimalPipe], template: `    <div class="co-wrapper">\r
      <header class="co-header">\r
        <div class="co-brand">\r
          <span class="co-brand-logo">\u{1F33F}</span>\r
          <div>\r
            <div class="co-brand-name">Spice Garden</div>\r
            <div class="co-brand-tag">Koramangala, Bengaluru</div>\r
          </div>\r
        </div>\r
        <div class="co-header-badge">\u{1F6CD}\uFE0F Pickup Orders</div>\r
        <button class="co-cart-btn" (click)="drawerOpen = true">\r
          \u{1F6D2} Cart <span class="co-cart-count">{{ totalQty }}</span>\r
        </button>\r
        <a routerLink="/login" class="btn btn-secondary btn-sm" style="margin-left:8px">Staff Login</a>\r
      </header>\r
\r
      <section class="co-hero">\r
        <h1>Order Fresh,<br>Pick Up <em>Hot &amp; Ready</em></h1>\r
        <p>Browse our menu, add to cart, and swing by to collect.</p>\r
        <div class="co-hero-pills">\r
          <span class="co-hero-pill">\u{1F559} Open until 10:00 PM</span>\r
          <span class="co-hero-pill">\u{1F4CD} 42, MG Road, Koramangala</span>\r
          <span class="co-hero-pill">\u{1F4DE} +91 80 4123 5678</span>\r
        </div>\r
      </section>\r
\r
      <div class="co-body">\r
        <div class="co-cat-bar">\r
          <button *ngFor="let c of categories" class="co-cat-btn"\r
            [class.active]="selectedCat === c.id"\r
            (click)="selectedCat = c.id">{{ c.icon }} {{ c.name }}</button>\r
        </div>\r
\r
        <div class="co-menu-grid">\r
          <div *ngFor="let item of filteredItems()" class="co-menu-card" [class.unavailable]="!item.available">\r
            <div class="co-menu-card-body">\r
              <span class="co-veg-dot" [class.non-veg]="!item.veg">{{ item.veg ? '\u{1F7E2}' : '\u{1F534}' }}</span>\r
              <div style="font-weight:700;font-size:14px;margin-bottom:4px">{{ item.name }}</div>\r
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px;line-height:1.5">{{ item.description }}</div>\r
              <div style="display:flex;align-items:center;justify-content:space-between">\r
                <span style="font-size:16px;font-weight:700;color:var(--accent-gold)">\u20B9{{ item.price }}</span>\r
                <div *ngIf="item.available; else unavailableBlock">\r
                  <div *ngIf="cartQty(item) === 0; else qtyCtrl">\r
                    <button class="btn btn-primary btn-sm" (click)="addToCart(item)">+ Add</button>\r
                  </div>\r
                  <ng-template #qtyCtrl>\r
                    <div class="co-qty-ctrl">\r
                      <button (click)="removeFromCart(item)">\u2212</button>\r
                      <span>{{ cartQty(item) }}</span>\r
                      <button (click)="addToCart(item)">+</button>\r
                    </div>\r
                  </ng-template>\r
                </div>\r
                <ng-template #unavailableBlock>\r
                  <span style="font-size:11px;color:var(--text-muted)">Not Available</span>\r
                </ng-template>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Floating bubble -->\r
      <div class="co-bubble" *ngIf="totalQty > 0" (click)="drawerOpen = true">\r
        \u{1F6D2} <span>{{ totalQty }} item{{ totalQty !== 1 ? 's' : '' }}</span>\r
        <span style="opacity:.5">|</span>\r
        <span>\u20B9{{ cartTotal | number:'1.0-0' }}</span>\r
      </div>\r
\r
      <!-- Cart Drawer -->\r
      <div class="co-drawer-backdrop" *ngIf="drawerOpen" (click)="drawerOpen = false"></div>\r
      <div class="co-drawer" [class.open]="drawerOpen">\r
        <div class="co-drawer-head">\r
          <h2>\u{1F6D2} Your Cart</h2>\r
          <button class="co-drawer-close" (click)="drawerOpen = false">\u2715</button>\r
        </div>\r
        <div class="co-drawer-body">\r
          <div *ngIf="cart.length === 0" class="co-empty">\r
            <div class="co-empty-icon">\u{1F6D2}</div>\r
            <h3>Your cart is empty</h3>\r
            <p>Browse the menu and add items to get started</p>\r
          </div>\r
          <div *ngFor="let entry of cart" class="co-cart-row">\r
            <div style="flex:1">\r
              <div style="font-weight:600;font-size:13px">{{ entry.item.name }}</div>\r
              <div style="font-size:12px;color:var(--text-muted)">\u20B9{{ entry.item.price }} each</div>\r
            </div>\r
            <div class="co-qty-ctrl">\r
              <button (click)="removeFromCart(entry.item)">\u2212</button>\r
              <span>{{ entry.qty }}</span>\r
              <button (click)="addToCart(entry.item)">+</button>\r
            </div>\r
            <div style="width:70px;text-align:right;font-weight:700;color:var(--accent-gold)">\r
              \u20B9{{ entry.item.price * entry.qty | number:'1.0-0' }}\r
            </div>\r
          </div>\r
        </div>\r
        <div class="co-drawer-foot" *ngIf="cart.length > 0">\r
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px">\r
            <span>Total</span>\r
            <strong style="color:var(--accent-gold)">\u20B9{{ cartTotal | number:'1.0-0' }}</strong>\r
          </div>\r
          <button class="co-proceed-btn" (click)="placeOrder()">\u2705 Place Order</button>\r
        </div>\r
      </div>\r
\r
      <!-- Confirmation -->\r
      <div class="co-confirm-screen" *ngIf="orderPlaced">\r
        <div class="co-confirm-card">\r
          <div class="co-confirm-icon">\u{1F389}</div>\r
          <h2>Order Placed!</h2>\r
          <p>Please arrive at your pickup time \u2014 your food will be hot and ready.</p>\r
          <div class="co-confirm-id">\r
            Order ID <strong>{{ confirmedOrderId }}</strong>\r
          </div>\r
          <button class="btn btn-primary btn-full" (click)="resetOrder()">Place Another Order</button>\r
        </div>\r
      </div>\r
    </div>\r
  \r
`, styles: ["/* src/app/features/customer-order/customer-order.component.css */\n.co-wrapper {\n  min-height: 100vh;\n  background: var(--bg-primary);\n}\n.co-qty-ctrl {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.co-qty-ctrl button {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--bg-input);\n  border: 1px solid var(--border);\n  color: var(--text-primary);\n  font-size: 16px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.co-qty-ctrl span {\n  font-weight: 700;\n  min-width: 20px;\n  text-align: center;\n}\n.co-menu-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n  padding: 20px;\n}\n.co-menu-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n.co-menu-card.unavailable {\n  opacity: .5;\n}\n.co-menu-card-body {\n  padding: 16px;\n}\n.co-cart-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n}\n.co-drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .5);\n  z-index: 99;\n}\n.co-confirm-screen {\n  position: fixed;\n  inset: 0;\n  background: var(--bg-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 200;\n}\n.co-confirm-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-xl);\n  padding: 40px;\n  max-width: 440px;\n  text-align: center;\n}\n.co-confirm-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\n.co-confirm-id {\n  margin: 20px 0;\n  padding: 16px;\n  background: var(--bg-input);\n  border-radius: var(--radius-md);\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.co-confirm-id strong {\n  display: block;\n  font-size: 18px;\n  color: var(--accent-gold);\n  margin-top: 4px;\n}\n/*# sourceMappingURL=customer-order.component.css.map */\n"] }]
  }], () => [{ type: StateService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerOrderComponent, { className: "CustomerOrderComponent", filePath: "src/app/features/customer-order/customer-order.component.ts", lineNumber: 21 });
})();
export {
  CustomerOrderComponent
};
//# sourceMappingURL=chunk-KPFJYZBZ.js.map
