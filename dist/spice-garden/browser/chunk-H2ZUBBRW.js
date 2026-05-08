import {
  CustomerService
} from "./chunk-KMUJACNJ.js";
import {
  MenuService
} from "./chunk-ODJ44HVP.js";
import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import "./chunk-YRUH6UFD.js";
import {
  AuthService
} from "./chunk-5N2V3KFI.js";
import "./chunk-DMA3YDAG.js";
import {
  ApiLoaderComponent
} from "./chunk-SWBXCHKP.js";
import {
  require_sweetalert2_all
} from "./chunk-KDHDQBKH.js";
import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
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
  Subject,
  UpperCasePipe,
  __spreadProps,
  __spreadValues,
  __toESM,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
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
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/orders/orders.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/core/services/order.service.ts
var OrderService = class _OrderService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  getAllTables() {
    return this.genricService.Get("tables/search");
  }
  createOrder(payload) {
    return this.genricService.Post("orders", payload);
  }
  updateOrder(orderId, payload) {
    return this.genricService.Put(`orders/${orderId}`, payload);
  }
  cancelOrder(orderId) {
    return this.genricService.DeleteRequest(`orders/${orderId}`);
  }
  getOrders(params) {
    const q = new URLSearchParams();
    q.set("page", String(Math.max(1, params.page)));
    q.set("limit", String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set("search", search);
    }
    return this.genricService.Get(`orders?${q.toString()}`);
  }
  generateBill(payload) {
    return this.genricService.Post("bills/generate", payload);
  }
  static \u0275fac = function OrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

// src/app/features/orders/orders.component.ts
function OrdersComponent_div_14_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", t_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.tableOptionLabel(t_r3));
  }
}
function OrdersComponent_div_14_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275property("value", c_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.name);
  }
}
function OrdersComponent_div_14_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "p", 52);
    \u0275\u0275text(2, "No items match your search.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function OrdersComponent_div_14_section_33_li_5_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const sub_r6 = ctx.ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sub_r6);
  }
}
function OrdersComponent_div_14_section_33_li_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 57)(1, "div", 58);
    \u0275\u0275element(2, "span", 59);
    \u0275\u0275elementStart(3, "div", 60)(4, "div", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, OrdersComponent_div_14_section_33_li_5_ng_container_6_Template, 3, 1, "ng-container", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 62)(8, "div", 63);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 64);
    \u0275\u0275listener("click", function OrdersComponent_div_14_section_33_li_5_Template_button_click_11_listener() {
      const item_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addItemToCart(item_r7));
    });
    \u0275\u0275text(12, "Add");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("new-order-veg", item_r7.veg)("new-order-nonveg", !item_r7.veg);
    \u0275\u0275attribute("title", item_r7.veg ? "Vegetarian" : "Non-vegetarian");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.itemSubtitle(item_r7));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(10, 8, item_r7.price, "1.2-2"), "");
  }
}
function OrdersComponent_div_14_section_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53)(1, "h4", 54);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 55);
    \u0275\u0275template(5, OrdersComponent_div_14_section_33_li_5_Template, 13, 11, "li", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, group_r8.category.name), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", group_r8.items);
  }
}
function OrdersComponent_div_14_p_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275text(1, "Add items from the menu.");
    \u0275\u0275elementEnd();
  }
}
function OrdersComponent_div_14_ul_44_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 69)(1, "div", 70)(2, "div", 71);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 72)(5, "button", 73);
    \u0275\u0275listener("click", function OrdersComponent_div_14_ul_44_li_1_Template_button_click_5_listener() {
      const line_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.adjustCartQty(line_r10, -1));
    });
    \u0275\u0275text(6, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 74);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 75);
    \u0275\u0275listener("click", function OrdersComponent_div_14_ul_44_li_1_Template_button_click_9_listener() {
      const line_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.adjustCartQty(line_r10, 1));
    });
    \u0275\u0275text(10, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 76);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(line_r10.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(line_r10.qty);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(13, 3, line_r10.price * line_r10.qty, "1.2-2"), "");
  }
}
function OrdersComponent_div_14_ul_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 67);
    \u0275\u0275template(1, OrdersComponent_div_14_ul_44_li_1_Template, 14, 6, "li", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.cart);
  }
}
function OrdersComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275listener("click", function OrdersComponent_div_14_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 17)(3, "h3")(4, "span", 18);
    \u0275\u0275text(5, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 19);
    \u0275\u0275listener("click", function OrdersComponent_div_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAddModal = false);
    });
    \u0275\u0275text(8, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 20)(10, "div", 21)(11, "div", 22)(12, "div", 23)(13, "div", 24)(14, "label", 25);
    \u0275\u0275text(15, "Table");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function OrdersComponent_div_14_Template_select_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newOrder.tableId, $event) || (ctx_r1.newOrder.tableId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(17, OrdersComponent_div_14_option_17_Template, 2, 2, "option", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 24)(19, "label", 28);
    \u0275\u0275text(20, "Customer (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 29);
    \u0275\u0275twoWayListener("ngModelChange", function OrdersComponent_div_14_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newOrder.customerId, $event) || (ctx_r1.newOrder.customerId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(22, OrdersComponent_div_14_option_22_Template, 2, 2, "option", 27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 24)(24, "label", 30);
    \u0275\u0275text(25, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "textarea", 31);
    \u0275\u0275twoWayListener("ngModelChange", function OrdersComponent_div_14_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.orderNotes, $event) || (ctx_r1.orderNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 32)(28, "span", 33);
    \u0275\u0275text(29, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function OrdersComponent_div_14_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.menuSearch, $event) || (ctx_r1.menuSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function OrdersComponent_div_14_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onMenuSearchChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 35);
    \u0275\u0275template(32, OrdersComponent_div_14_ng_container_32_Template, 3, 0, "ng-container", 36)(33, OrdersComponent_div_14_section_33_Template, 6, 4, "section", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "aside", 38)(35, "div", 39)(36, "h4")(37, "span", 40);
    \u0275\u0275text(38, "\u{1F6D2}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " Current Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "p", 41);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 42);
    \u0275\u0275template(43, OrdersComponent_div_14_p_43_Template, 2, 0, "p", 43)(44, OrdersComponent_div_14_ul_44_Template, 2, 1, "ul", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 45)(46, "div", 46)(47, "div", 47)(48, "span");
    \u0275\u0275text(49, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span");
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 47)(54, "span");
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 48)(61, "span");
    \u0275\u0275text(62, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span");
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "button", 49);
    \u0275\u0275listener("click", function OrdersComponent_div_14_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.placeOrder());
    });
    \u0275\u0275elementStart(67, "span", 40);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275element(70, "app-api-loader", 50);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditingOrder ? "Edit " + ctx_r1.editingOrderNumber : "New Order", "");
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newOrder.tableId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.tables);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newOrder.customerId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.customers);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.orderNotes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.menuSearch);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.menuGroupedByCategory().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.menuGroupedByCategory());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("Captain: ", ctx_r1.captainName(ctx_r1.newOrder.captainId), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.cart.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.cart.length > 0);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(52, 21, ctx_r1.cartSubtotal(), "1.2-2"), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("GST (", \u0275\u0275pipeBind2(56, 24, ctx_r1.gstRate * 100, "1.0-0"), "%)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(59, 27, ctx_r1.cartGstAmount(), "1.2-2"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(65, 30, ctx_r1.cartGrandTotal(), "1.2-2"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.cart.length === 0 || !ctx_r1.newOrder.tableId || ctx_r1.isUpdatingOrder || ctx_r1.isCreatingOrder);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditingOrder ? "\u270F\uFE0F" : "\u{1F5A8}\uFE0F");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditingOrder ? ctx_r1.isUpdatingOrder ? "Updating..." : "Update Order" : ctx_r1.isCreatingOrder ? "Placing..." : "Place Order & Print KOT", " ");
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx_r1.isCreatingOrder || ctx_r1.isUpdatingOrder)("message", ctx_r1.isEditingOrder ? "Updating order..." : "Placing order...");
  }
}
function OrdersComponent_tr_30_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79)(1, "button", 80);
    \u0275\u0275listener("click", function OrdersComponent_tr_30_div_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const o_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditOrderModal(o_r12));
    });
    \u0275\u0275text(2, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 81);
    \u0275\u0275listener("click", function OrdersComponent_tr_30_div_12_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r11);
      const o_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelOrder(o_r12));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 82);
    \u0275\u0275listener("click", function OrdersComponent_tr_30_div_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const o_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateBill(o_r12));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.cancellingOrderId === ctx_r1.orderApiIdByOrderNumber[o_r12.id]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cancellingOrderId === ctx_r1.orderApiIdByOrderNumber[o_r12.id] ? "Cancelling..." : "Cancel", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.generatingBillOrderId === ctx_r1.orderApiIdByOrderNumber[o_r12.id]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.generatingBillOrderId === ctx_r1.orderApiIdByOrderNumber[o_r12.id] ? "Generating..." : "Generate Bill", " ");
  }
}
function OrdersComponent_tr_30_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1, "Completed");
    \u0275\u0275elementEnd();
  }
}
function OrdersComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 77);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275template(12, OrdersComponent_tr_30_div_12_Template, 7, 4, "div", 78)(13, OrdersComponent_tr_30_ng_template_13_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r12 = ctx.$implicit;
    const completedOrderStatus_r13 = \u0275\u0275reference(14);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r12.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r12.tableId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", o_r12.items.length, " items");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", \u0275\u0275pipeBind2(10, 6, ctx_r1.orderTotal(o_r12), "1.0-0"), "");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", o_r12.status !== "Completed")("ngIfElse", completedOrderStatus_r13);
  }
}
function OrdersComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275text(1, " No order found ");
    \u0275\u0275elementEnd();
  }
}
var OrdersComponent = class _OrdersComponent {
  state;
  auth;
  toast;
  orderService;
  customerService;
  menuService;
  orders = [];
  orderApiIdByOrderNumber = {};
  orderMetaByOrderNumber = {};
  isLoadingOrders = false;
  isCreatingOrder = false;
  isUpdatingOrder = false;
  cancellingOrderId = null;
  generatingBillOrderId = null;
  orderSearchInput = "";
  appliedOrderSearch = "";
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  showAddModal = false;
  isEditingOrder = false;
  editingOrderId = 0;
  editingOrderNumber = "";
  tables = [];
  captains = [];
  customers = [];
  menuItems = [];
  menuCategoryNameById = {};
  categories = [];
  menuSearch$ = new Subject();
  menuSearch = "";
  cart = [];
  orderNotes = "";
  /** GST rate shown in the new-order summary (matches dine-in POS preview). */
  gstRate = 0.05;
  newOrder = {
    tableId: "",
    captainId: "",
    customerId: ""
  };
  constructor(state, auth, toast, orderService, customerService, menuService) {
    this.state = state;
    this.auth = auth;
    this.toast = toast;
    this.orderService = orderService;
    this.customerService = customerService;
    this.menuService = menuService;
  }
  ngOnInit() {
    this.tables = [...this.state.snapshot.tables];
    this.captains = this.state.snapshot.staff.filter((s) => s.role === "Captain" || s.role === "Manager" || s.role === "Admin");
    this.customers = this.state.snapshot.customers;
    this.menuItems = this.state.snapshot.menuItems;
    this.categories = [...this.state.snapshot.categories].sort((a, b) => a.order - b.order);
    this.loadTables();
    this.loadCustomers();
    this.listenMenuSearch();
    this.loadMenuItems();
    this.loadOrders(1);
  }
  filteredOrders() {
    return this.orders;
  }
  get hasNoOrders() {
    return !this.isLoadingOrders && this.orders.length === 0;
  }
  captainName(id) {
    return this.state.snapshot.staff.find((s) => s.id === id)?.name ?? id;
  }
  orderTotal(order) {
    return order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
  /** Default captain = logged-in staff when role fits; else first captain/manager in list. */
  defaultCaptainId() {
    const u = this.auth.currentUser;
    if (u && (u.role === "Captain" || u.role === "Manager" || u.role === "Admin")) {
      const match = this.state.snapshot.staff.find((s) => s.id === u.id);
      if (match)
        return match.id;
    }
    return this.captains[0]?.id ?? "";
  }
  tableOptionLabel(t) {
    return `${t.name} \u2014 ${t.zone} (${t.capacity} seats, ${t.status})`;
  }
  categoryName(categoryId) {
    return this.menuCategoryNameById[categoryId] ?? this.categories.find((c) => c.id === categoryId)?.name ?? categoryId;
  }
  filteredMenuItems() {
    return this.menuItems.filter((m) => m.available);
  }
  menuGroupedByCategory() {
    const groups = /* @__PURE__ */ new Map();
    for (const item of this.filteredMenuItems()) {
      const key = item.categoryId;
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    }
    return Array.from(groups.entries()).map(([categoryId, items]) => ({
      category: {
        id: categoryId,
        name: this.categoryName(categoryId),
        description: "",
        icon: "",
        order: 0,
        active: true,
        gstRate: 0
      },
      items: items.sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.category.name.localeCompare(b.category.name));
  }
  /** One-line subtitle under menu item name (description, not variant chips). */
  itemSubtitle(item) {
    const d = item.description?.trim() ?? "";
    if (!d)
      return "";
    return d.length > 90 ? `${d.slice(0, 87)}\u2026` : d;
  }
  /** Adds one line per menu item; uses first configured variant for KOT/billing. */
  addItemToCart(item) {
    const variant = item.variants[0] ?? "Standard";
    const key = item.id;
    const idx = this.cart.findIndex((l) => l.key === key);
    if (idx >= 0) {
      const copy = [...this.cart];
      copy[idx] = __spreadProps(__spreadValues({}, copy[idx]), { qty: copy[idx].qty + 1 });
      this.cart = copy;
    } else {
      this.cart = [
        ...this.cart,
        {
          key,
          itemId: item.id,
          name: item.name,
          variant,
          qty: 1,
          price: item.price,
          veg: item.veg
        }
      ];
    }
  }
  adjustCartQty(line, delta) {
    const idx = this.cart.findIndex((l) => l.key === line.key);
    if (idx < 0)
      return;
    const nextQty = this.cart[idx].qty + delta;
    if (nextQty < 1) {
      this.cart = this.cart.filter((l) => l.key !== line.key);
    } else {
      const copy = [...this.cart];
      copy[idx] = __spreadProps(__spreadValues({}, copy[idx]), { qty: nextQty });
      this.cart = copy;
    }
  }
  cartSubtotal() {
    return this.cart.reduce((s, l) => s + l.price * l.qty, 0);
  }
  cartGstAmount() {
    return this.cartSubtotal() * this.gstRate;
  }
  cartGrandTotal() {
    return this.cartSubtotal() + this.cartGstAmount();
  }
  openAddModal() {
    this.menuSearch = "";
    this.cart = [];
    this.orderNotes = "";
    this.isEditingOrder = false;
    this.editingOrderId = 0;
    this.editingOrderNumber = "";
    this.loadTables();
    this.loadCustomers();
    this.loadMenuItems();
    this.newOrder = {
      tableId: this.tables[0]?.id ?? "",
      captainId: this.defaultCaptainId(),
      customerId: ""
    };
    this.showAddModal = true;
  }
  onMenuSearchChange(value) {
    this.menuSearch$.next(value);
  }
  applyOrderSearch() {
    this.appliedOrderSearch = this.orderSearchInput.trim();
    this.loadOrders(1);
  }
  clearOrderSearch() {
    if (!this.orderSearchInput && !this.appliedOrderSearch)
      return;
    this.orderSearchInput = "";
    this.appliedOrderSearch = "";
    this.loadOrders(1);
  }
  hasActiveOrderSearch() {
    return !!this.orderSearchInput || !!this.appliedOrderSearch;
  }
  prevOrderPage() {
    if (this.currentPage <= 1 || this.isLoadingOrders)
      return;
    this.loadOrders(this.currentPage - 1);
  }
  nextOrderPage() {
    if (this.currentPage >= this.totalPages || this.isLoadingOrders)
      return;
    this.loadOrders(this.currentPage + 1);
  }
  openEditOrderModal(order) {
    const orderId = this.orderApiIdByOrderNumber[order.id];
    const meta = this.orderMetaByOrderNumber[order.id];
    if (!orderId || !meta) {
      this.toast.show("Unable to identify order details", "warning");
      return;
    }
    this.menuSearch = "";
    this.loadTables();
    this.loadCustomers();
    this.loadMenuItems();
    this.isEditingOrder = true;
    this.editingOrderId = orderId;
    this.editingOrderNumber = order.id;
    this.newOrder = {
      tableId: String(meta.table_id),
      captainId: this.defaultCaptainId(),
      customerId: meta.customer_id != null ? String(meta.customer_id) : ""
    };
    this.orderNotes = meta.notes || "";
    this.cart = meta.items.map((item) => {
      const menu = this.menuItems.find((m) => Number(m.id) === item.menu_item_id);
      return {
        key: String(item.menu_item_id),
        itemId: String(item.menu_item_id),
        name: menu?.name || `Item ${item.menu_item_id}`,
        variant: "Standard",
        qty: Math.max(1, Number(item.quantity) || 1),
        price: menu?.price ?? 0,
        veg: menu?.veg ?? false
      };
    });
    this.showAddModal = true;
  }
  cancelOrder(order) {
    if (this.cancellingOrderId !== null)
      return;
    const apiOrderId = this.orderApiIdByOrderNumber[order.id];
    if (!apiOrderId) {
      this.toast.show("Unable to identify order to cancel", "warning");
      return;
    }
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will cancel order "${order.id}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      this.cancellingOrderId = apiOrderId;
      this.orderService.cancelOrder(apiOrderId).subscribe({
        next: () => {
          this.toast.show(`Order ${order.id} cancelled`);
          this.cancellingOrderId = null;
          this.loadOrders(this.currentPage);
        },
        error: (err) => {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to cancel order.";
          const prefix = err.status ? `Error ${err.status}: ` : "";
          this.toast.show(`${prefix}${apiMessage}`, "error");
          this.cancellingOrderId = null;
        }
      });
    });
  }
  generateBill(order) {
    if (this.generatingBillOrderId !== null)
      return;
    const apiOrderId = this.orderApiIdByOrderNumber[order.id];
    if (!apiOrderId) {
      this.toast.show("Unable to identify order for bill generation", "warning");
      return;
    }
    this.generatingBillOrderId = apiOrderId;
    this.orderService.generateBill({ order_id: apiOrderId }).subscribe({
      next: (response) => {
        this.generatingBillOrderId = null;
        const statusCode = response?.statusCode;
        if (statusCode !== void 0 && statusCode !== 200 && statusCode !== 201) {
          this.toast.show(response?.message || "Failed to generate bill", "warning");
          return;
        }
        this.toast.show(response?.message || `Bill generated for ${order.id}`);
      },
      error: (err) => {
        this.generatingBillOrderId = null;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to generate bill.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  placeOrder() {
    if (this.isEditingOrder) {
      this.updateOrderFromModal();
      return;
    }
    if (!this.newOrder.tableId || !this.newOrder.captainId || this.cart.length === 0) {
      this.toast.show("Choose a table and add at least one item", "warning");
      return;
    }
    const orderItemsPayload = this.cart.map((line) => {
      const menuItemId = Number(line.itemId);
      if (!Number.isInteger(menuItemId) || menuItemId <= 0) {
        return null;
      }
      return {
        menu_item_id: menuItemId,
        quantity: Math.max(1, Number(line.qty) || 1),
        special_instructions: ""
      };
    }).filter((item) => item !== null);
    if (orderItemsPayload.length === 0) {
      this.toast.show("Please add valid menu items before placing order", "warning");
      return;
    }
    const tableIdForApi = Number(this.newOrder.tableId);
    if (!Number.isInteger(tableIdForApi) || tableIdForApi <= 0) {
      this.toast.show("Invalid table selected", "warning");
      return;
    }
    const customerIdForApi = this.newOrder.customerId ? Number(this.newOrder.customerId) : 0;
    const payload = {
      table_id: tableIdForApi,
      customer_id: Number.isInteger(customerIdForApi) && customerIdForApi > 0 ? customerIdForApi : 0,
      notes: this.orderNotes || "",
      is_urgent: false,
      totalAmount: this.cartGrandTotal(),
      items: orderItemsPayload
    };
    this.isCreatingOrder = true;
    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.isCreatingOrder = false;
        this.handleCreateOrderSuccess();
      },
      error: (err) => {
        this.isCreatingOrder = false;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to place order.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  handleCreateOrderSuccess() {
    this.toast.show("Order placed successfully");
    this.showAddModal = false;
    this.loadOrders(1);
  }
  updateOrderFromModal() {
    if (this.isUpdatingOrder)
      return;
    const tableId = Number(this.newOrder.tableId);
    if (!Number.isInteger(tableId) || tableId <= 0) {
      this.toast.show("Please select a valid table", "warning");
      return;
    }
    const items = this.cart.map((line) => ({
      menu_item_id: Number(line.itemId),
      quantity: Math.max(1, Number(line.qty) || 1),
      special_instructions: ""
    })).filter((item) => Number.isInteger(item.menu_item_id) && item.menu_item_id > 0);
    if (items.length === 0) {
      this.toast.show("Add at least one valid item in order", "warning");
      return;
    }
    const customerId = this.newOrder.customerId ? Number(this.newOrder.customerId) : 0;
    this.isUpdatingOrder = true;
    this.orderService.updateOrder(this.editingOrderId, {
      table_id: tableId,
      customer_id: Number.isInteger(customerId) && customerId > 0 ? customerId : 0,
      notes: this.orderNotes || "",
      items
    }).subscribe({
      next: () => {
        this.toast.show("Order updated successfully");
        this.showAddModal = false;
        this.isUpdatingOrder = false;
        this.loadOrders(this.currentPage);
      },
      error: (err) => {
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to update order.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
        this.isUpdatingOrder = false;
      }
    });
  }
  loadTables() {
    this.orderService.getAllTables().pipe(map((response) => response.data ?? []), map((items) => items.map((item) => this.toUiTable(item))), catchError(() => {
      this.toast.show("Unable to load tables from server. Showing local list.", "warning");
      return of([...this.state.snapshot.tables]);
    })).subscribe((tables) => {
      this.tables = tables;
      if (!tables.some((t) => t.id === this.newOrder.tableId)) {
        this.newOrder.tableId = tables[0]?.id ?? "";
      }
    });
  }
  toUiTable(item) {
    return {
      id: String(item.id),
      name: `Table ${item.table_number}`,
      capacity: item.seating_capacity,
      zone: item.zone?.name ?? "General",
      shape: "rectangle",
      status: this.normalizeTableStatus(item.status),
      notes: "",
      mergedWith: null
    };
  }
  normalizeTableStatus(status) {
    const value = status.trim().toLowerCase();
    if (value === "available")
      return "Available";
    if (value === "occupied")
      return "Occupied";
    if (value === "reserved")
      return "Reserved";
    if (value === "cleaning")
      return "Cleaning";
    return "Available";
  }
  loadCustomers() {
    this.customerService.getAllCustomers().pipe(map((response) => response.data ?? []), map((items) => items.map((item) => this.toUiCustomer(item))), catchError(() => {
      this.toast.show("Unable to load customers from server. Showing local list.", "warning");
      return of([...this.state.snapshot.customers]);
    })).subscribe((customers) => {
      this.customers = customers;
      if (this.newOrder.customerId && !customers.some((c) => c.id === this.newOrder.customerId)) {
        this.newOrder.customerId = "";
      }
    });
  }
  toUiCustomer(item) {
    return {
      id: String(item.id),
      name: item.name,
      phone: item.phone ?? "",
      email: item.email ?? "",
      address: item.address ?? "",
      dob: item.date_of_birth ?? "",
      notes: item.notes ?? "",
      type: this.normalizeCustomerType(item.customer_type),
      regDate: item.registered_at ?? "",
      active: item.is_active ?? true
    };
  }
  normalizeCustomerType(type) {
    const value = type.trim().toLowerCase();
    if (value === "vip")
      return "VIP";
    if (value === "regular")
      return "Regular";
    return "New";
  }
  listenMenuSearch() {
    this.menuSearch$.pipe(debounceTime(300), distinctUntilChanged(), switchMap((search) => this.menuService.getAllWithSearch(search).pipe(catchError(() => {
      this.toast.show("Unable to load menu items from server.", "warning");
      return of({
        success: false,
        statusCode: 500,
        message: "Menu API request failed",
        data: []
      });
    })))).subscribe((response) => this.handleMenuResponse(response));
  }
  loadMenuItems() {
    this.menuService.getAllWithSearch(this.menuSearch).pipe(catchError(() => {
      this.toast.show("Unable to load menu items from server. Showing local list.", "warning");
      return of(null);
    })).subscribe((response) => {
      if (!response) {
        this.menuItems = [...this.state.snapshot.menuItems];
        return;
      }
      this.handleMenuResponse(response);
    });
  }
  handleMenuResponse(response) {
    if (!response.success || response.statusCode !== 200) {
      this.toast.show(response.message || "Could not load menu items.", "warning");
      this.menuItems = [];
      this.menuCategoryNameById = {};
      return;
    }
    const mapped = response.data.map((item) => this.toUiMenuItem(item));
    this.menuItems = mapped.filter((item) => item.available);
    const categoryById = {};
    for (const item of response.data) {
      categoryById[String(item.category_id)] = item.category_name?.trim() || `Category ${item.category_id}`;
    }
    this.menuCategoryNameById = categoryById;
  }
  loadOrders(page) {
    this.isLoadingOrders = true;
    this.orderService.getOrders({
      page,
      limit: this.pageSize,
      search: this.appliedOrderSearch || void 0
    }).subscribe({
      next: (response) => {
        this.isLoadingOrders = false;
        if (!response?.success || response?.statusCode !== 200) {
          this.toast.show(response?.message || "Could not load orders.", "warning");
          this.orders = [];
          this.totalRecords = 0;
          this.totalPages = 1;
          return;
        }
        const rows = Array.isArray(response.data) ? response.data : [];
        this.orderApiIdByOrderNumber = {};
        this.orderMetaByOrderNumber = {};
        for (const row of rows) {
          this.orderApiIdByOrderNumber[row.order_number] = row.id;
          this.orderMetaByOrderNumber[row.order_number] = {
            table_id: row.table_id,
            customer_id: row.customer_id,
            notes: row.notes ?? "",
            items: (row.item_details ?? []).map((detail) => ({
              menu_item_id: detail.menu_item_id,
              quantity: detail.quantity,
              special_instructions: ""
            }))
          };
        }
        this.orders = rows.map((row) => this.toUiOrder(row));
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalRecords = response.meta?.total ?? this.orders.length;
        this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
      },
      error: (err) => {
        this.isLoadingOrders = false;
        this.orders = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load orders.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  toUiOrder(item) {
    return {
      id: item.order_number || `ORD-${item.id}`,
      tableId: item.table_name || `Table ${item.table_id}`,
      captainId: String(item.captain_id ?? ""),
      customerId: item.customer_id != null ? String(item.customer_id) : null,
      status: this.normalizeOrderStatus(item.status),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      items: (item.item_details ?? []).map((detail) => this.toUiOrderItem(detail.menu_item_id, detail.menu_item_name, detail.quantity, detail.unit_price))
    };
  }
  toUiOrderItem(menuItemId, name, quantity, unitPrice) {
    return {
      itemId: String(menuItemId),
      name: name || `Item ${menuItemId}`,
      variant: "Standard",
      qty: quantity || 0,
      price: unitPrice || 0,
      instructions: "",
      status: "Pending"
    };
  }
  normalizeOrderStatus(status) {
    const value = status?.trim().toLowerCase();
    if (value === "pending")
      return "Pending";
    if (value === "preparing")
      return "Preparing";
    if (value === "served")
      return "Served";
    if (value === "cancelled")
      return "Cancelled";
    return "Completed";
  }
  toUiMenuItem(item) {
    const spice = item.spice_level;
    return {
      id: String(item.id),
      name: item.name,
      sku: item.sku ?? "",
      categoryId: String(item.category_id),
      description: item.description ?? "",
      price: item.base_price,
      prepTime: item.prep_time_minutes,
      veg: item.food_type === "veg",
      spiceLevel: spice === null ? null : spice <= 1 ? "mild" : spice <= 3 ? "medium" : spice <= 4 ? "hot" : "extra-hot",
      chefSpecial: item.is_chef_special,
      isNew: false,
      available: item.is_available && !item.is_archived,
      station: "Kitchen",
      variants: ["Standard"]
    };
  }
  static \u0275fac = function OrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdersComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(MenuService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdersComponent, selectors: [["app-orders"]], decls: 42, vars: 15, consts: [["completedOrderStatus", ""], [1, "section-header"], [1, "section-header-left"], [1, "section-header-right", "orders-toolbar"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "search", "aria-label", "Search orders", "placeholder", "Search order number...", 1, "form-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], ["class", "modal-backdrop new-order-backdrop", 4, "ngIf"], [1, "card", "orders-table-card"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "card menu-item-card menu-empty-state", 4, "ngIf"], [1, "staff-pagination"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [3, "show", "fullscreen", "message"], [1, "modal-backdrop", "new-order-backdrop"], [1, "modal", "new-order-modal", 3, "click"], [1, "modal-header", "new-order-modal-header"], ["aria-hidden", "true", 1, "new-order-title-icon"], ["type", "button", "aria-label", "Close", 1, "modal-close", "new-order-close", 3, "click"], [1, "modal-body", "new-order-body"], [1, "new-order-layout"], [1, "new-order-menu-col"], [1, "new-order-filters"], [1, "form-group", "new-order-field"], ["for", "no-table", 1, "form-label"], ["id", "no-table", "aria-label", "Select table", 1, "form-select", "new-order-input", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "no-customer", 1, "form-label"], ["id", "no-customer", "aria-label", "Select customer", 1, "form-select", "new-order-input", 3, "ngModelChange", "ngModel"], ["for", "order-notes", 1, "form-label"], ["id", "order-notes", "rows", "2", 1, "form-textarea", "new-order-input", 3, "ngModelChange", "ngModel"], [1, "form-group", "new-order-search-wrap"], ["aria-hidden", "true", 1, "new-order-search-icon"], ["type", "search", "placeholder", "Search menu items...", "aria-label", "Search menu items", "autocomplete", "off", 1, "form-input", "new-order-input", "new-order-search", 3, "ngModelChange", "ngModel"], [1, "new-order-menu-scroll"], [4, "ngIf"], ["class", "new-order-category", 4, "ngFor", "ngForOf"], [1, "new-order-cart-col"], [1, "new-order-cart-head"], ["aria-hidden", "true"], [1, "new-order-captain"], [1, "new-order-cart-scroll"], ["class", "new-order-cart-empty", 4, "ngIf"], ["class", "new-order-cart-lines", 4, "ngIf"], [1, "new-order-cart-footer"], [1, "new-order-totals"], [1, "new-order-total-row"], [1, "new-order-total-row", "new-order-total-grand"], ["type", "button", 1, "new-order-place-btn", 3, "click", "disabled"], [3, "show", "message"], [3, "value"], [1, "new-order-empty-menu"], [1, "new-order-category"], [1, "new-order-category-title"], [1, "new-order-item-list"], ["class", "new-order-item-row", 4, "ngFor", "ngForOf"], [1, "new-order-item-row"], [1, "new-order-item-main"], ["aria-hidden", "true", 1, "new-order-veg-badge"], [1, "new-order-item-text"], [1, "new-order-item-name"], [1, "new-order-item-actions"], [1, "new-order-item-price"], ["type", "button", 1, "new-order-add-btn", 3, "click"], [1, "new-order-item-meta"], [1, "new-order-cart-empty"], [1, "new-order-cart-lines"], ["class", "new-order-cart-line", 4, "ngFor", "ngForOf"], [1, "new-order-cart-line"], [1, "new-order-cart-line-info"], [1, "new-order-cart-name"], [1, "new-order-qty"], ["type", "button", "aria-label", "Decrease quantity", 1, "new-order-qty-btn", 3, "click"], [1, "new-order-qty-val"], ["type", "button", "aria-label", "Increase quantity", 1, "new-order-qty-btn", 3, "click"], [1, "new-order-cart-line-total"], [1, "orders-total-cell"], ["class", "orders-action-row", 4, "ngIf", "ngIfElse"], [1, "orders-action-row"], ["title", "Edit Order", "aria-label", "Edit Order", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "btn", "btn-sm", "order-cancel-btn", 3, "click", "disabled"], [1, "btn", "btn-sm", "order-generate-bill-btn", 3, "click", "disabled"], [1, "order-completed-status"], [1, "card", "menu-item-card", "menu-empty-state"]], template: function OrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2");
      \u0275\u0275text(3, "Order Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function OrdersComponent_Template_button_click_7_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(8, "+ Add Order");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function OrdersComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.orderSearchInput, $event) || (ctx.orderSearchInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function OrdersComponent_Template_input_keydown_enter_9_listener() {
        return ctx.applyOrderSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 6);
      \u0275\u0275listener("click", function OrdersComponent_Template_button_click_10_listener() {
        return ctx.applyOrderSearch();
      });
      \u0275\u0275text(11, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 6);
      \u0275\u0275listener("click", function OrdersComponent_Template_button_click_12_listener() {
        return ctx.clearOrderSearch();
      });
      \u0275\u0275text(13, "Clear");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(14, OrdersComponent_div_14_Template, 71, 33, "div", 7);
      \u0275\u0275elementStart(15, "div", 8)(16, "table", 9)(17, "thead")(18, "tr")(19, "th");
      \u0275\u0275text(20, "Order ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th");
      \u0275\u0275text(22, "Table");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th");
      \u0275\u0275text(24, "Items");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th");
      \u0275\u0275text(26, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th");
      \u0275\u0275text(28, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "tbody");
      \u0275\u0275template(30, OrdersComponent_tr_30_Template, 15, 9, "tr", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(31, OrdersComponent_div_31_Template, 2, 0, "div", 11);
      \u0275\u0275elementStart(32, "div", 12)(33, "button", 13);
      \u0275\u0275listener("click", function OrdersComponent_Template_button_click_33_listener() {
        return ctx.prevOrderPage();
      });
      \u0275\u0275text(34, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 13);
      \u0275\u0275listener("click", function OrdersComponent_Template_button_click_39_listener() {
        return ctx.nextOrderPage();
      });
      \u0275\u0275text(40, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "app-api-loader", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Track and manage all dine-in orders (Total: ", ctx.totalRecords, ")");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.orderSearchInput);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingOrders);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.hasActiveOrderSearch() || ctx.isLoadingOrders);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance(16);
      \u0275\u0275property("ngForOf", ctx.filteredOrders());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hasNoOrders);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage <= 1 || ctx.isLoadingOrders);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.totalRecords, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoadingOrders);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.isLoadingOrders)("fullscreen", true)("message", "Loading orders...");
    }
  }, dependencies: [NgForOf, NgIf, UpperCasePipe, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, ApiLoaderComponent], styles: ['\n\n.new-order-backdrop[_ngcontent-%COMP%] {\n  z-index: 600;\n}\n.orders-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.orders-table-card[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.orders-total-cell[_ngcontent-%COMP%] {\n  color: var(--accent-gold);\n}\n.orders-action-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.new-order-modal[_ngcontent-%COMP%] {\n  max-width: min(1120px, 96vw);\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  color: var(--text-primary);\n  box-shadow: var(--shadow-lg);\n}\n.new-order-modal-header[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-bottom-color: var(--border);\n  flex-shrink: 0;\n}\n.new-order-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: var(--text-lg);\n  color: var(--text-primary);\n}\n.new-order-title-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  line-height: 1;\n}\n.new-order-close[_ngcontent-%COMP%] {\n  border-color: var(--border-light);\n  background: var(--bg-input);\n  color: var(--text-secondary);\n}\n.new-order-close[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-focus);\n  color: var(--text-primary);\n}\n.new-order-body[_ngcontent-%COMP%] {\n  padding: 0;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.new-order-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr min(340px, 38%);\n  align-items: start;\n  gap: 0;\n  max-height: calc(90vh - 72px);\n}\n.new-order-menu-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 20px 20px 16px;\n  border-right: 1px solid var(--border);\n  min-height: 0;\n  max-height: calc(90vh - 72px);\n  overflow: hidden;\n}\n.new-order-filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n}\n.new-order-field[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.new-order-input[_ngcontent-%COMP%] {\n  background: var(--bg-input);\n  border: 1px solid var(--border-light);\n  color: var(--text-primary);\n}\n.new-order-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--border-focus);\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);\n}\n.new-order-search-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n}\n.new-order-search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 14px;\n  opacity: 0.55;\n  pointer-events: none;\n}\n.new-order-search[_ngcontent-%COMP%] {\n  padding-left: 38px;\n}\n.new-order-menu-scroll[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow-y: auto;\n  min-height: 0;\n  padding-right: 4px;\n}\n.new-order-empty-menu[_ngcontent-%COMP%] {\n  padding: 32px 12px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 13px;\n}\n.new-order-category[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.new-order-category-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  color: var(--text-muted);\n  margin-bottom: 10px;\n}\n.new-order-cat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.new-order-item-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.new-order-item-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 10px;\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n}\n.new-order-item-row[_ngcontent-%COMP%]:hover {\n  border-color: rgba(220, 38, 38, 0.25);\n}\n.new-order-item-main[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  min-width: 0;\n  flex: 1;\n}\n.new-order-veg-badge[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 1px solid var(--border-light);\n  border-radius: 3px;\n  flex-shrink: 0;\n  margin-top: 3px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.new-order-veg-badge[_ngcontent-%COMP%]::after {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}\n.new-order-veg[_ngcontent-%COMP%]::after {\n  background: #22c55e;\n}\n.new-order-nonveg[_ngcontent-%COMP%]::after {\n  background: #ef4444;\n}\n.new-order-item-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n  line-height: 1.35;\n}\n.new-order-item-meta[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n  line-height: 1.35;\n}\n.new-order-item-actions[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n}\n.new-order-item-price[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--accent-gold);\n}\n.new-order-add-btn[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 8px 16px;\n  border-radius: var(--radius-md);\n  border: 1px solid rgba(220, 38, 38, 0.35);\n  background: rgba(220, 38, 38, 0.08);\n  color: var(--accent-gold);\n  transition: var(--transition);\n}\n.new-order-add-btn[_ngcontent-%COMP%]:hover {\n  background: var(--accent-gold);\n  color: #fff;\n  border-color: var(--accent-gold);\n}\n.new-order-cart-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: calc(90vh - 72px);\n  background: var(--bg-secondary);\n  padding: 20px 18px 18px;\n  border-left: 1px solid var(--border);\n  margin-left: -1px;\n}\n.new-order-cart-head[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.new-order-cart-head[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.new-order-captain[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  margin-top: 6px;\n}\n.new-order-cart-scroll[_ngcontent-%COMP%] {\n  flex: 0 1 auto;\n  overflow-y: auto;\n  min-height: 0;\n  max-height: min(42vh, 360px);\n  margin: 14px 0 0;\n}\n.new-order-cart-empty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  text-align: center;\n  padding: 24px 8px;\n}\n.new-order-cart-lines[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.new-order-cart-line[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 8px;\n  border-radius: var(--radius-md);\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n}\n.new-order-cart-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--text-primary);\n}\n.new-order-qty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.new-order-qty-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 1px solid var(--border-light);\n  background: var(--bg-card);\n  color: var(--text-secondary);\n  font-size: 16px;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: var(--transition);\n}\n.new-order-qty-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent-gold);\n  color: var(--accent-gold);\n}\n.new-order-qty-val[_ngcontent-%COMP%] {\n  min-width: 22px;\n  text-align: center;\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--text-primary);\n}\n.new-order-cart-line-total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 13px;\n  color: var(--accent-gold);\n  text-align: right;\n  min-width: 72px;\n}\n.new-order-cart-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 14px;\n  padding-top: 4px;\n}\n.new-order-totals[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border);\n  padding-top: 12px;\n  margin-bottom: 14px;\n}\n.new-order-total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.new-order-total-grand[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-top: 4px;\n  padding-top: 8px;\n  border-top: 1px dashed var(--border-light);\n}\n.new-order-total-grand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  color: var(--accent-gold);\n}\n.new-order-place-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 16px;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  background: var(--accent-gold);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: var(--transition);\n  box-shadow: var(--shadow-md);\n}\n.new-order-place-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--accent-gold-dim);\n  transform: translateY(-1px);\n}\n.new-order-place-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.order-cancel-btn[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n}\n.order-cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.order-generate-bill-btn[_ngcontent-%COMP%] {\n  border: 1px solid rgba(59, 130, 246, 0.55);\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #7c3aed);\n  color: #fff;\n}\n.order-generate-bill-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(1.08);\n  border-color: #7c3aed;\n}\n.order-completed-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 5px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(34, 197, 94, 0.35);\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: default;\n}\n@media (max-width: 900px) {\n  .new-order-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    max-height: none;\n  }\n  .new-order-menu-col[_ngcontent-%COMP%] {\n    border-right: none;\n    max-height: min(55vh, 480px);\n    border-bottom: 1px solid var(--border);\n  }\n  .new-order-cart-col[_ngcontent-%COMP%] {\n    border-left: none;\n    margin-left: 0;\n    max-height: none;\n  }\n  .new-order-cart-scroll[_ngcontent-%COMP%] {\n    max-height: min(32vh, 280px);\n  }\n}\n/*# sourceMappingURL=orders.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdersComponent, [{
    type: Component,
    args: [{ selector: "app-orders", standalone: true, imports: [NgForOf, NgIf, UpperCasePipe, DecimalPipe, FormsModule, ApiLoaderComponent], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Order Management</h2>\r
        <p>Track and manage all dine-in orders (Total: {{ totalRecords }})</p>\r
      </div>\r
      <div class="section-header-right orders-toolbar">\r
        <button class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Order</button>\r
        <input class="form-input" type="search" aria-label="Search orders" [(ngModel)]="orderSearchInput" (keydown.enter)="applyOrderSearch()" placeholder="Search order number...">\r
        <button class="btn btn-secondary btn-sm" (click)="applyOrderSearch()" [disabled]="isLoadingOrders">Search</button>\r
        <button class="btn btn-secondary btn-sm" (click)="clearOrderSearch()" [disabled]="!hasActiveOrderSearch() || isLoadingOrders">Clear</button>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showAddModal" class="modal-backdrop new-order-backdrop">\r
      <div class="modal new-order-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header new-order-modal-header">\r
          <h3><span class="new-order-title-icon" aria-hidden="true">\u{1F4CB}</span> {{ isEditingOrder ? ('Edit ' + editingOrderNumber) : 'New Order' }}</h3>\r
          <button type="button" class="modal-close new-order-close" (click)="showAddModal = false" aria-label="Close">\u2715</button>\r
        </div>\r
        <div class="modal-body new-order-body">\r
          <div class="new-order-layout">\r
            <div class="new-order-menu-col">\r
              <div class="new-order-filters">\r
                <div class="form-group new-order-field">\r
                  <label class="form-label" for="no-table">Table</label>\r
                  <select id="no-table" class="form-select new-order-input" aria-label="Select table" [(ngModel)]="newOrder.tableId">\r
                    <option *ngFor="let t of tables" [value]="t.id">{{ tableOptionLabel(t) }}</option>\r
                  </select>\r
                </div>\r
                <div class="form-group new-order-field">\r
                  <label class="form-label" for="no-customer">Customer (optional)</label>\r
                  <select id="no-customer" class="form-select new-order-input" aria-label="Select customer" [(ngModel)]="newOrder.customerId">\r
                    <!-- <option value="">Walk-in Guest</option> -->\r
                    <option *ngFor="let c of customers" [value]="c.id">{{ c.name }}</option>\r
                  </select>\r
                </div>\r
              </div>\r
              <div class="form-group new-order-field">\r
                <label class="form-label" for="order-notes">Notes</label>\r
                <textarea id="order-notes" class="form-textarea new-order-input" rows="2" [(ngModel)]="orderNotes"></textarea>\r
              </div>\r
              <div class="form-group new-order-search-wrap">\r
                <span class="new-order-search-icon" aria-hidden="true">\u{1F50D}</span>\r
                <input\r
                  class="form-input new-order-input new-order-search"\r
                  type="search"\r
                  [(ngModel)]="menuSearch"\r
                  (ngModelChange)="onMenuSearchChange($event)"\r
                  placeholder="Search menu items..."\r
                  aria-label="Search menu items"\r
                  autocomplete="off"\r
                />\r
              </div>\r
              <div class="new-order-menu-scroll">\r
                <ng-container *ngIf="menuGroupedByCategory().length === 0">\r
                  <p class="new-order-empty-menu">No items match your search.</p>\r
                </ng-container>\r
                <section *ngFor="let group of menuGroupedByCategory()" class="new-order-category">\r
                  <h4 class="new-order-category-title">\r
                    {{ group.category.name | uppercase }}\r
                  </h4>\r
                  <ul class="new-order-item-list">\r
                    <li *ngFor="let item of group.items" class="new-order-item-row">\r
                      <div class="new-order-item-main">\r
                        <span\r
                          class="new-order-veg-badge"\r
                          [class.new-order-veg]="item.veg"\r
                          [class.new-order-nonveg]="!item.veg"\r
                          [attr.title]="item.veg ? 'Vegetarian' : 'Non-vegetarian'"\r
                          aria-hidden="true"\r
                        ></span>\r
                        <div class="new-order-item-text">\r
                          <div class="new-order-item-name">{{ item.name }}</div>\r
                          <ng-container *ngIf="itemSubtitle(item) as sub">\r
                            <div class="new-order-item-meta">{{ sub }}</div>\r
                          </ng-container>\r
                        </div>\r
                      </div>\r
                      <div class="new-order-item-actions">\r
                        <div class="new-order-item-price">\u20B9{{ item.price | number:'1.2-2' }}</div>\r
                        <button type="button" class="new-order-add-btn" (click)="addItemToCart(item)">Add</button>\r
                      </div>\r
                    </li>\r
                  </ul>\r
                </section>\r
              </div>\r
            </div>\r
            <aside class="new-order-cart-col">\r
              <div class="new-order-cart-head">\r
                <h4><span aria-hidden="true">\u{1F6D2}</span> Current Order</h4>\r
                <p class="new-order-captain">Captain: {{ captainName(newOrder.captainId) }}</p>\r
              </div>\r
              <div class="new-order-cart-scroll">\r
                <p *ngIf="cart.length === 0" class="new-order-cart-empty">Add items from the menu.</p>\r
                <ul *ngIf="cart.length > 0" class="new-order-cart-lines">\r
                  <li *ngFor="let line of cart" class="new-order-cart-line">\r
                    <div class="new-order-cart-line-info">\r
                      <div class="new-order-cart-name">{{ line.name }}</div>\r
                    </div>\r
                    <div class="new-order-qty">\r
                      <button type="button" class="new-order-qty-btn" (click)="adjustCartQty(line, -1)" aria-label="Decrease quantity">\u2212</button>\r
                      <span class="new-order-qty-val">{{ line.qty }}</span>\r
                      <button type="button" class="new-order-qty-btn" (click)="adjustCartQty(line, 1)" aria-label="Increase quantity">+</button>\r
                    </div>\r
                    <div class="new-order-cart-line-total">\u20B9{{ line.price * line.qty | number:'1.2-2' }}</div>\r
                  </li>\r
                </ul>\r
              </div>\r
              <div class="new-order-cart-footer">\r
                <div class="new-order-totals">\r
                  <div class="new-order-total-row">\r
                    <span>Subtotal</span>\r
                    <span>\u20B9{{ cartSubtotal() | number:'1.2-2' }}</span>\r
                  </div>\r
                  <div class="new-order-total-row">\r
                    <span>GST ({{ gstRate * 100 | number:'1.0-0' }}%)</span>\r
                    <span>\u20B9{{ cartGstAmount() | number:'1.2-2' }}</span>\r
                  </div>\r
                  <div class="new-order-total-row new-order-total-grand">\r
                    <span>Total</span>\r
                    <span>\u20B9{{ cartGrandTotal() | number:'1.2-2' }}</span>\r
                  </div>\r
                </div>\r
                <button type="button" class="new-order-place-btn" (click)="placeOrder()" [disabled]="cart.length === 0 || !newOrder.tableId || isUpdatingOrder || isCreatingOrder">\r
                  <span aria-hidden="true">{{ isEditingOrder ? '\u270F\uFE0F' : '\u{1F5A8}\uFE0F' }}</span>\r
                  {{ isEditingOrder ? (isUpdatingOrder ? 'Updating...' : 'Update Order') : (isCreatingOrder ? 'Placing...' : 'Place Order & Print KOT') }}\r
                </button>\r
                <app-api-loader [show]="isCreatingOrder || isUpdatingOrder" [message]="isEditingOrder ? 'Updating order...' : 'Placing order...'"></app-api-loader>\r
              </div>\r
            </aside>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="card orders-table-card">\r
      <table class="data-table">\r
        <thead>\r
          <tr>\r
            <th>Order ID</th><th>Table</th>\r
            <!-- <th>Captain</th> -->\r
            <th>Items</th>\r
            <th>Total</th>\r
            <!-- <th>Status</th> -->\r
            <!-- <th>Time</th> -->\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr *ngFor="let o of filteredOrders()">\r
            <td><strong>{{ o.id }}</strong></td>\r
            <td>{{ o.tableId }}</td>\r
            <!-- <td>{{ captainName(o.captainId) }}</td> -->\r
            <td>{{ o.items.length }} items</td>\r
            <td class="orders-total-cell">\u20B9{{ orderTotal(o) | number:'1.0-0' }}</td>\r
            <!-- <td><span class="badge badge-{{ o.status | lowercase }}">{{ o.status }}</span></td> -->\r
            <!-- <td style="font-size:11px;color:var(--text-muted)">{{ o.createdAt | date:'HH:mm' }}</td> -->\r
            <td>\r
              <div *ngIf="o.status !== 'Completed'; else completedOrderStatus" class="orders-action-row">\r
                <button class="btn btn-secondary btn-sm" title="Edit Order" aria-label="Edit Order" (click)="openEditOrderModal(o)">\u270F\uFE0F</button>\r
                <button class="btn btn-sm order-cancel-btn" [disabled]="cancellingOrderId === orderApiIdByOrderNumber[o.id]" (click)="cancelOrder(o)">\r
                  {{ cancellingOrderId === orderApiIdByOrderNumber[o.id] ? 'Cancelling...' : 'Cancel' }}\r
                </button>\r
                <button\r
                  class="btn btn-sm order-generate-bill-btn"\r
                  [disabled]="generatingBillOrderId === orderApiIdByOrderNumber[o.id]"\r
                  (click)="generateBill(o)"\r
                >\r
                  {{ generatingBillOrderId === orderApiIdByOrderNumber[o.id] ? 'Generating...' : 'Generate Bill' }}\r
                </button>\r
              </div>\r
              <ng-template #completedOrderStatus>\r
                <span class="order-completed-status">Completed</span>\r
              </ng-template>\r
            </td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
    <div *ngIf="hasNoOrders" class="card menu-item-card menu-empty-state">\r
      No order found\r
    </div>\r
    <div class="staff-pagination">\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage <= 1 || isLoadingOrders" (click)="prevOrderPage()">Prev</button>\r
      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r
      <span>Total: {{ totalRecords }}</span>\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage >= totalPages || isLoadingOrders" (click)="nextOrderPage()">Next</button>\r
      <app-api-loader [show]="isLoadingOrders" [fullscreen]="true" [message]="'Loading orders...'"></app-api-loader>\r
    </div>\r
\r
  \r
`, styles: ['/* src/app/features/orders/orders.component.css */\n.new-order-backdrop {\n  z-index: 600;\n}\n.orders-toolbar {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.orders-table-card {\n  overflow-x: auto;\n}\n.orders-total-cell {\n  color: var(--accent-gold);\n}\n.orders-action-row {\n  display: flex;\n  gap: 6px;\n}\n.new-order-modal {\n  max-width: min(1120px, 96vw);\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  color: var(--text-primary);\n  box-shadow: var(--shadow-lg);\n}\n.new-order-modal-header {\n  background: var(--bg-card);\n  border-bottom-color: var(--border);\n  flex-shrink: 0;\n}\n.new-order-modal-header h3 {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: var(--text-lg);\n  color: var(--text-primary);\n}\n.new-order-title-icon {\n  font-size: 20px;\n  line-height: 1;\n}\n.new-order-close {\n  border-color: var(--border-light);\n  background: var(--bg-input);\n  color: var(--text-secondary);\n}\n.new-order-close:hover {\n  border-color: var(--border-focus);\n  color: var(--text-primary);\n}\n.new-order-body {\n  padding: 0;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n.new-order-layout {\n  display: grid;\n  grid-template-columns: 1fr min(340px, 38%);\n  align-items: start;\n  gap: 0;\n  max-height: calc(90vh - 72px);\n}\n.new-order-menu-col {\n  display: flex;\n  flex-direction: column;\n  padding: 20px 20px 16px;\n  border-right: 1px solid var(--border);\n  min-height: 0;\n  max-height: calc(90vh - 72px);\n  overflow: hidden;\n}\n.new-order-filters {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n}\n.new-order-field .form-label {\n  color: var(--text-muted);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.new-order-input {\n  background: var(--bg-input);\n  border: 1px solid var(--border-light);\n  color: var(--text-primary);\n}\n.new-order-input:focus {\n  border-color: var(--border-focus);\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);\n}\n.new-order-search-wrap {\n  position: relative;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n}\n.new-order-search-icon {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 14px;\n  opacity: 0.55;\n  pointer-events: none;\n}\n.new-order-search {\n  padding-left: 38px;\n}\n.new-order-menu-scroll {\n  flex: 1 1 auto;\n  overflow-y: auto;\n  min-height: 0;\n  padding-right: 4px;\n}\n.new-order-empty-menu {\n  padding: 32px 12px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 13px;\n}\n.new-order-category {\n  margin-bottom: 20px;\n}\n.new-order-category-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  color: var(--text-muted);\n  margin-bottom: 10px;\n}\n.new-order-cat-icon {\n  font-size: 14px;\n}\n.new-order-item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.new-order-item-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 10px;\n  border-radius: var(--radius-md);\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n}\n.new-order-item-row:hover {\n  border-color: rgba(220, 38, 38, 0.25);\n}\n.new-order-item-main {\n  display: flex;\n  gap: 10px;\n  min-width: 0;\n  flex: 1;\n}\n.new-order-veg-badge {\n  width: 14px;\n  height: 14px;\n  border: 1px solid var(--border-light);\n  border-radius: 3px;\n  flex-shrink: 0;\n  margin-top: 3px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.new-order-veg-badge::after {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}\n.new-order-veg::after {\n  background: #22c55e;\n}\n.new-order-nonveg::after {\n  background: #ef4444;\n}\n.new-order-item-name {\n  font-weight: 600;\n  font-size: 14px;\n  color: var(--text-primary);\n  line-height: 1.35;\n}\n.new-order-item-meta {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 2px;\n  line-height: 1.35;\n}\n.new-order-item-actions {\n  flex-shrink: 0;\n  text-align: right;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n}\n.new-order-item-price {\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--accent-gold);\n}\n.new-order-add-btn {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 8px 16px;\n  border-radius: var(--radius-md);\n  border: 1px solid rgba(220, 38, 38, 0.35);\n  background: rgba(220, 38, 38, 0.08);\n  color: var(--accent-gold);\n  transition: var(--transition);\n}\n.new-order-add-btn:hover {\n  background: var(--accent-gold);\n  color: #fff;\n  border-color: var(--accent-gold);\n}\n.new-order-cart-col {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  max-height: calc(90vh - 72px);\n  background: var(--bg-secondary);\n  padding: 20px 18px 18px;\n  border-left: 1px solid var(--border);\n  margin-left: -1px;\n}\n.new-order-cart-head {\n  flex-shrink: 0;\n}\n.new-order-cart-head h4 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.new-order-captain {\n  font-size: 12px;\n  color: var(--text-muted);\n  margin-top: 6px;\n}\n.new-order-cart-scroll {\n  flex: 0 1 auto;\n  overflow-y: auto;\n  min-height: 0;\n  max-height: min(42vh, 360px);\n  margin: 14px 0 0;\n}\n.new-order-cart-empty {\n  font-size: 13px;\n  color: var(--text-muted);\n  text-align: center;\n  padding: 24px 8px;\n}\n.new-order-cart-lines {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.new-order-cart-line {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 8px;\n  border-radius: var(--radius-md);\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n}\n.new-order-cart-name {\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--text-primary);\n}\n.new-order-qty {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.new-order-qty-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 1px solid var(--border-light);\n  background: var(--bg-card);\n  color: var(--text-secondary);\n  font-size: 16px;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: var(--transition);\n}\n.new-order-qty-btn:hover {\n  border-color: var(--accent-gold);\n  color: var(--accent-gold);\n}\n.new-order-qty-val {\n  min-width: 22px;\n  text-align: center;\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--text-primary);\n}\n.new-order-cart-line-total {\n  font-weight: 700;\n  font-size: 13px;\n  color: var(--accent-gold);\n  text-align: right;\n  min-width: 72px;\n}\n.new-order-cart-footer {\n  flex-shrink: 0;\n  margin-top: 14px;\n  padding-top: 4px;\n}\n.new-order-totals {\n  border-top: 1px solid var(--border);\n  padding-top: 12px;\n  margin-bottom: 14px;\n}\n.new-order-total-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.new-order-total-grand {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-top: 4px;\n  padding-top: 8px;\n  border-top: 1px dashed var(--border-light);\n}\n.new-order-total-grand span:last-child {\n  color: var(--accent-gold);\n}\n.new-order-place-btn {\n  width: 100%;\n  padding: 14px 16px;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  background: var(--accent-gold);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: var(--transition);\n  box-shadow: var(--shadow-md);\n}\n.new-order-place-btn:hover:not(:disabled) {\n  background: var(--accent-gold-dim);\n  transform: translateY(-1px);\n}\n.new-order-place-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.order-cancel-btn {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n}\n.order-cancel-btn:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.order-generate-bill-btn {\n  border: 1px solid rgba(59, 130, 246, 0.55);\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #7c3aed);\n  color: #fff;\n}\n.order-generate-bill-btn:hover:not(:disabled) {\n  filter: brightness(1.08);\n  border-color: #7c3aed;\n}\n.order-completed-status {\n  display: inline-block;\n  padding: 5px 10px;\n  border-radius: 999px;\n  border: 1px solid rgba(34, 197, 94, 0.35);\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: default;\n}\n@media (max-width: 900px) {\n  .new-order-layout {\n    grid-template-columns: 1fr;\n    max-height: none;\n  }\n  .new-order-menu-col {\n    border-right: none;\n    max-height: min(55vh, 480px);\n    border-bottom: 1px solid var(--border);\n  }\n  .new-order-cart-col {\n    border-left: none;\n    margin-left: 0;\n    max-height: none;\n  }\n  .new-order-cart-scroll {\n    max-height: min(32vh, 280px);\n  }\n}\n/*# sourceMappingURL=orders.component.css.map */\n'] }]
  }], () => [{ type: StateService }, { type: AuthService }, { type: ToastService }, { type: OrderService }, { type: CustomerService }, { type: MenuService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdersComponent, { className: "OrdersComponent", filePath: "src/app/features/orders/orders.component.ts", lineNumber: 35 });
})();
export {
  OrdersComponent
};
//# sourceMappingURL=chunk-H2ZUBBRW.js.map
