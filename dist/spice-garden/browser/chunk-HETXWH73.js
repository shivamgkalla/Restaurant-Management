import {
  CustomerService
} from "./chunk-KMUJACNJ.js";
import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import "./chunk-YRUH6UFD.js";
import {
  ApiLoaderComponent
} from "./chunk-SWBXCHKP.js";
import {
  require_sweetalert2_all
} from "./chunk-KDHDQBKH.js";
import "./chunk-FJDPAPFN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
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
  AsyncPipe,
  BehaviorSubject,
  Component,
  LowerCasePipe,
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
  __toESM,
  combineLatest,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/customers/customers.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function CustomersComponent_ng_container_30_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span");
    \u0275\u0275pipe(10, "lowercase");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 16);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 17)(16, "button", 18);
    \u0275\u0275listener("click", function CustomersComponent_ng_container_30_tr_1_Template_button_click_16_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEditModal(c_r2));
    });
    \u0275\u0275text(17, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 19);
    \u0275\u0275listener("click", function CustomersComponent_ng_container_30_tr_1_Template_button_click_18_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDeleteCustomer(c_r2));
    });
    \u0275\u0275text(19, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.email || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("badge badge-", \u0275\u0275pipeBind1(10, 9, c_r2.type), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.notes || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.isLoadingCustomers);
  }
}
function CustomersComponent_ng_container_30_tr_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 20);
    \u0275\u0275text(2, "No records found");
    \u0275\u0275elementEnd()();
  }
}
function CustomersComponent_ng_container_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, CustomersComponent_ng_container_30_tr_1_Template, 20, 11, "tr", 13)(2, CustomersComponent_ng_container_30_tr_2_Template, 3, 0, "tr", 9);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const customers_r4 = ctx.ngIf;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", customers_r4);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isLoadingCustomers && customers_r4.length === 0);
  }
}
function CustomersComponent_div_42_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.name);
  }
}
function CustomersComponent_div_42_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.phone);
  }
}
function CustomersComponent_div_42_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.email);
  }
}
function CustomersComponent_div_42_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.dateOfBirth);
  }
}
function CustomersComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275listener("click", function CustomersComponent_div_42_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 23)(3, "h3");
    \u0275\u0275text(4, "Add Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function CustomersComponent_div_42_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 25)(8, "div", 26)(9, "label", 27);
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "span", 28);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.name, $event) || (ctx_r2.newCustomer.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.name = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CustomersComponent_div_42_div_14_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 31)(16, "div", 26)(17, "label", 27);
    \u0275\u0275text(18, "Phone ");
    \u0275\u0275elementStart(19, "span", 28);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 32);
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, CustomersComponent_div_42_div_22_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 26)(24, "label", 27);
    \u0275\u0275text(25, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 33);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.type, $event) || (ctx_r2.newCustomer.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(27, "option", 34);
    \u0275\u0275text(28, "New");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 35);
    \u0275\u0275text(30, "Regular");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 36);
    \u0275\u0275text(32, "VIP");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 26)(34, "label", 27);
    \u0275\u0275text(35, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.email, $event) || (ctx_r2.newCustomer.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_36_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.email = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, CustomersComponent_div_42_div_37_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 26)(39, "label", 27);
    \u0275\u0275text(40, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.address, $event) || (ctx_r2.newCustomer.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 26)(43, "label", 27);
    \u0275\u0275text(44, "Date of birth");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.dateOfBirth, $event) || (ctx_r2.newCustomer.dateOfBirth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_42_Template_input_ngModelChange_45_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.dateOfBirth = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(46, CustomersComponent_div_42_div_46_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 26)(48, "label", 27);
    \u0275\u0275text(49, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 40);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_42_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCustomer.notes, $event) || (ctx_r2.newCustomer.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "button", 41);
    \u0275\u0275listener("click", function CustomersComponent_div_42_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addCustomer());
    });
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.name);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.phone);
    \u0275\u0275property("ngModel", ctx_r2.newCustomer.phone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.type);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.email);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.address);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.dateOfBirth);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.dateOfBirth);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.dateOfBirth);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCustomer.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.isSubmitting ? "Creating\u2026" : "Create Customer");
  }
}
function CustomersComponent_div_43_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.name);
  }
}
function CustomersComponent_div_43_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.dateOfBirth);
  }
}
function CustomersComponent_div_43_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.phone);
  }
}
function CustomersComponent_div_43_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.email);
  }
}
function CustomersComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275listener("click", function CustomersComponent_div_43_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 23)(3, "h3");
    \u0275\u0275text(4, "Edit Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function CustomersComponent_div_43_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 25)(8, "div", 26)(9, "label", 27);
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "span", 28);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.name, $event) || (ctx_r2.editCustomer.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.name = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CustomersComponent_div_43_div_14_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 31)(16, "div", 26)(17, "label", 27);
    \u0275\u0275text(18, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.type, $event) || (ctx_r2.editCustomer.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 34);
    \u0275\u0275text(21, "New");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 35);
    \u0275\u0275text(23, "Regular");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 36);
    \u0275\u0275text(25, "VIP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 26)(27, "label", 27);
    \u0275\u0275text(28, "Date of birth");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.dateOfBirth, $event) || (ctx_r2.editCustomer.dateOfBirth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_29_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.dateOfBirth = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, CustomersComponent_div_43_div_30_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 26)(32, "label", 27);
    \u0275\u0275text(33, "Phone ");
    \u0275\u0275elementStart(34, "span", 28);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 46);
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEditPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, CustomersComponent_div_43_div_37_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 26)(39, "label", 27);
    \u0275\u0275text(40, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.email, $event) || (ctx_r2.editCustomer.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_41_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.email = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, CustomersComponent_div_43_div_42_Template, 2, 1, "div", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 26)(44, "label", 27);
    \u0275\u0275text(45, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.address, $event) || (ctx_r2.editCustomer.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 26)(48, "label", 27);
    \u0275\u0275text(49, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 49);
    \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_div_43_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCustomer.notes, $event) || (ctx_r2.editCustomer.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "button", 41);
    \u0275\u0275listener("click", function CustomersComponent_div_43_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateCustomer());
    });
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.name);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.type);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.dateOfBirth);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.dateOfBirth);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.dateOfBirth);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.phone);
    \u0275\u0275property("ngModel", ctx_r2.editCustomer.phone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.phone);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.email);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.address);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCustomer.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.isSubmitting ? "Updating\u2026" : "Update Customer");
  }
}
var CustomersComponent = class _CustomersComponent {
  state;
  toast;
  customerService;
  search$ = new BehaviorSubject("");
  customersSubject = new BehaviorSubject([]);
  customerApiIdByCode = /* @__PURE__ */ new Map();
  searchInput = "";
  appliedSearch = "";
  customers$;
  filteredCustomers$;
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  isLoadingCustomers = false;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCustomers = 0;
  newCustomer = {
    name: "",
    phone: "",
    email: "",
    address: "",
    dateOfBirth: "",
    type: "New",
    notes: ""
  };
  /** Inline messages for the add-customer modal */
  fieldErrors = {
    name: "",
    phone: "",
    email: "",
    dateOfBirth: ""
  };
  editCustomer = {
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    dateOfBirth: "",
    notes: "",
    type: "New"
  };
  editFieldErrors = {
    name: "",
    phone: "",
    email: "",
    dateOfBirth: ""
  };
  applySearch() {
    this.appliedSearch = this.searchInput.trim();
    this.search$.next(this.appliedSearch);
    this.loadCustomers(1);
  }
  get hasActiveSearch() {
    return !!this.appliedSearch;
  }
  clearSearch() {
    if (!this.searchInput && !this.appliedSearch)
      return;
    this.searchInput = "";
    this.appliedSearch = "";
    this.search$.next("");
    this.loadCustomers(1);
  }
  constructor(state, toast, customerService) {
    this.state = state;
    this.toast = toast;
    this.customerService = customerService;
  }
  ngOnInit() {
    this.customers$ = this.customersSubject.asObservable();
    this.filteredCustomers$ = combineLatest([this.customers$, this.search$]).pipe(map(([customers, q]) => {
      const lower = q.toLowerCase();
      return customers.filter((c) => !lower || c.name.toLowerCase().includes(lower) || c.phone.includes(lower));
    }));
    this.loadCustomers(1);
  }
  openAddModal() {
    this.newCustomer = {
      name: "",
      phone: "",
      email: "",
      address: "",
      dateOfBirth: "",
      type: "New",
      notes: ""
    };
    this.clearFieldErrors();
    this.showAddModal = true;
  }
  /** Keeps only digits, max length 10 */
  onPhoneInput(value) {
    this.newCustomer.phone = value.replace(/\D/g, "").slice(0, 10);
    if (this.fieldErrors.phone) {
      this.fieldErrors = __spreadProps(__spreadValues({}, this.fieldErrors), { phone: "" });
    }
  }
  addCustomer() {
    if (this.isSubmitting)
      return;
    if (!this.validateCreateForm())
      return;
    const name = this.newCustomer.name.trim();
    const phone = this.newCustomer.phone.trim();
    const dateOfBirthIso = this.newCustomer.dateOfBirth ? new Date(this.newCustomer.dateOfBirth).toISOString() : "";
    const payload = {
      name,
      phone,
      email: this.newCustomer.email.trim(),
      address: this.newCustomer.address.trim(),
      date_of_birth: dateOfBirthIso,
      notes: this.newCustomer.notes.trim(),
      customer_type: this.toApiCustomerType(this.newCustomer.type)
    };
    this.isSubmitting = true;
    this.customerService.createCustomer(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const status = res.status;
        if (status !== 200 && status !== 201) {
          this.toast.show(`Unexpected response (${status}). Customer may not have been saved.`, "warning");
          return;
        }
        const customer = this.mapCreatedCustomer(res.body, name, phone);
        this.toast.show(`Customer ${customer.name} added (${status})`, "success");
        this.showAddModal = false;
        this.loadCustomers(1);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || "Invalid customer data. Please check the fields and try again.";
          this.toast.show(`Error 400: ${apiMessage}`, "warning");
        } else if (err.status === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
        } else if (err.status === 0) {
          this.toast.show("Network error. Check your connection and API URL.", "error");
        } else {
          const apiMessage = err.error?.message || err.message || "Request failed.";
          this.toast.show(`Error ${err.status}: ${apiMessage}`, "error");
        }
      }
    });
  }
  openEditModal(customer) {
    this.editCustomer = {
      id: customer.id,
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      dateOfBirth: this.toDateInput(customer.dob),
      notes: customer.notes || "",
      type: customer.type
    };
    this.clearEditFieldErrors();
    this.showEditModal = true;
  }
  onEditPhoneInput(value) {
    this.editCustomer.phone = value.replace(/\D/g, "").slice(0, 10);
    if (this.editFieldErrors.phone) {
      this.editFieldErrors.phone = "";
    }
  }
  updateCustomer() {
    if (this.isSubmitting)
      return;
    if (!this.validateEditForm())
      return;
    const apiId = this.resolveApiCustomerId(this.editCustomer.id);
    if (apiId === null) {
      this.toast.show("Unable to update this customer: missing API id.", "error");
      return;
    }
    const payload = {
      name: this.editCustomer.name.trim(),
      phone: this.editCustomer.phone.trim(),
      email: this.editCustomer.email.trim(),
      address: this.editCustomer.address.trim(),
      date_of_birth: this.editCustomer.dateOfBirth ? new Date(this.editCustomer.dateOfBirth).toISOString() : "",
      notes: this.editCustomer.notes.trim(),
      customer_type: this.toApiCustomerType(this.editCustomer.type)
    };
    this.isSubmitting = true;
    this.customerService.updateCustomer(apiId, payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const statusCode = Number(response?.statusCode ?? 200);
        if (statusCode !== 200) {
          const apiMessage = response?.message || "Failed to update customer.";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
          return;
        }
        this.toast.show("Customer updated successfully", "success");
        this.showEditModal = false;
        this.loadCustomers(this.currentPage);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || "Invalid customer data. Please check the fields and try again.";
          this.toast.show(`Error 400: ${apiMessage}`, "warning");
        } else if (err.status === 409) {
          this.toast.show(`Error 409: ${err.error?.message || "Conflict while updating customer."}`, "warning");
        } else if (err.status === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
        } else if (err.status === 0) {
          this.toast.show("Network error. Check your connection and API URL.", "error");
        } else {
          const apiMessage = err.error?.message || err.message || "Request failed.";
          this.toast.show(`Error ${err.status}: ${apiMessage}`, "error");
        }
      }
    });
  }
  prevPage() {
    if (this.currentPage <= 1 || this.isLoadingCustomers)
      return;
    this.loadCustomers(this.currentPage - 1);
  }
  nextPage() {
    if (this.currentPage >= this.totalPages || this.isLoadingCustomers)
      return;
    this.loadCustomers(this.currentPage + 1);
  }
  onDeleteCustomer(customer) {
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the customer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      const apiId = this.resolveApiCustomerId(customer.id);
      if (apiId === null) {
        this.toast.show("Unable to delete this customer: missing API id.", "error");
        return;
      }
      const rowsOnPage = this.customersSubject.getValue().length;
      let reloadPage = this.currentPage;
      if (rowsOnPage === 1 && this.currentPage > 1) {
        reloadPage = this.currentPage - 1;
      }
      this.isLoadingCustomers = true;
      this.customerService.deleteCustomer(apiId).subscribe({
        next: (response) => {
          this.isLoadingCustomers = false;
          const body = response;
          const statusCode = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
          if (statusCode !== 200) {
            const apiMessage = body?.message || "Failed to delete customer.";
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
            return;
          }
          this.toast.show("Customer deleted successfully", "success");
          this.loadCustomers(reloadPage);
        },
        error: (err) => {
          this.isLoadingCustomers = false;
          if (err.status === 404) {
            this.toast.show(err.error?.message || "Customer not found.", "warning");
          } else if (err.status === 500) {
            this.toast.show("Error 500: Server error. Please try again later.", "error");
          } else if (err.status === 0) {
            this.toast.show("Network error. Check your connection and API URL.", "error");
          } else {
            const apiMessage = err.error?.message || err.message || "Request failed.";
            this.toast.show(`Error ${err.status}: ${apiMessage}`, "error");
          }
        }
      });
    });
  }
  loadCustomers(page) {
    this.isLoadingCustomers = true;
    this.customerService.customerPagination({
      page,
      page_size: this.pageSize,
      search: this.appliedSearch
    }).subscribe({
      next: (response) => {
        this.isLoadingCustomers = false;
        const statusCode = response?.statusCode;
        if (statusCode !== 200) {
          const msg = response?.message || "Failed to fetch customers.";
          this.toast.show(`Error ${statusCode ?? "N/A"}: ${msg}`, "warning");
          return;
        }
        const rows = Array.isArray(response.data) ? response.data : [];
        this.customerApiIdByCode.clear();
        rows.forEach((row) => this.customerApiIdByCode.set(row.customer_id, row.id));
        this.customersSubject.next(rows.map((row) => this.mapApiCustomer(row)));
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalPages = response.meta?.total_pages ?? 1;
        this.totalCustomers = response.meta?.total ?? rows.length;
      },
      error: (err) => {
        this.isLoadingCustomers = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || "Invalid pagination request.";
          this.toast.show(`Error 400: ${apiMessage}`, "warning");
        } else if (err.status === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
        } else if (err.status === 0) {
          this.toast.show("Network error. Check your connection and API URL.", "error");
        } else {
          const apiMessage = err.error?.message || err.message || "Request failed.";
          this.toast.show(`Error ${err.status}: ${apiMessage}`, "error");
        }
      }
    });
  }
  clearFieldErrors() {
    this.fieldErrors = { name: "", phone: "", email: "", dateOfBirth: "" };
  }
  clearEditFieldErrors() {
    this.editFieldErrors = { name: "", phone: "", email: "", dateOfBirth: "" };
  }
  validateCreateForm() {
    this.clearFieldErrors();
    const name = this.newCustomer.name.trim();
    const phoneDigits = this.newCustomer.phone.trim();
    const email = this.newCustomer.email.trim();
    if (!name) {
      this.fieldErrors.name = "Name is required.";
    }
    if (!phoneDigits) {
      this.fieldErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.fieldErrors.phone = "Enter exactly 10 digits.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.fieldErrors.email = "Enter a valid email address.";
    }
    if (this.newCustomer.dateOfBirth) {
      const dob = new Date(this.newCustomer.dateOfBirth);
      const endOfToday = /* @__PURE__ */ new Date();
      endOfToday.setHours(23, 59, 59, 999);
      if (Number.isNaN(dob.getTime())) {
        this.fieldErrors.dateOfBirth = "Invalid date.";
      } else if (dob > endOfToday) {
        this.fieldErrors.dateOfBirth = "Date of birth cannot be in the future.";
      }
    }
    const msg = this.fieldErrors.name || this.fieldErrors.phone || this.fieldErrors.email || this.fieldErrors.dateOfBirth;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  validateEditForm() {
    this.clearEditFieldErrors();
    const name = this.editCustomer.name.trim();
    const phoneDigits = this.editCustomer.phone.trim();
    const email = this.editCustomer.email.trim();
    if (!name) {
      this.editFieldErrors.name = "Name is required.";
    }
    if (!phoneDigits) {
      this.editFieldErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.editFieldErrors.phone = "Enter exactly 10 digits.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.editFieldErrors.email = "Enter a valid email address.";
    }
    if (this.editCustomer.dateOfBirth) {
      const dob = new Date(this.editCustomer.dateOfBirth);
      if (Number.isNaN(dob.getTime())) {
        this.editFieldErrors.dateOfBirth = "Invalid date.";
      }
    }
    const msg = this.editFieldErrors.name || this.editFieldErrors.phone || this.editFieldErrors.email || this.editFieldErrors.dateOfBirth;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  mapCreatedCustomer(body, fallbackName, fallbackPhone) {
    const raw = body;
    const d = raw?.["data"] ?? raw;
    const id = d && d["id"] != null ? String(d["id"]) : `C${String(this.state.snapshot.customers.length + 1).padStart(3, "0")}`;
    const dobRaw = d?.["date_of_birth"] ?? d?.["dob"] ?? this.newCustomer.dateOfBirth;
    const dob = typeof dobRaw === "string" ? dobRaw : dobRaw instanceof Date ? dobRaw.toISOString() : this.newCustomer.dateOfBirth ? new Date(this.newCustomer.dateOfBirth).toISOString() : "";
    const regSource = d?.["created_at"] ?? d?.["reg_date"] ?? d?.["registration_date"];
    const regDate = this.toYyyyMmDd(regSource) ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return {
      id,
      name: typeof d?.["name"] === "string" ? d["name"] : fallbackName,
      phone: typeof d?.["phone"] === "string" ? d["phone"] : fallbackPhone,
      email: typeof d?.["email"] === "string" ? d["email"] : this.newCustomer.email.trim(),
      address: typeof d?.["address"] === "string" ? d["address"] : this.newCustomer.address.trim(),
      dob,
      notes: typeof d?.["notes"] === "string" ? d["notes"] : this.newCustomer.notes.trim(),
      type: this.newCustomer.type,
      regDate,
      active: d?.["active"] !== false
    };
  }
  mapApiCustomer(row) {
    return {
      id: row.customer_id || String(row.id),
      name: row.name || "",
      phone: row.phone || "",
      email: row.email || "",
      address: row.address || "",
      dob: row.date_of_birth || "",
      notes: row.notes || "",
      type: this.toUiCustomerType(row.customer_type),
      regDate: this.toYyyyMmDd(row.registered_at) ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      active: row.is_active !== false
    };
  }
  toUiCustomerType(value) {
    const normalized = (value || "").toLowerCase();
    if (normalized === "regular")
      return "Regular";
    if (normalized === "vip")
      return "VIP";
    return "New";
  }
  toApiCustomerType(value) {
    if (value === "Regular")
      return "regular";
    if (value === "VIP")
      return "vip";
    return "new";
  }
  resolveApiCustomerId(customerId) {
    const byCode = this.customerApiIdByCode.get(customerId);
    if (typeof byCode === "number")
      return byCode;
    const parsed = Number(customerId);
    return Number.isFinite(parsed) ? parsed : null;
  }
  toDateInput(value) {
    if (!value)
      return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return "";
    return d.toISOString().slice(0, 10);
  }
  toYyyyMmDd(value) {
    if (value == null)
      return null;
    if (typeof value === "string") {
      const d = new Date(value);
      return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
    }
    if (value instanceof Date)
      return value.toISOString().slice(0, 10);
    return null;
  }
  static \u0275fac = function CustomersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomersComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(CustomerService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomersComponent, selectors: [["app-customers"]], decls: 44, vars: 16, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "search", "aria-label", "Search customers", "placeholder", "Search by name or phone\u2026", 1, "form-input", 2, "width", "240px", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "card", 2, "overflow-x", "auto"], [1, "data-table"], [4, "ngIf"], [1, "customers-pagination"], [3, "show", "fullscreen", "message"], ["class", "modal-backdrop", 4, "ngIf"], [4, "ngFor", "ngForOf"], [2, "font-weight", "600"], [2, "font-size", "12px", "color", "var(--text-muted)"], [2, "font-size", "11px", "color", "var(--text-secondary)", "max-width", "180px"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "6", 1, "customers-empty"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], ["aria-hidden", "true", 1, "form-req"], ["aria-label", "Customer name", "aria-required", "true", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "co-form-error", 4, "ngIf"], [1, "grid-2"], ["aria-label", "Customer phone", "aria-required", "true", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "placeholder", "10-digit number", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Customer type", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "New"], ["value", "Regular"], ["value", "VIP"], ["aria-label", "Customer email", "type", "email", "inputmode", "email", "placeholder", "optional", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Customer address", "placeholder", "optional", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Customer date of birth", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Customer notes", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "co-form-error"], ["aria-label", "Edit customer name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer type", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer date of birth", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer phone", "aria-required", "true", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "placeholder", "10-digit number", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer email", "type", "email", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer address", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit customer notes", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"]], template: function CustomersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Customer Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "div", 3)(8, "button", 4);
      \u0275\u0275listener("click", function CustomersComponent_Template_button_click_8_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(9, "+ Add Customer");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchInput, $event) || (ctx.searchInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function CustomersComponent_Template_input_keydown_enter_10_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function CustomersComponent_Template_button_click_11_listener() {
        return ctx.clearSearch();
      });
      \u0275\u0275text(12, "Clear");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(13, "div", 7)(14, "table", 8)(15, "thead")(16, "tr")(17, "th");
      \u0275\u0275text(18, "Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th");
      \u0275\u0275text(20, "Phone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th");
      \u0275\u0275text(22, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th");
      \u0275\u0275text(24, "Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th");
      \u0275\u0275text(26, "Notes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th");
      \u0275\u0275text(28, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "tbody");
      \u0275\u0275template(30, CustomersComponent_ng_container_30_Template, 3, 2, "ng-container", 9);
      \u0275\u0275pipe(31, "async");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 10)(33, "button", 6);
      \u0275\u0275listener("click", function CustomersComponent_Template_button_click_33_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(34, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 6);
      \u0275\u0275listener("click", function CustomersComponent_Template_button_click_39_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(40, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "app-api-loader", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(42, CustomersComponent_div_42_Template, 53, 21, "div", 12)(43, CustomersComponent_div_43_Template, 53, 21, "div", 12);
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.totalCustomers, " registered customers");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchInput);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.searchInput && !ctx.hasActiveSearch || ctx.isLoadingCustomers);
      \u0275\u0275advance(19);
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(31, 14, ctx.filteredCustomers$));
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.currentPage <= 1 || ctx.isLoadingCustomers);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.totalCustomers, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoadingCustomers);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.isLoadingCustomers)("fullscreen", true)("message", "Loading customers...");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
    }
  }, dependencies: [AsyncPipe, NgForOf, NgIf, LowerCasePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, ApiLoaderComponent], styles: ["\n\n.form-input.input-invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n.customers-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n  color: var(--text-secondary);\n}\n.customers-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 16px 8px;\n}\n/*# sourceMappingURL=customers.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomersComponent, [{
    type: Component,
    args: [{ selector: "app-customers", standalone: true, imports: [AsyncPipe, NgForOf, NgIf, LowerCasePipe, FormsModule, ApiLoaderComponent], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Customer Management</h2>\r
        <p>{{ totalCustomers }} registered customers</p>\r
      </div>\r
      <div class="section-header-right">\r
        <div style="display:flex;gap:8px">\r
          <button class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Customer</button>\r
          <input class="form-input" style="width:240px" type="search" aria-label="Search customers" [(ngModel)]="searchInput"\r
            (keydown.enter)="applySearch()" placeholder="Search by name or phone\u2026">\r
          <button class="btn btn-secondary btn-sm" (click)="clearSearch()" [disabled]="(!searchInput && !hasActiveSearch) || isLoadingCustomers">Clear</button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="card" style="overflow-x:auto">\r
      <table class="data-table">\r
        <thead>\r
          <tr><th>Name</th><th>Phone</th><th>Email</th><th>Type</th>\r
            <!-- <th>Reg. Date</th> -->\r
            <th>Notes</th><th>Actions</th></tr>\r
        </thead>\r
        <tbody>\r
          <ng-container *ngIf="filteredCustomers$ | async as customers">\r
            <tr *ngFor="let c of customers">\r
              <td>\r
                <div style="font-weight:600">{{ c.name }}</div>\r
              </td>\r
              <td>{{ c.phone }}</td>\r
              <td style="font-size:12px;color:var(--text-muted)">{{ c.email || '\u2014' }}</td>\r
              <td><span class="badge badge-{{ c.type | lowercase }}">{{ c.type }}</span></td>\r
              <!-- <td style="font-size:11px;color:var(--text-muted)">{{ c.regDate }}</td> -->\r
              <td style="font-size:11px;color:var(--text-secondary);max-width:180px">{{ c.notes || '\u2014' }}</td>\r
              <td>\r
                <div style="display:flex;gap:8px;flex-wrap:wrap">\r
                  <button type="button" class="btn btn-secondary btn-sm" (click)="openEditModal(c)">Edit</button>\r
                  <button type="button" class="btn btn-danger btn-sm" [disabled]="isLoadingCustomers" (click)="onDeleteCustomer(c)">Delete</button>\r
                </div>\r
              </td>\r
            </tr>\r
            <tr *ngIf="!isLoadingCustomers && customers.length === 0">\r
              <td colspan="6" class="customers-empty">No records found</td>\r
            </tr>\r
          </ng-container>\r
        </tbody>\r
      </table>\r
    </div>\r
    <div class="customers-pagination">\r
      <button class="btn btn-secondary btn-sm" [disabled]="currentPage <= 1 || isLoadingCustomers" (click)="prevPage()">Prev</button>\r
      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r
      <span>Total: {{ totalCustomers }}</span>\r
      <button class="btn btn-secondary btn-sm" [disabled]="currentPage >= totalPages || isLoadingCustomers" (click)="nextPage()">Next</button>\r
      <app-api-loader [show]="isLoadingCustomers" [fullscreen]="true" [message]="'Loading customers...'"></app-api-loader>\r
    </div>\r
\r
    <div *ngIf="showAddModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Add Customer</h3>\r
          <button class="modal-close" (click)="showAddModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Name <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="fieldErrors.name" aria-label="Customer name" aria-required="true"\r
              [(ngModel)]="newCustomer.name" (ngModelChange)="fieldErrors.name = ''">\r
            <div *ngIf="fieldErrors.name" class="co-form-error">{{ fieldErrors.name }}</div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Phone <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="fieldErrors.phone" aria-label="Customer phone" aria-required="true"\r
                inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit number"\r
                [ngModel]="newCustomer.phone" (ngModelChange)="onPhoneInput($event)">\r
              <div *ngIf="fieldErrors.phone" class="co-form-error">{{ fieldErrors.phone }}</div>\r
            </div>\r
            <div class="form-group"><label class="form-label">Type</label>\r
              <select class="form-select" aria-label="Customer type" [(ngModel)]="newCustomer.type">\r
                <option value="New">New</option><option value="Regular">Regular</option><option value="VIP">VIP</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Email</label>\r
            <input class="form-input" [class.input-invalid]="fieldErrors.email" aria-label="Customer email" type="email" inputmode="email"\r
              [(ngModel)]="newCustomer.email" (ngModelChange)="fieldErrors.email = ''" placeholder="optional">\r
            <div *ngIf="fieldErrors.email" class="co-form-error">{{ fieldErrors.email }}</div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Address</label><input class="form-input" aria-label="Customer address" [(ngModel)]="newCustomer.address" placeholder="optional"></div>\r
          <div class="form-group">\r
            <label class="form-label">Date of birth</label>\r
            <input class="form-input" [class.input-invalid]="fieldErrors.dateOfBirth" aria-label="Customer date of birth" type="date"\r
              [(ngModel)]="newCustomer.dateOfBirth" (ngModelChange)="fieldErrors.dateOfBirth = ''">\r
            <div *ngIf="fieldErrors.dateOfBirth" class="co-form-error">{{ fieldErrors.dateOfBirth }}</div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" aria-label="Customer notes" rows="2" [(ngModel)]="newCustomer.notes"></textarea></div>\r
          <button class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="addCustomer()">{{ isSubmitting ? 'Creating\u2026' : 'Create Customer' }}</button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showEditModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Edit Customer</h3>\r
          <button class="modal-close" (click)="showEditModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Name <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="editFieldErrors.name" aria-label="Edit customer name"\r
              [(ngModel)]="editCustomer.name" (ngModelChange)="editFieldErrors.name = ''">\r
            <div *ngIf="editFieldErrors.name" class="co-form-error">{{ editFieldErrors.name }}</div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group"><label class="form-label">Type</label>\r
              <select class="form-select" aria-label="Edit customer type" [(ngModel)]="editCustomer.type">\r
                <option value="New">New</option><option value="Regular">Regular</option><option value="VIP">VIP</option>\r
              </select>\r
            </div>\r
            <div class="form-group"><label class="form-label">Date of birth</label>\r
              <input class="form-input" [class.input-invalid]="editFieldErrors.dateOfBirth" aria-label="Edit customer date of birth"\r
                type="date" [(ngModel)]="editCustomer.dateOfBirth" (ngModelChange)="editFieldErrors.dateOfBirth = ''">\r
              <div *ngIf="editFieldErrors.dateOfBirth" class="co-form-error">{{ editFieldErrors.dateOfBirth }}</div>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Phone <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="editFieldErrors.phone" aria-label="Edit customer phone" aria-required="true"\r
              inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit number"\r
              [ngModel]="editCustomer.phone" (ngModelChange)="onEditPhoneInput($event)">\r
            <div *ngIf="editFieldErrors.phone" class="co-form-error">{{ editFieldErrors.phone }}</div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Email</label>\r
            <input class="form-input" [class.input-invalid]="editFieldErrors.email" aria-label="Edit customer email"\r
              type="email" [(ngModel)]="editCustomer.email" (ngModelChange)="editFieldErrors.email = ''">\r
            <div *ngIf="editFieldErrors.email" class="co-form-error">{{ editFieldErrors.email }}</div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Address</label><input class="form-input" aria-label="Edit customer address" [(ngModel)]="editCustomer.address"></div>\r
          <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" aria-label="Edit customer notes" rows="2" [(ngModel)]="editCustomer.notes"></textarea></div>\r
          <button class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="updateCustomer()">{{ isSubmitting ? 'Updating\u2026' : 'Update Customer' }}</button>\r
        </div>\r
      </div>\r
    </div>\r
  \r
`, styles: ["/* src/app/features/customers/customers.component.css */\n.form-input.input-invalid {\n  border-color: var(--danger);\n}\n.customers-pagination {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n  color: var(--text-secondary);\n}\n.customers-empty {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 16px 8px;\n}\n/*# sourceMappingURL=customers.component.css.map */\n"] }]
  }], () => [{ type: StateService }, { type: ToastService }, { type: CustomerService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomersComponent, { className: "CustomersComponent", filePath: "src/app/features/customers/customers.component.ts", lineNumber: 21 });
})();
export {
  CustomersComponent
};
//# sourceMappingURL=chunk-HETXWH73.js.map
