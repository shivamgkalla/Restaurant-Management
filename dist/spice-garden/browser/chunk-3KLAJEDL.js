import {
  KitchenStationService
} from "./chunk-NPXXJL7H.js";
import {
  CategoryService
} from "./chunk-TO6XBIYU.js";
import {
  MenuService
} from "./chunk-ODJ44HVP.js";
import {
  ApiLoaderComponent
} from "./chunk-SWBXCHKP.js";
import {
  require_sweetalert2_all
} from "./chunk-KDHDQBKH.js";
import "./chunk-FJDPAPFN.js";
import {
  CheckboxControlValueAccessor,
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
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
  __toESM,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/menu/menu.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function MenuComponent_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    \u0275\u0275property("value", c_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r1.name);
  }
}
function MenuComponent_div_18_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("value", s_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4.name);
  }
}
function MenuComponent_div_18_small_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Kitchen station is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_18_small_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Item name is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_18_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.name);
  }
}
function MenuComponent_div_18_small_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Category is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_18_small_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Price is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_18_small_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Please select veg or non-veg");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275listener("click", function MenuComponent_div_18_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 18)(3, "h3");
    \u0275\u0275text(4, "Add Menu Item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function MenuComponent_div_18_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 20)(8, "div", 21)(9, "div", 22)(10, "label", 23);
    \u0275\u0275text(11, "Kitchen Station ");
    \u0275\u0275elementStart(12, "span", 24);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.stationId, $event) || (ctx_r2.newMenu.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 7);
    \u0275\u0275text(16, "Select station");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, MenuComponent_div_18_option_17_Template, 2, 2, "option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, MenuComponent_div_18_small_18_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 22)(20, "label", 23);
    \u0275\u0275text(21, "Item Name ");
    \u0275\u0275elementStart(22, "span", 24);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.name, $event) || (ctx_r2.newMenu.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, MenuComponent_div_18_small_25_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 21)(27, "div", 22)(28, "label", 23);
    \u0275\u0275text(29, "Category ");
    \u0275\u0275elementStart(30, "span", 24);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "select", 28);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.categoryId, $event) || (ctx_r2.newMenu.categoryId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(33, MenuComponent_div_18_option_33_Template, 2, 2, "option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, MenuComponent_div_18_small_34_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 22)(36, "label", 23);
    \u0275\u0275text(37, "Price ");
    \u0275\u0275elementStart(38, "span", 24);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.price, $event) || (ctx_r2.newMenu.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, MenuComponent_div_18_small_41_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 22)(43, "label", 23);
    \u0275\u0275text(44, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 30);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.description, $event) || (ctx_r2.newMenu.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 22)(47, "label", 23);
    \u0275\u0275text(48, "Veg / Non-Veg ");
    \u0275\u0275elementStart(49, "span", 24);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 31)(52, "label", 32)(53, "input", 33);
    \u0275\u0275listener("change", function MenuComponent_div_18_Template_input_change_53_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setFoodType("veg"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(54, " Veg ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "label", 32)(56, "input", 33);
    \u0275\u0275listener("change", function MenuComponent_div_18_Template_input_change_56_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setFoodType("non_veg"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(57, " Non-Veg ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, MenuComponent_div_18_small_58_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 22)(60, "label", 32)(61, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_18_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newMenu.isChefSpecial, $event) || (ctx_r2.newMenu.isChefSpecial = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(62, " Chef Special ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "button", 35);
    \u0275\u0275listener("click", function MenuComponent_div_18_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addMenuItem());
    });
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.stationId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.kitchenStations);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.submitAttempted && !ctx_r2.newMenu.stationId);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.submitAttempted && !ctx_r2.newMenu.name.trim());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.categoryId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.categories);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.submitAttempted && !ctx_r2.newMenu.categoryId);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.price);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.submitAttempted && (!ctx_r2.newMenu.price || ctx_r2.newMenu.price <= 0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.description);
    \u0275\u0275advance(8);
    \u0275\u0275property("checked", ctx_r2.newMenu.foodType === "veg");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r2.newMenu.foodType === "non_veg");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.submitAttempted && !ctx_r2.newMenu.foodType);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newMenu.isChefSpecial);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isCreating);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isCreating ? "Creating..." : "Create Menu Item", " ");
  }
}
function MenuComponent_div_19_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275property("value", s_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.name);
  }
}
function MenuComponent_div_19_small_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Kitchen station is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_19_small_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Item name is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_19_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("value", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.name);
  }
}
function MenuComponent_div_19_small_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Category is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_19_small_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Price is required");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_19_small_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 36);
    \u0275\u0275text(1, "Please select veg or non-veg");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275listener("click", function MenuComponent_div_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 18)(3, "h3");
    \u0275\u0275text(4, "Edit Menu Item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function MenuComponent_div_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 20)(8, "div", 21)(9, "div", 22)(10, "label", 23);
    \u0275\u0275text(11, "Kitchen Station ");
    \u0275\u0275elementStart(12, "span", 24);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.stationId, $event) || (ctx_r2.editMenu.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 7);
    \u0275\u0275text(16, "Select station");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, MenuComponent_div_19_option_17_Template, 2, 2, "option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, MenuComponent_div_19_small_18_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 22)(20, "label", 23);
    \u0275\u0275text(21, "Item Name ");
    \u0275\u0275elementStart(22, "span", 24);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.name, $event) || (ctx_r2.editMenu.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, MenuComponent_div_19_small_25_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 21)(27, "div", 22)(28, "label", 23);
    \u0275\u0275text(29, "Category ");
    \u0275\u0275elementStart(30, "span", 24);
    \u0275\u0275text(31, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.categoryId, $event) || (ctx_r2.editMenu.categoryId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(33, MenuComponent_div_19_option_33_Template, 2, 2, "option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, MenuComponent_div_19_small_34_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 22)(36, "label", 23);
    \u0275\u0275text(37, "Price ");
    \u0275\u0275elementStart(38, "span", 24);
    \u0275\u0275text(39, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.price, $event) || (ctx_r2.editMenu.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, MenuComponent_div_19_small_41_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 22)(43, "label", 23);
    \u0275\u0275text(44, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 41);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.description, $event) || (ctx_r2.editMenu.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 22)(47, "label", 23);
    \u0275\u0275text(48, "Veg / Non-Veg ");
    \u0275\u0275elementStart(49, "span", 24);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 31)(52, "label", 32)(53, "input", 33);
    \u0275\u0275listener("change", function MenuComponent_div_19_Template_input_change_53_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setEditFoodType("veg"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(54, " Veg ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "label", 32)(56, "input", 33);
    \u0275\u0275listener("change", function MenuComponent_div_19_Template_input_change_56_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setEditFoodType("non_veg"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(57, " Non-Veg ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, MenuComponent_div_19_small_58_Template, 2, 0, "small", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 22)(60, "label", 32)(61, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_div_19_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editMenu.isChefSpecial, $event) || (ctx_r2.editMenu.isChefSpecial = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(62, " Chef Special ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "button", 35);
    \u0275\u0275listener("click", function MenuComponent_div_19_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateMenuItem());
    });
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.stationId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.kitchenStations);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editSubmitAttempted && !ctx_r2.editMenu.stationId);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editSubmitAttempted && !ctx_r2.editMenu.name.trim());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.categoryId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.categories);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editSubmitAttempted && !ctx_r2.editMenu.categoryId);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.price);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editSubmitAttempted && (!ctx_r2.editMenu.price || ctx_r2.editMenu.price <= 0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.description);
    \u0275\u0275advance(8);
    \u0275\u0275property("checked", ctx_r2.editMenu.foodType === "veg");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r2.editMenu.foodType === "non_veg");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.editSubmitAttempted && !ctx_r2.editMenu.foodType);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editMenu.isChefSpecial);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isUpdating);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isUpdating ? "Updating..." : "Update Menu Item", " ");
  }
}
function MenuComponent_div_21_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1, "\u2B50 Chef's Special");
    \u0275\u0275elementEnd();
  }
}
function MenuComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43)(2, "div")(3, "span", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MenuComponent_div_21_span_5_Template, 2, 0, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 46);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 47);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 48);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 49)(13, "span", 50);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 51)(16, "button", 52);
    \u0275\u0275listener("click", function MenuComponent_div_21_Template_button_click_16_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(item_r10));
    });
    \u0275\u0275text(17, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 53);
    \u0275\u0275listener("click", function MenuComponent_div_21_Template_button_click_18_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteMenuItem(item_r10));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 54);
    \u0275\u0275element(20, "path", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "button", 56);
    \u0275\u0275listener("click", function MenuComponent_div_21_Template_button_click_21_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleAvailability(item_r10));
    });
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", item_r10.veg ? "rgba(16,215,122,.15)" : "rgba(239,68,68,.15)")("color", item_r10.veg ? "var(--status-available)" : "var(--danger)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r10.veg ? "\u{1F7E2} Veg" : "\u{1F534} Non-Veg", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r10.chefSpecial);
    \u0275\u0275advance();
    \u0275\u0275classProp("badge-available", item_r10.available)("badge-cleaning", !item_r10.available);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r10.available ? "Available" : "Unavailable", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", item_r10.price, "");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.deletingItemId === item_r10.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r10.available ? "Mark Unavailable" : "Mark Available", " ");
  }
}
function MenuComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275text(1, " No record found ");
    \u0275\u0275elementEnd();
  }
}
var MenuComponent = class _MenuComponent {
  toast;
  menuService;
  categoryService;
  kitchenStationService;
  menuItems = [];
  menuIdMap = {};
  categories = [];
  kitchenStations = [];
  searchInput = "";
  appliedSearch = "";
  selectedCat = "";
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  isLoadingMenu = false;
  showAddModal = false;
  showEditModal = false;
  isCreating = false;
  isUpdating = false;
  deletingItemId = null;
  submitAttempted = false;
  editSubmitAttempted = false;
  newMenu = {
    stationId: "",
    name: "",
    categoryId: "",
    price: 0,
    description: "",
    foodType: "",
    isChefSpecial: false
  };
  editMenu = {
    itemId: "",
    stationId: "",
    name: "",
    categoryId: "",
    price: 0,
    description: "",
    foodType: "",
    isChefSpecial: false
  };
  get showMenuLoader() {
    return this.isLoadingMenu || this.isCreating || this.isUpdating || this.deletingItemId !== null;
  }
  get hasActiveSearch() {
    return !!this.appliedSearch;
  }
  constructor(toast, menuService, categoryService, kitchenStationService) {
    this.toast = toast;
    this.menuService = menuService;
    this.categoryService = categoryService;
    this.kitchenStationService = kitchenStationService;
  }
  ngOnInit() {
    this.loadCategories();
    this.loadKitchenStations();
    this.loadMenu(1);
  }
  toggleAvailability(item) {
    const apiItemId = this.menuIdMap[item.id];
    if (!apiItemId) {
      this.toast.show("Unable to identify menu item");
      return;
    }
    this.menuService.toggleAvailability(apiItemId).subscribe({
      next: (response) => {
        if (response?.statusCode !== 200) {
          this.toast.show(response?.message || "Failed to update availability", "warning");
          return;
        }
        const isAvailable = !!response?.data?.is_available;
        this.menuItems = this.menuItems.map((m) => m.id === item.id ? __spreadProps(__spreadValues({}, m), { available: isAvailable }) : m);
        this.toast.show(`${item.name} marked as ${isAvailable ? "Available" : "Unavailable"}`);
      },
      error: (err) => {
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to update availability.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  applySearch() {
    this.appliedSearch = this.searchInput.trim();
    this.loadMenu(1);
  }
  clearSearch() {
    if (!this.searchInput && !this.appliedSearch)
      return;
    this.searchInput = "";
    this.appliedSearch = "";
    this.loadMenu(1);
  }
  onCategoryChange() {
    this.loadMenu(1);
  }
  prevPage() {
    if (this.currentPage <= 1 || this.isLoadingMenu)
      return;
    this.loadMenu(this.currentPage - 1);
  }
  nextPage() {
    if (this.currentPage >= this.totalPages || this.isLoadingMenu)
      return;
    this.loadMenu(this.currentPage + 1);
  }
  openAddModal() {
    this.submitAttempted = false;
    this.newMenu = {
      stationId: this.kitchenStations[0] ? String(this.kitchenStations[0].id) : "",
      name: "",
      categoryId: this.categories[0] ? String(this.categories[0].id) : "",
      price: 0,
      description: "",
      foodType: "",
      isChefSpecial: false
    };
    this.showAddModal = true;
  }
  openEditModal(item) {
    this.editSubmitAttempted = false;
    this.editMenu = {
      itemId: item.id,
      stationId: item.stationId || (this.kitchenStations[0] ? String(this.kitchenStations[0].id) : ""),
      name: item.name,
      categoryId: item.categoryId,
      price: item.price,
      description: item.description,
      foodType: item.veg ? "veg" : "non_veg",
      isChefSpecial: item.chefSpecial
    };
    this.showEditModal = true;
  }
  setFoodType(foodType) {
    this.newMenu.foodType = foodType;
  }
  setEditFoodType(foodType) {
    this.editMenu.foodType = foodType;
  }
  toCategoryIdNumber(categoryId) {
    const numeric = Number(categoryId);
    if (Number.isInteger(numeric) && numeric > 0) {
      return numeric;
    }
    const digitsOnly = categoryId.replace(/\D+/g, "");
    const parsed = Number(digitsOnly);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
    return null;
  }
  addMenuItem() {
    this.submitAttempted = true;
    const name = this.newMenu.name.trim();
    const description = this.newMenu.description.trim();
    const price = Number(this.newMenu.price);
    const hasValidFoodType = this.newMenu.foodType === "veg" || this.newMenu.foodType === "non_veg";
    if (!name || !this.newMenu.categoryId || !this.newMenu.stationId || price <= 0 || !hasValidFoodType || this.isCreating)
      return;
    const categoryIdForApi = this.toCategoryIdNumber(this.newMenu.categoryId);
    if (categoryIdForApi === null) {
      this.toast.show("Invalid category selected");
      return;
    }
    const stationIdForApi = this.toStationIdNumber(this.newMenu.stationId);
    if (stationIdForApi === null) {
      this.toast.show("Invalid kitchen station selected");
      return;
    }
    this.isCreating = true;
    this.menuService.createMenu({
      category_id: categoryIdForApi,
      station_id: stationIdForApi,
      name,
      description,
      base_price: price,
      food_type: this.newMenu.foodType,
      is_chef_special: this.newMenu.isChefSpecial
    }).subscribe({
      next: () => {
        this.toast.show(`${name} added to menu`);
        this.showAddModal = false;
        this.loadMenu(1);
        this.isCreating = false;
      },
      error: () => {
        this.toast.show("Failed to create menu item");
        this.isCreating = false;
      }
    });
  }
  updateMenuItem() {
    this.editSubmitAttempted = true;
    const name = this.editMenu.name.trim();
    const description = this.editMenu.description.trim();
    const price = Number(this.editMenu.price);
    const hasValidFoodType = this.editMenu.foodType === "veg" || this.editMenu.foodType === "non_veg";
    if (!name || !this.editMenu.categoryId || !this.editMenu.stationId || price <= 0 || !hasValidFoodType || this.isUpdating)
      return;
    const categoryIdForApi = this.toCategoryIdNumber(this.editMenu.categoryId);
    if (categoryIdForApi === null) {
      this.toast.show("Invalid category selected");
      return;
    }
    const stationIdForApi = this.toStationIdNumber(this.editMenu.stationId);
    if (stationIdForApi === null) {
      this.toast.show("Invalid kitchen station selected");
      return;
    }
    const apiItemId = this.menuIdMap[this.editMenu.itemId];
    if (!apiItemId) {
      this.toast.show("Unable to identify menu item");
      return;
    }
    this.isUpdating = true;
    this.menuService.editMenu(apiItemId, {
      category_id: categoryIdForApi,
      station_id: stationIdForApi,
      name,
      description,
      base_price: price,
      food_type: this.editMenu.foodType,
      is_chef_special: this.editMenu.isChefSpecial
    }).subscribe({
      next: () => {
        this.toast.show(`${name} updated successfully`);
        this.showEditModal = false;
        this.loadMenu(this.currentPage);
        this.isUpdating = false;
      },
      error: () => {
        this.toast.show("Failed to update menu item");
        this.isUpdating = false;
      }
    });
  }
  deleteMenuItem(item) {
    if (this.deletingItemId || this.isLoadingMenu)
      return;
    const apiItemId = this.menuIdMap[item.id];
    if (!apiItemId) {
      this.toast.show("Unable to identify menu item");
      return;
    }
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will archive menu item "${item.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      this.deletingItemId = item.id;
      this.menuService.deleteMenuById(apiItemId).subscribe({
        next: () => {
          this.toast.show(`${item.name} archived`);
          this.loadMenu(this.currentPage);
          this.deletingItemId = null;
        },
        error: () => {
          this.toast.show("Failed to archive menu item");
          this.deletingItemId = null;
        }
      });
    });
  }
  loadMenu(page) {
    this.isLoadingMenu = true;
    this.menuService.menuPagination({
      page,
      limit: this.pageSize,
      search: this.appliedSearch || void 0,
      category_id: this.toCategoryIdNumber(this.selectedCat) ?? void 0
    }).subscribe({
      next: (response) => {
        this.isLoadingMenu = false;
        const statusCode = response?.statusCode;
        if (statusCode !== void 0 && statusCode !== 200) {
          this.toast.show(response?.message || "Failed to load menu items", "warning");
          this.menuItems = [];
          return;
        }
        const rows = Array.isArray(response?.data) ? response.data : [];
        this.menuIdMap = {};
        rows.forEach((r) => {
          this.menuIdMap[`ITEM${r.id}`] = r.id;
        });
        this.menuItems = rows.map((row) => this.mapApiItemToMenuItem(row));
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalRecords = response.meta?.total ?? rows.length;
        this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
      },
      error: (err) => {
        this.isLoadingMenu = false;
        this.menuItems = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load menu items.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        const statusCode = response?.statusCode;
        if (statusCode !== void 0 && statusCode !== 200) {
          this.toast.show(response?.message || "Failed to load categories", "warning");
          this.categories = [];
          return;
        }
        this.categories = Array.isArray(response?.data) ? response.data : [];
      },
      error: (err) => {
        this.categories = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load categories.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  loadKitchenStations() {
    this.kitchenStationService.getAllStations().subscribe({
      next: (response) => {
        const statusCode = response?.statusCode;
        if (statusCode !== void 0 && statusCode !== 200) {
          this.toast.show(response?.message || "Failed to load kitchen stations", "warning");
          this.kitchenStations = [];
          return;
        }
        this.kitchenStations = Array.isArray(response?.data) ? response.data.filter((station) => station?.is_active !== false) : [];
      },
      error: (err) => {
        this.kitchenStations = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load kitchen stations.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  toStationIdNumber(stationId) {
    const numeric = Number(stationId);
    if (Number.isInteger(numeric) && numeric > 0) {
      return numeric;
    }
    return null;
  }
  mapApiItemToMenuItem(item) {
    return {
      id: `ITEM${item.id}`,
      name: item.name,
      sku: item.sku,
      categoryId: String(item.category_id),
      stationId: item.station_id ? String(item.station_id) : "",
      description: item.description ?? "",
      price: item.base_price,
      prepTime: item.prep_time_minutes,
      veg: item.food_type === "veg",
      spiceLevel: this.toSpiceLevel(item.spice_level),
      chefSpecial: item.is_chef_special,
      isNew: false,
      available: item.is_available,
      station: item.station_name ?? "Main",
      variants: ["Regular"]
    };
  }
  toSpiceLevel(spiceLevel) {
    if (spiceLevel == null)
      return null;
    if (spiceLevel <= 0)
      return "mild";
    if (spiceLevel === 1)
      return "medium";
    if (spiceLevel === 2)
      return "hot";
    return "extra-hot";
  }
  static \u0275fac = function MenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(MenuService), \u0275\u0275directiveInject(CategoryService), \u0275\u0275directiveInject(KitchenStationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MenuComponent, selectors: [["app-menu"]], decls: 33, vars: 19, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right", "menu-toolbar"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "search", "aria-label", "Search menu items", "placeholder", "Search items\u2026", 1, "form-input", "menu-search-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], ["aria-label", "Filter category", 1, "form-select", "menu-category-filter", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "modal-backdrop", 4, "ngIf"], [1, "menu-grid"], ["class", "card menu-item-card", 4, "ngFor", "ngForOf"], ["class", "card menu-item-card menu-empty-state", 4, "ngIf"], [1, "staff-pagination"], [3, "show", "fullscreen", "message"], [3, "value"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "grid-2"], [1, "form-group"], [1, "form-label"], [1, "form-req"], ["aria-label", "Kitchen station", 1, "form-select", 3, "ngModelChange", "ngModel"], ["class", "menu-form-error", 4, "ngIf"], ["aria-label", "Menu item name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Menu item category", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Menu item price", "type", "number", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Menu item description", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "menu-food-type-row"], [1, "menu-checkbox-label"], ["type", "checkbox", 3, "change", "checked"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "menu-form-error"], ["aria-label", "Edit kitchen station", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit menu item name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit menu item category", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit menu item price", "type", "number", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit menu item description", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "card", "menu-item-card"], [1, "menu-card-top"], [1, "menu-food-badge"], ["class", "menu-chef-special", 4, "ngIf"], [1, "badge"], [1, "menu-item-name"], [1, "menu-item-description"], [1, "menu-card-bottom"], [1, "menu-item-price"], [1, "menu-item-actions"], ["title", "Edit item", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], ["title", "Delete item", 1, "btn", "btn-sm", "menu-delete-icon-btn", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "width", "14", "height", "14", "aria-hidden", "true"], ["d", "M3 6h18M9 6V4h6v2m-8 0l1 14h8l1-14M10 10v7m4-7v7", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "menu-chef-special"], [1, "card", "menu-item-card", "menu-empty-state"]], template: function MenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Menu Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "button", 3);
      \u0275\u0275listener("click", function MenuComponent_Template_button_click_7_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(8, "+ Add Menu Item");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchInput, $event) || (ctx.searchInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function MenuComponent_Template_input_keydown_enter_9_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function MenuComponent_Template_button_click_10_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275text(11, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 5);
      \u0275\u0275listener("click", function MenuComponent_Template_button_click_12_listener() {
        return ctx.clearSearch();
      });
      \u0275\u0275text(13, "Clear");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "select", 6);
      \u0275\u0275twoWayListener("ngModelChange", function MenuComponent_Template_select_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedCat, $event) || (ctx.selectedCat = $event);
        return $event;
      });
      \u0275\u0275listener("change", function MenuComponent_Template_select_change_14_listener() {
        return ctx.onCategoryChange();
      });
      \u0275\u0275elementStart(15, "option", 7);
      \u0275\u0275text(16, "All Categories");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, MenuComponent_option_17_Template, 2, 2, "option", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(18, MenuComponent_div_18_Template, 65, 17, "div", 9)(19, MenuComponent_div_19_Template, 65, 17, "div", 9);
      \u0275\u0275elementStart(20, "div", 10);
      \u0275\u0275template(21, MenuComponent_div_21_Template, 23, 16, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, MenuComponent_div_22_Template, 2, 0, "div", 12);
      \u0275\u0275elementStart(23, "div", 13)(24, "button", 5);
      \u0275\u0275listener("click", function MenuComponent_Template_button_click_24_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(25, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "button", 5);
      \u0275\u0275listener("click", function MenuComponent_Template_button_click_30_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(31, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "app-api-loader", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2("", ctx.totalRecords, " items across ", ctx.categories.length, " categories");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchInput);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingMenu);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.searchInput && !ctx.hasActiveSearch || ctx.isLoadingMenu);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedCat);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.menuItems);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoadingMenu && ctx.menuItems.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage <= 1 || ctx.isLoadingMenu);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.totalRecords, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoadingMenu);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.showMenuLoader)("fullscreen", true)("message", "Loading menu...");
    }
  }, dependencies: [NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, ApiLoaderComponent], styles: ["\n\n.menu-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.menu-search-input[_ngcontent-%COMP%] {\n  width: 220px;\n}\n.menu-category-filter[_ngcontent-%COMP%] {\n  width: 180px;\n}\n.menu-form-error[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n.menu-food-type-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.menu-checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.menu-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 16px;\n}\n.menu-item-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.menu-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n}\n.menu-food-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 4px;\n  margin-right: 6px;\n}\n.menu-chef-special[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--accent-gold);\n}\n.menu-item-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.menu-item-description[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-bottom: 10px;\n}\n.menu-card-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.menu-item-price[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--accent-gold);\n}\n.menu-item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.menu-delete-icon-btn[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 32px;\n}\n.menu-delete-icon-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.menu-delete-icon-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  display: block;\n}\n.menu-delete-icon-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.menu-empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.staff-pagination[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=menu.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuComponent, [{
    type: Component,
    args: [{ selector: "app-menu", standalone: true, imports: [NgForOf, NgIf, FormsModule, ApiLoaderComponent], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Menu Management</h2>\r
        <p>{{ totalRecords }} items across {{ categories.length }} categories</p>\r
      </div>\r
      <div class="section-header-right menu-toolbar">\r
        <button class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Menu Item</button>\r
        <input class="form-input menu-search-input" type="search" aria-label="Search menu items" [(ngModel)]="searchInput" (keydown.enter)="applySearch()" placeholder="Search items\u2026">\r
        <button type="button" class="btn btn-secondary btn-sm" (click)="applySearch()" [disabled]="isLoadingMenu">Search</button>\r
        <button type="button" class="btn btn-secondary btn-sm" (click)="clearSearch()" [disabled]="(!searchInput && !hasActiveSearch) || isLoadingMenu">Clear</button>\r
        <select class="form-select menu-category-filter" aria-label="Filter category" [(ngModel)]="selectedCat" (change)="onCategoryChange()">\r
          <option value="">All Categories</option>\r
          <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>\r
        </select>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showAddModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Add Menu Item</h3>\r
          <button class="modal-close" (click)="showAddModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Kitchen Station <span class="form-req">*</span></label>\r
              <select class="form-select" aria-label="Kitchen station" [(ngModel)]="newMenu.stationId">\r
                <option value="">Select station</option>\r
                <option *ngFor="let s of kitchenStations" [value]="s.id">{{ s.name }}</option>\r
              </select>\r
              <small *ngIf="submitAttempted && !newMenu.stationId" class="menu-form-error">Kitchen station is required</small>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Item Name <span class="form-req">*</span></label>\r
              <input class="form-input" aria-label="Menu item name" [(ngModel)]="newMenu.name">\r
              <small *ngIf="submitAttempted && !newMenu.name.trim()" class="menu-form-error">Item name is required</small>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group"><label class="form-label">Category <span class="form-req">*</span></label>\r
              <select class="form-select" aria-label="Menu item category" [(ngModel)]="newMenu.categoryId">\r
                <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>\r
              </select>\r
              <small *ngIf="submitAttempted && !newMenu.categoryId" class="menu-form-error">Category is required</small>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Price <span class="form-req">*</span></label>\r
              <input class="form-input" aria-label="Menu item price" type="number" min="1" [(ngModel)]="newMenu.price">\r
              <small *ngIf="submitAttempted && (!newMenu.price || newMenu.price <= 0)" class="menu-form-error">Price is required</small>\r
            </div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" aria-label="Menu item description" rows="2" [(ngModel)]="newMenu.description"></textarea></div>\r
          <div class="form-group">\r
            <label class="form-label">Veg / Non-Veg <span class="form-req">*</span></label>\r
            <div class="menu-food-type-row">\r
              <label class="menu-checkbox-label">\r
                <input type="checkbox" [checked]="newMenu.foodType === 'veg'" (change)="setFoodType('veg')">\r
                Veg\r
              </label>\r
              <label class="menu-checkbox-label">\r
                <input type="checkbox" [checked]="newMenu.foodType === 'non_veg'" (change)="setFoodType('non_veg')">\r
                Non-Veg\r
              </label>\r
            </div>\r
            <small *ngIf="submitAttempted && !newMenu.foodType" class="menu-form-error">Please select veg or non-veg</small>\r
          </div>\r
          <div class="form-group">\r
            <label class="menu-checkbox-label">\r
              <input type="checkbox" [(ngModel)]="newMenu.isChefSpecial">\r
              Chef Special\r
            </label>\r
          </div>\r
          <button class="btn btn-primary btn-full" [disabled]="isCreating" (click)="addMenuItem()">\r
            {{ isCreating ? 'Creating...' : 'Create Menu Item' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showEditModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Edit Menu Item</h3>\r
          <button class="modal-close" (click)="showEditModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Kitchen Station <span class="form-req">*</span></label>\r
              <select class="form-select" aria-label="Edit kitchen station" [(ngModel)]="editMenu.stationId">\r
                <option value="">Select station</option>\r
                <option *ngFor="let s of kitchenStations" [value]="s.id">{{ s.name }}</option>\r
              </select>\r
              <small *ngIf="editSubmitAttempted && !editMenu.stationId" class="menu-form-error">Kitchen station is required</small>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Item Name <span class="form-req">*</span></label>\r
              <input class="form-input" aria-label="Edit menu item name" [(ngModel)]="editMenu.name">\r
              <small *ngIf="editSubmitAttempted && !editMenu.name.trim()" class="menu-form-error">Item name is required</small>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group"><label class="form-label">Category <span class="form-req">*</span></label>\r
              <select class="form-select" aria-label="Edit menu item category" [(ngModel)]="editMenu.categoryId">\r
                <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>\r
              </select>\r
              <small *ngIf="editSubmitAttempted && !editMenu.categoryId" class="menu-form-error">Category is required</small>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Price <span class="form-req">*</span></label>\r
              <input class="form-input" aria-label="Edit menu item price" type="number" min="1" [(ngModel)]="editMenu.price">\r
              <small *ngIf="editSubmitAttempted && (!editMenu.price || editMenu.price <= 0)" class="menu-form-error">Price is required</small>\r
            </div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" aria-label="Edit menu item description" rows="2" [(ngModel)]="editMenu.description"></textarea></div>\r
          <div class="form-group">\r
            <label class="form-label">Veg / Non-Veg <span class="form-req">*</span></label>\r
            <div class="menu-food-type-row">\r
              <label class="menu-checkbox-label">\r
                <input type="checkbox" [checked]="editMenu.foodType === 'veg'" (change)="setEditFoodType('veg')">\r
                Veg\r
              </label>\r
              <label class="menu-checkbox-label">\r
                <input type="checkbox" [checked]="editMenu.foodType === 'non_veg'" (change)="setEditFoodType('non_veg')">\r
                Non-Veg\r
              </label>\r
            </div>\r
            <small *ngIf="editSubmitAttempted && !editMenu.foodType" class="menu-form-error">Please select veg or non-veg</small>\r
          </div>\r
          <div class="form-group">\r
            <label class="menu-checkbox-label">\r
              <input type="checkbox" [(ngModel)]="editMenu.isChefSpecial">\r
              Chef Special\r
            </label>\r
          </div>\r
          <button class="btn btn-primary btn-full" [disabled]="isUpdating" (click)="updateMenuItem()">\r
            {{ isUpdating ? 'Updating...' : 'Update Menu Item' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="menu-grid">\r
      <div *ngFor="let item of menuItems" class="card menu-item-card">\r
        <div class="menu-card-top">\r
          <div>\r
            <span class="menu-food-badge"\r
              [style.background]="item.veg ? 'rgba(16,215,122,.15)' : 'rgba(239,68,68,.15)'"\r
              [style.color]="item.veg ? 'var(--status-available)' : 'var(--danger)'">\r
              {{ item.veg ? '\u{1F7E2} Veg' : '\u{1F534} Non-Veg' }}\r
            </span>\r
            <span *ngIf="item.chefSpecial" class="menu-chef-special">\u2B50 Chef's Special</span>\r
          </div>\r
          <span class="badge" [class.badge-available]="item.available" [class.badge-cleaning]="!item.available">\r
            {{ item.available ? 'Available' : 'Unavailable' }}\r
          </span>\r
        </div>\r
        <div class="menu-item-name">{{ item.name }}</div>\r
        <div class="menu-item-description">{{ item.description }}</div>\r
        <div class="menu-card-bottom">\r
          <span class="menu-item-price">\u20B9{{ item.price }}</span>\r
          <div class="menu-item-actions">\r
            <button class="btn btn-secondary btn-sm" title="Edit item" (click)="openEditModal(item)">\u270F\uFE0F</button>\r
            <button class="btn btn-sm menu-delete-icon-btn" title="Delete item" [disabled]="deletingItemId === item.id" (click)="deleteMenuItem(item)">\r
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">\r
                <path d="M3 6h18M9 6V4h6v2m-8 0l1 14h8l1-14M10 10v7m4-7v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
              </svg>\r
            </button>\r
            <button class="btn btn-secondary btn-sm" (click)="toggleAvailability(item)">\r
              {{ item.available ? 'Mark Unavailable' : 'Mark Available' }}\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
    <div *ngIf="!isLoadingMenu && menuItems.length === 0" class="card menu-item-card menu-empty-state">\r
      No record found\r
    </div>\r
    <div class="staff-pagination">\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage <= 1 || isLoadingMenu" (click)="prevPage()">Prev</button>\r
      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r
      <span>Total: {{ totalRecords }}</span>\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage >= totalPages || isLoadingMenu" (click)="nextPage()">Next</button>\r
      <app-api-loader [show]="showMenuLoader" [fullscreen]="true" [message]="'Loading menu...'"></app-api-loader>\r
    </div>\r
  \r
`, styles: ["/* src/app/features/menu/menu.component.css */\n.menu-toolbar {\n  display: flex;\n  gap: 8px;\n}\n.menu-search-input {\n  width: 220px;\n}\n.menu-category-filter {\n  width: 180px;\n}\n.menu-form-error {\n  color: var(--danger);\n}\n.menu-food-type-row {\n  display: flex;\n  gap: 16px;\n}\n.menu-checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.menu-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 16px;\n}\n.menu-item-card {\n  padding: 16px;\n}\n.menu-card-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n}\n.menu-food-badge {\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 4px;\n  margin-right: 6px;\n}\n.menu-chef-special {\n  font-size: 10px;\n  color: var(--accent-gold);\n}\n.menu-item-name {\n  font-weight: 700;\n  font-size: 14px;\n  margin-bottom: 4px;\n}\n.menu-item-description {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-bottom: 10px;\n}\n.menu-card-bottom {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.menu-item-price {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--accent-gold);\n}\n.menu-item-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.menu-delete-icon-btn {\n  border-color: rgba(239, 68, 68, 0.45);\n  color: #ef4444 !important;\n  background: rgba(239, 68, 68, 0.1);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 32px;\n}\n.menu-delete-icon-btn:hover:not(:disabled) {\n  background: rgba(239, 68, 68, 0.2);\n  border-color: #ef4444;\n}\n.menu-delete-icon-btn svg {\n  display: block;\n}\n.menu-delete-icon-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.menu-empty-state {\n  text-align: center;\n}\n.staff-pagination {\n  margin-top: 16px;\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=menu.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: MenuService }, { type: CategoryService }, { type: KitchenStationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MenuComponent, { className: "MenuComponent", filePath: "src/app/features/menu/menu.component.ts", lineNumber: 20 });
})();
export {
  MenuComponent
};
//# sourceMappingURL=chunk-3KLAJEDL.js.map
