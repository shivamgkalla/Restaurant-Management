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
  Component,
  Injectable,
  LowerCasePipe,
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
  __toESM,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceSVG,
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

// src/app/features/staff/staff.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());

// src/app/core/services/staff.service.ts
var StaffService = class _StaffService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  /** GET /staff/?page=&limit=&search= */
  staffPagination(params) {
    const q = new URLSearchParams();
    q.set("page", String(Math.max(1, params.page)));
    q.set("limit", String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set("search", search);
    }
    return this.genricService.Get(`staff/?${q.toString()}`);
  }
  createStaff(payload) {
    return this.genricService.Post("staff", payload, { observe: "response" });
  }
  /** PUT /staff/{staff_id} — observe full response for HTTP status + body statusCode */
  editStaff(staffId, payload) {
    return this.genricService.PutWithResponse(`staff/${staffId}`, payload);
  }
  /** DELETE /staff/{staff_id} */
  deleteStaffById(staffId) {
    return this.genricService.DeleteRequest(`staff/${staffId}`);
  }
  static \u0275fac = function StaffService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StaffService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StaffService, factory: _StaffService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StaffService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

// src/app/features/staff/staff.component.ts
function StaffComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 15)(5, "div")(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "td")(11, "span");
    \u0275\u0275pipe(12, "lowercase");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 18);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 17);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td")(21, "div", 19)(22, "button", 6);
    \u0275\u0275listener("click", function StaffComponent_tr_34_Template_button_click_22_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(s_r2));
    });
    \u0275\u0275text(23, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 20);
    \u0275\u0275listener("click", function StaffComponent_tr_34_Template_button_click_24_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDeleteStaff(s_r2));
    });
    \u0275\u0275text(25, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.employeeId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("badge badge-", \u0275\u0275pipeBind1(12, 12, s_r2.role), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.doj || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.deletingRecordId !== null || ctx_r2.isSubmitting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.deletingRecordId === s_r2.recordId || ctx_r2.isSubmitting || ctx_r2.isLoadingStaff);
  }
}
function StaffComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 21);
    \u0275\u0275text(2, "Data not found");
    \u0275\u0275elementEnd()();
  }
}
function StaffComponent_div_46_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.name);
  }
}
function StaffComponent_div_46_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", r_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r5);
  }
}
function StaffComponent_div_46_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.username);
  }
}
function StaffComponent_div_46_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.phone);
  }
}
function StaffComponent_div_46_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.email);
  }
}
function StaffComponent_div_46__svg_svg_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 53)(2, "circle", 54);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_46__svg_svg_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 55)(2, "line", 56);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_46_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.password);
  }
}
function StaffComponent_div_46__svg_svg_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 53)(2, "circle", 54);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_46__svg_svg_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 55)(2, "line", 56);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_46_div_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.confirmPassword);
  }
}
function StaffComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275listener("click", function StaffComponent_div_46_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 24)(3, "h3");
    \u0275\u0275text(4, "Add Staff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function StaffComponent_div_46_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 26)(8, "div", 27)(9, "label", 28);
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "span", 29);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.name, $event) || (ctx_r2.newStaff.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.name = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, StaffComponent_div_46_div_14_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 32)(16, "div", 27)(17, "label", 28);
    \u0275\u0275text(18, "Role ");
    \u0275\u0275elementStart(19, "span", 29);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "select", 33);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.role, $event) || (ctx_r2.newStaff.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(22, StaffComponent_div_46_option_22_Template, 2, 2, "option", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 27)(24, "label", 28);
    \u0275\u0275text(25, "Username ");
    \u0275\u0275elementStart(26, "span", 29);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.username, $event) || (ctx_r2.newStaff.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.username = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, StaffComponent_div_46_div_29_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 32)(31, "div", 27)(32, "label", 28);
    \u0275\u0275text(33, "Phone ");
    \u0275\u0275elementStart(34, "span", 29);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 36);
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, StaffComponent_div_46_div_37_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 27)(39, "label", 28);
    \u0275\u0275text(40, "Email ");
    \u0275\u0275elementStart(41, "span", 29);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.email, $event) || (ctx_r2.newStaff.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_43_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.email = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(44, StaffComponent_div_46_div_44_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 32)(46, "div", 27)(47, "label", 28);
    \u0275\u0275text(48, "Password ");
    \u0275\u0275elementStart(49, "span", 29);
    \u0275\u0275text(50, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 38)(52, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.password, $event) || (ctx_r2.newStaff.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_52_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.fieldErrors.password = "";
      return \u0275\u0275resetView(ctx_r2.fieldErrors.confirmPassword = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 40);
    \u0275\u0275listener("click", function StaffComponent_div_46_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddPassword = !ctx_r2.showAddPassword);
    });
    \u0275\u0275elementStart(54, "span", 41);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275template(56, StaffComponent_div_46__svg_svg_56_Template, 3, 0, "svg", 42)(57, StaffComponent_div_46__svg_svg_57_Template, 3, 0, "svg", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(58, StaffComponent_div_46_div_58_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 27)(60, "label", 28);
    \u0275\u0275text(61, "Confirm password ");
    \u0275\u0275elementStart(62, "span", 29);
    \u0275\u0275text(63, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 38)(65, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.confirmPassword, $event) || (ctx_r2.newStaff.confirmPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_65_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fieldErrors.confirmPassword = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 44);
    \u0275\u0275listener("click", function StaffComponent_div_46_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddConfirmPassword = !ctx_r2.showAddConfirmPassword);
    });
    \u0275\u0275elementStart(67, "span", 41);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275template(69, StaffComponent_div_46__svg_svg_69_Template, 3, 0, "svg", 42)(70, StaffComponent_div_46__svg_svg_70_Template, 3, 0, "svg", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(71, StaffComponent_div_46_div_71_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 27)(73, "label", 28);
    \u0275\u0275text(74, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_75_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.address, $event) || (ctx_r2.newStaff.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 32)(77, "div", 27)(78, "label", 28);
    \u0275\u0275text(79, "Date of joining");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_80_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.dateOfJoining, $event) || (ctx_r2.newStaff.dateOfJoining = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 27)(82, "label", 28);
    \u0275\u0275text(83, "Emergency contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_input_ngModelChange_84_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.emergencyContact, $event) || (ctx_r2.newStaff.emergencyContact = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(85, "div", 27)(86, "label", 28);
    \u0275\u0275text(87, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "textarea", 48);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_46_Template_textarea_ngModelChange_88_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStaff.notes, $event) || (ctx_r2.newStaff.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "button", 49);
    \u0275\u0275listener("click", function StaffComponent_div_46_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addStaff());
    });
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.role);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.roles);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.username);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.username);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.username);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.phone);
    \u0275\u0275property("ngModel", ctx_r2.newStaff.phone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.phone);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.email);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.email);
    \u0275\u0275advance(8);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.password);
    \u0275\u0275property("type", ctx_r2.showAddPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.password);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.showAddPassword ? "Hide password" : "Show password")("aria-pressed", ctx_r2.showAddPassword);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.showAddPassword ? "Hide" : "Show", " password");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.showAddPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.showAddPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.password);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.confirmPassword);
    \u0275\u0275property("type", ctx_r2.showAddConfirmPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.confirmPassword);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.showAddConfirmPassword ? "Hide confirm password" : "Show confirm password")("aria-pressed", ctx_r2.showAddConfirmPassword);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.showAddConfirmPassword ? "Hide" : "Show", " confirm password");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.showAddConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.showAddConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.confirmPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.address);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.dateOfJoining);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.emergencyContact);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStaff.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Creating\u2026" : "Create Staff", " ");
  }
}
function StaffComponent_div_47_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.name);
  }
}
function StaffComponent_div_47_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", r_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r7);
  }
}
function StaffComponent_div_47_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.username);
  }
}
function StaffComponent_div_47_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.phone);
  }
}
function StaffComponent_div_47_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.email);
  }
}
function StaffComponent_div_47__svg_svg_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 53)(2, "circle", 54);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_47__svg_svg_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 55)(2, "line", 56);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_47_div_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.password);
  }
}
function StaffComponent_div_47__svg_svg_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 53)(2, "circle", 54);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_47__svg_svg_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 52);
    \u0275\u0275element(1, "path", 55)(2, "line", 56);
    \u0275\u0275elementEnd();
  }
}
function StaffComponent_div_47_div_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.confirmPassword);
  }
}
function StaffComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275listener("click", function StaffComponent_div_47_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 24)(3, "h3");
    \u0275\u0275text(4, "Edit Staff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function StaffComponent_div_47_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 26)(8, "div", 27)(9, "label", 28);
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "span", 29);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.name, $event) || (ctx_r2.editStaff.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.name = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, StaffComponent_div_47_div_14_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 32)(16, "div", 27)(17, "label", 28);
    \u0275\u0275text(18, "Role ");
    \u0275\u0275elementStart(19, "span", 29);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.role, $event) || (ctx_r2.editStaff.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(22, StaffComponent_div_47_option_22_Template, 2, 2, "option", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 27)(24, "label", 28);
    \u0275\u0275text(25, "Username ");
    \u0275\u0275elementStart(26, "span", 29);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.username, $event) || (ctx_r2.editStaff.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_28_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.username = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, StaffComponent_div_47_div_29_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 32)(31, "div", 27)(32, "label", 28);
    \u0275\u0275text(33, "Phone ");
    \u0275\u0275elementStart(34, "span", 29);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 60);
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEditPhoneInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, StaffComponent_div_47_div_37_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 27)(39, "label", 28);
    \u0275\u0275text(40, "Email ");
    \u0275\u0275elementStart(41, "span", 29);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.email, $event) || (ctx_r2.editStaff.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_43_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.email = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(44, StaffComponent_div_47_div_44_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 32)(46, "div", 27)(47, "label", 28);
    \u0275\u0275text(48, "New password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 38)(50, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.password, $event) || (ctx_r2.editStaff.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_50_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.editFieldErrors.password = "";
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.confirmPassword = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 40);
    \u0275\u0275listener("click", function StaffComponent_div_47_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditPassword = !ctx_r2.showEditPassword);
    });
    \u0275\u0275elementStart(52, "span", 41);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275template(54, StaffComponent_div_47__svg_svg_54_Template, 3, 0, "svg", 42)(55, StaffComponent_div_47__svg_svg_55_Template, 3, 0, "svg", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(56, StaffComponent_div_47_div_56_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 27)(58, "label", 28);
    \u0275\u0275text(59, "Confirm new password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 38)(61, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.confirmPassword, $event) || (ctx_r2.editStaff.confirmPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_61_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editFieldErrors.confirmPassword = "");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 44);
    \u0275\u0275listener("click", function StaffComponent_div_47_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditConfirmPassword = !ctx_r2.showEditConfirmPassword);
    });
    \u0275\u0275elementStart(63, "span", 41);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275template(65, StaffComponent_div_47__svg_svg_65_Template, 3, 0, "svg", 42)(66, StaffComponent_div_47__svg_svg_66_Template, 3, 0, "svg", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(67, StaffComponent_div_47_div_67_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 27)(69, "label", 28);
    \u0275\u0275text(70, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.address, $event) || (ctx_r2.editStaff.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 27)(73, "label", 28);
    \u0275\u0275text(74, "Emergency contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_input_ngModelChange_75_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.emergencyContact, $event) || (ctx_r2.editStaff.emergencyContact = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 27)(77, "label", 28);
    \u0275\u0275text(78, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "textarea", 66);
    \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_div_47_Template_textarea_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStaff.notes, $event) || (ctx_r2.editStaff.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "button", 49);
    \u0275\u0275listener("click", function StaffComponent_div_47_Template_button_click_80_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitStaffEdit());
    });
    \u0275\u0275text(81);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.role);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.roles);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.username);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.username);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.username);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.phone);
    \u0275\u0275property("ngModel", ctx_r2.editStaff.phone);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.phone);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.email);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.email);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.password);
    \u0275\u0275property("type", ctx_r2.showEditPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.password);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.showEditPassword ? "Hide password" : "Show password")("aria-pressed", ctx_r2.showEditPassword);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.showEditPassword ? "Hide" : "Show", " password");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.showEditPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.showEditPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.password);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.confirmPassword);
    \u0275\u0275property("type", ctx_r2.showEditConfirmPassword ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.confirmPassword);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r2.showEditConfirmPassword ? "Hide confirm password" : "Show confirm password")("aria-pressed", ctx_r2.showEditConfirmPassword);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.showEditConfirmPassword ? "Hide" : "Show", " confirm password");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.showEditConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.showEditConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.confirmPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.address);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.emergencyContact);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStaff.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Saving\u2026" : "Update Staff", " ");
  }
}
var ROLE_TO_ID = {
  Admin: 1,
  Captain: 2,
  Cashier: 3,
  Manager: 4,
  Kitchen: 5
};
var ID_TO_ROLE = /* @__PURE__ */ new Map([
  [1, "Admin"],
  [2, "Captain"],
  [3, "Cashier"],
  [4, "Manager"],
  [5, "Kitchen"]
]);
var StaffComponent = class _StaffComponent {
  toast;
  staffService;
  staffRows = [];
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  isLoadingStaff = false;
  deletingRecordId = null;
  searchInput = "";
  appliedSearch = "";
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  newStaff = {
    employeeId: "",
    name: "",
    role: "Captain",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    dateOfJoining: "",
    emergencyContact: "",
    notes: ""
  };
  /** Add-staff modal: toggle password field visibility */
  showAddPassword = false;
  showAddConfirmPassword = false;
  /** Edit-staff modal: toggle password field visibility */
  showEditPassword = false;
  showEditConfirmPassword = false;
  editStaff = {
    recordId: 0,
    employeeId: "",
    name: "",
    role: "Captain",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    emergencyContact: "",
    notes: ""
  };
  fieldErrors = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  };
  editFieldErrors = {
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  };
  roles = ["Admin", "Manager", "Captain", "Cashier", "Kitchen"];
  get showStaffLoader() {
    return this.isLoadingStaff || this.isSubmitting || this.deletingRecordId !== null;
  }
  get hasActiveSearch() {
    return !!this.appliedSearch;
  }
  constructor(toast, staffService) {
    this.toast = toast;
    this.staffService = staffService;
  }
  ngOnInit() {
    this.loadStaff(1);
  }
  initials(name) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }
  applySearch() {
    this.appliedSearch = this.searchInput.trim();
    this.loadStaff(1);
  }
  clearSearch() {
    if (!this.searchInput && !this.appliedSearch)
      return;
    this.searchInput = "";
    this.appliedSearch = "";
    this.loadStaff(1);
  }
  prevPage() {
    if (this.currentPage <= 1 || this.isLoadingStaff)
      return;
    this.loadStaff(this.currentPage - 1);
  }
  nextPage() {
    if (this.currentPage >= this.totalPages || this.isLoadingStaff)
      return;
    this.loadStaff(this.currentPage + 1);
  }
  loadStaff(page) {
    this.isLoadingStaff = true;
    this.staffService.staffPagination({
      page,
      limit: this.pageSize,
      search: this.appliedSearch || void 0
    }).subscribe({
      next: (response) => {
        this.isLoadingStaff = false;
        const statusCode = response?.statusCode;
        if (statusCode !== void 0 && statusCode !== 200) {
          const msg = response?.message || "Failed to load staff.";
          this.toast.show(`Error ${statusCode}: ${msg}`, "warning");
          this.staffRows = [];
          return;
        }
        const rows = Array.isArray(response.data) ? response.data : [];
        this.staffRows = rows.map((r) => this.mapApiItemToRow(r));
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalRecords = response.meta?.total ?? rows.length;
        this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
      },
      error: (err) => {
        this.isLoadingStaff = false;
        this.staffRows = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load staff.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  openAddModal() {
    this.newStaff = {
      employeeId: "",
      name: "",
      role: "Captain",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      dateOfJoining: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      emergencyContact: "",
      notes: ""
    };
    this.showAddPassword = false;
    this.showAddConfirmPassword = false;
    this.clearFieldErrors();
    this.showAddModal = true;
  }
  onPhoneInput(value) {
    this.newStaff.phone = value.replace(/\D/g, "").slice(0, 10);
    if (this.fieldErrors.phone) {
      this.fieldErrors = __spreadProps(__spreadValues({}, this.fieldErrors), { phone: "" });
    }
  }
  onEditPhoneInput(value) {
    this.editStaff.phone = value.replace(/\D/g, "").slice(0, 10);
    if (this.editFieldErrors.phone) {
      this.editFieldErrors.phone = "";
    }
  }
  openEditModal(row) {
    this.editStaff = {
      recordId: row.recordId,
      employeeId: row.employeeId,
      name: row.name,
      role: row.role,
      username: row.username,
      phone: row.phone,
      email: row.email,
      password: "",
      confirmPassword: "",
      address: row.address,
      emergencyContact: row.emergencyContact,
      notes: row.notes
    };
    this.showEditPassword = false;
    this.showEditConfirmPassword = false;
    this.clearEditFieldErrors();
    this.showEditModal = true;
  }
  submitStaffEdit() {
    if (this.isSubmitting)
      return;
    if (!this.validateEditForm())
      return;
    const payload = {
      name: this.editStaff.name.trim(),
      phone: this.editStaff.phone.trim(),
      email: this.editStaff.email.trim(),
      address: this.editStaff.address.trim(),
      emergency_contact: this.editStaff.emergencyContact.trim(),
      notes: this.editStaff.notes.trim(),
      role_id: ROLE_TO_ID[this.editStaff.role],
      username: this.editStaff.username.trim(),
      password: this.editStaff.password.trim()
    };
    this.isSubmitting = true;
    this.staffService.editStaff(this.editStaff.recordId, payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const httpStatus = res.status;
        const body = res.body;
        if (httpStatus < 200 || httpStatus >= 300) {
          const msg = body?.message || `Request failed (${httpStatus}).`;
          this.toast.show(`Error ${httpStatus}: ${msg}`, "error");
          return;
        }
        const businessCode = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
        if (businessCode !== 200) {
          const msg = body?.message || "Failed to update staff.";
          this.toast.show(`Error ${businessCode}: ${msg}`, "warning");
          return;
        }
        this.toast.show(body?.message || "Staff updated successfully", "success");
        this.showEditModal = false;
        this.loadStaff(this.currentPage);
      },
      error: (err) => {
        this.isSubmitting = false;
        const nested = err.error;
        const businessCode = nested?.statusCode ?? err.status;
        const apiMessage = nested?.message || err.error?.message || err.error?.errors?.[0] || err.message || "Failed to update staff.";
        const prefix = businessCode ? `Error ${businessCode}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  onDeleteStaff(row) {
    if (this.deletingRecordId !== null || this.isSubmitting || this.isLoadingStaff)
      return;
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will permanently delete staff member "${row.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      const rowsOnPage = this.staffRows.length;
      let reloadPage = this.currentPage;
      if (rowsOnPage === 1 && this.currentPage > 1) {
        reloadPage = this.currentPage - 1;
      }
      this.deletingRecordId = row.recordId;
      this.staffService.deleteStaffById(row.recordId).subscribe({
        next: (response) => {
          this.deletingRecordId = null;
          const body = response;
          const code = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
          if (code !== 200) {
            this.toast.show(body?.message || `Delete failed (${code})`, "warning");
            return;
          }
          this.toast.show(`Staff "${row.name}" deleted`, "success");
          this.loadStaff(reloadPage);
        },
        error: (err) => {
          this.deletingRecordId = null;
          const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to delete staff.";
          const prefix = err.status ? `Error ${err.status}: ` : "";
          this.toast.show(`${prefix}${apiMessage}`, "error");
        }
      });
    });
  }
  addStaff() {
    if (this.isSubmitting)
      return;
    if (!this.validateCreateForm())
      return;
    const name = this.newStaff.name.trim();
    const username = this.newStaff.username.trim();
    const phone = this.newStaff.phone.trim();
    const email = this.newStaff.email.trim();
    const employeeId = this.newStaff.employeeId.trim() || `EMP-${Date.now().toString(36).toUpperCase()}`;
    const dateOfJoiningIso = this.newStaff.dateOfJoining ? new Date(this.newStaff.dateOfJoining).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
    const payload = {
      employee_id: employeeId,
      name,
      phone,
      email,
      address: this.newStaff.address.trim(),
      date_of_joining: dateOfJoiningIso,
      emergency_contact: this.newStaff.emergencyContact.trim(),
      notes: this.newStaff.notes.trim(),
      role_id: ROLE_TO_ID[this.newStaff.role],
      username,
      password: this.newStaff.password
    };
    this.isSubmitting = true;
    this.staffService.createStaff(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const status = res.status;
        if (status !== 200 && status !== 201) {
          this.toast.show(`Unexpected response (${status}). Staff may not have been saved.`, "warning");
          return;
        }
        this.toast.show(`Staff ${name} added (${status})`, "success");
        this.showAddModal = false;
        this.loadStaff(1);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || "Invalid staff data. Please check the fields and try again.";
          this.toast.show(`Error 400: ${apiMessage}`, "warning");
        } else if (err.status === 403) {
          this.toast.show(err.error?.message || "Only administrators can create staff.", "warning");
        } else if (err.status === 409) {
          this.toast.show(err.error?.message || "Username or employee id already exists.", "warning");
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
  mapApiItemToRow(item) {
    return {
      recordId: item.id,
      employeeId: item.employee_id,
      name: item.name ?? "",
      role: this.roleFromApi(item),
      username: item.username ?? "",
      phone: item.phone ?? "",
      email: item.email ?? "",
      doj: item.date_of_joining ? item.date_of_joining.slice(0, 10) : "",
      status: item.is_active ? "Active" : "Inactive",
      address: item.address ?? "",
      emergencyContact: item.emergency_contact ?? "",
      notes: item.notes ?? ""
    };
  }
  roleFromApi(item) {
    const byId = ID_TO_ROLE.get(item.role_id);
    if (byId)
      return byId;
    const raw = (item.role?.name ?? "").toLowerCase();
    if (raw === "admin")
      return "Admin";
    if (raw === "manager")
      return "Manager";
    if (raw === "captain")
      return "Captain";
    if (raw === "cashier")
      return "Cashier";
    if (raw === "kitchen")
      return "Kitchen";
    return "Captain";
  }
  clearFieldErrors() {
    this.fieldErrors = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    };
  }
  clearEditFieldErrors() {
    this.editFieldErrors = {
      name: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }
  validateCreateForm() {
    this.clearFieldErrors();
    const name = this.newStaff.name.trim();
    const phoneDigits = this.newStaff.phone.trim();
    const email = this.newStaff.email.trim();
    const password = this.newStaff.password;
    const confirmPassword = this.newStaff.confirmPassword;
    const username = this.newStaff.username.trim();
    if (!name) {
      this.fieldErrors.name = "Name is required.";
    }
    if (!phoneDigits) {
      this.fieldErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.fieldErrors.phone = "Enter exactly 10 digits.";
    }
    if (!email) {
      this.fieldErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.fieldErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      this.fieldErrors.password = "Password is required.";
    } else if (password.length < 6) {
      this.fieldErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      this.fieldErrors.confirmPassword = "Please confirm your password.";
    } else if (password && confirmPassword !== password) {
      this.fieldErrors.confirmPassword = "Passwords do not match.";
    }
    if (!username) {
      this.fieldErrors.username = "Username is required.";
    }
    const msg = this.fieldErrors.name || this.fieldErrors.phone || this.fieldErrors.email || this.fieldErrors.password || this.fieldErrors.confirmPassword || this.fieldErrors.username;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  validateEditForm() {
    this.clearEditFieldErrors();
    const name = this.editStaff.name.trim();
    const phoneDigits = this.editStaff.phone.trim();
    const email = this.editStaff.email.trim();
    const username = this.editStaff.username.trim();
    const pwdT = this.editStaff.password.trim();
    const confT = this.editStaff.confirmPassword.trim();
    if (!name) {
      this.editFieldErrors.name = "Name is required.";
    }
    if (!phoneDigits) {
      this.editFieldErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length !== 10 || !/^\d{10}$/.test(phoneDigits)) {
      this.editFieldErrors.phone = "Enter exactly 10 digits.";
    }
    if (!email) {
      this.editFieldErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.editFieldErrors.email = "Enter a valid email address.";
    }
    if (!username) {
      this.editFieldErrors.username = "Username is required.";
    }
    const wantsChange = !!pwdT || !!confT;
    if (wantsChange) {
      if (!pwdT) {
        this.editFieldErrors.password = "Enter a new password or clear both password fields.";
      } else if (pwdT.length < 6) {
        this.editFieldErrors.password = "Password must be at least 6 characters.";
      }
      if (!confT) {
        this.editFieldErrors.confirmPassword = "Please confirm your new password.";
      } else if (pwdT && confT !== pwdT) {
        this.editFieldErrors.confirmPassword = "Passwords do not match.";
      }
    }
    const msg = this.editFieldErrors.name || this.editFieldErrors.phone || this.editFieldErrors.email || this.editFieldErrors.username || this.editFieldErrors.password || this.editFieldErrors.confirmPassword;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  static \u0275fac = function StaffComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StaffComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(StaffService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StaffComponent, selectors: [["app-staff"]], decls: 48, vars: 16, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap", "align-items", "center"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "search", "aria-label", "Search staff", "placeholder", "Search\u2026", 1, "form-input", 2, "width", "220px", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "card", 2, "overflow-x", "auto"], [1, "data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "staff-pagination"], [3, "show", "fullscreen", "message"], ["class", "modal-backdrop", 4, "ngIf"], [2, "font-family", "var(--font-mono)", "font-size", "11px"], [2, "display", "flex", "align-items", "center", "gap", "10px"], [2, "font-weight", "600"], [2, "font-size", "11px", "color", "var(--text-muted)"], [2, "font-family", "var(--font-mono)", "font-size", "12px"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "8", 1, "staff-table-empty"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], ["type", "button", 1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], ["aria-hidden", "true", 1, "form-req"], ["aria-label", "Staff name", "aria-required", "true", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "co-form-error", 4, "ngIf"], [1, "grid-2"], ["aria-label", "Staff role", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["aria-label", "Staff username", "aria-required", "true", "autocomplete", "username", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Staff phone", "aria-required", "true", "inputmode", "numeric", "maxlength", "10", "autocomplete", "tel", "placeholder", "10-digit number", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Staff email", "type", "email", "aria-required", "true", "autocomplete", "email", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "password-input-wrap"], ["aria-label", "Staff password", "aria-required", "true", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "ngModel"], ["type", "button", "title", "Toggle password visibility", 1, "password-toggle", 3, "click"], [1, "sr-only"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 4, "ngIf"], ["aria-label", "Confirm password", "aria-required", "true", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "ngModel"], ["type", "button", "title", "Toggle confirm password visibility", 1, "password-toggle", 3, "click"], ["aria-label", "Staff address", "placeholder", "optional", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Date of joining", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Emergency contact", "placeholder", "optional", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Staff notes", "rows", "2", "placeholder", "optional", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "co-form-error"], [3, "ngValue"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["d", "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["aria-label", "Edit staff name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit staff role", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit username", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit phone", "inputmode", "numeric", "maxlength", "10", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "aria-label", "Edit email", 1, "form-input", 3, "ngModelChange", "ngModel"], ["autocomplete", "new-password", "aria-label", "New password optional", "placeholder", "Leave blank to keep", 1, "form-input", 3, "ngModelChange", "type", "ngModel"], ["autocomplete", "new-password", "aria-label", "Confirm new password", "placeholder", "Match new password if changing", 1, "form-input", 3, "ngModelChange", "type", "ngModel"], ["aria-label", "Edit address", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit emergency contact", 1, "form-input", 3, "ngModelChange", "ngModel"], ["rows", "2", "aria-label", "Edit notes", 1, "form-textarea", 3, "ngModelChange", "ngModel"]], template: function StaffComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Staff Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "div", 3)(8, "button", 4);
      \u0275\u0275listener("click", function StaffComponent_Template_button_click_8_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(9, "+ Add Staff");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function StaffComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchInput, $event) || (ctx.searchInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function StaffComponent_Template_input_keydown_enter_10_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function StaffComponent_Template_button_click_11_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275text(12, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function StaffComponent_Template_button_click_13_listener() {
        return ctx.clearSearch();
      });
      \u0275\u0275text(14, "Clear");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "div", 7)(16, "table", 8)(17, "thead")(18, "tr")(19, "th");
      \u0275\u0275text(20, "Employee ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th");
      \u0275\u0275text(22, "Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th");
      \u0275\u0275text(24, "Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th");
      \u0275\u0275text(26, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th");
      \u0275\u0275text(28, "Phone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th");
      \u0275\u0275text(30, "DOJ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th");
      \u0275\u0275text(32, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "tbody");
      \u0275\u0275template(34, StaffComponent_tr_34_Template, 26, 14, "tr", 9)(35, StaffComponent_tr_35_Template, 3, 0, "tr", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 11)(37, "button", 6);
      \u0275\u0275listener("click", function StaffComponent_Template_button_click_37_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(38, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 6);
      \u0275\u0275listener("click", function StaffComponent_Template_button_click_43_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(44, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "app-api-loader", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(46, StaffComponent_div_46_Template, 91, 44, "div", 13)(47, StaffComponent_div_47_Template, 82, 43, "div", 13);
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.totalRecords, " employees");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchInput);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingStaff);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.searchInput && !ctx.hasActiveSearch || ctx.isLoadingStaff);
      \u0275\u0275advance(21);
      \u0275\u0275property("ngForOf", ctx.staffRows);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoadingStaff && ctx.staffRows.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage <= 1 || ctx.isLoadingStaff);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.totalRecords, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoadingStaff);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.showStaffLoader)("fullscreen", true)("message", "Loading staff...");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
    }
  }, dependencies: [NgForOf, NgIf, LowerCasePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, ApiLoaderComponent], styles: ["\n\n.staff-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n  color: var(--text-secondary);\n}\n.staff-table-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 18px 12px;\n}\n.form-input.input-invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n.password-input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-input-wrap[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: var(--radius-sm, 6px);\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  padding: 0;\n  line-height: 0;\n}\n.password-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n  background: var(--bg-card-hover, rgba(0, 0, 0, 0.04));\n}\n.password-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--border-focus, #dc2626);\n  outline-offset: 2px;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n/*# sourceMappingURL=staff.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StaffComponent, [{
    type: Component,
    args: [{ selector: "app-staff", standalone: true, imports: [NgForOf, NgIf, LowerCasePipe, FormsModule, ApiLoaderComponent], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Staff Management</h2>\r
        <p>{{ totalRecords }} employees</p>\r
      </div>\r
      <div class="section-header-right">\r
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">\r
          <button type="button" class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Staff</button>\r
          <input class="form-input" style="width:220px" type="search" aria-label="Search staff" [(ngModel)]="searchInput"\r
            (keydown.enter)="applySearch()" placeholder="Search\u2026">\r
          <button type="button" class="btn btn-secondary btn-sm" (click)="applySearch()" [disabled]="isLoadingStaff">Search</button>\r
          <button type="button" class="btn btn-secondary btn-sm" (click)="clearSearch()" [disabled]="(!searchInput && !hasActiveSearch) || isLoadingStaff">Clear</button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="card" style="overflow-x:auto">\r
      <table class="data-table">\r
        <thead>\r
          <tr>\r
            <th>Employee ID</th>\r
            <th>Name</th>\r
            <th>Role</th>\r
            <th>Username</th>\r
            <th>Phone</th>\r
            <th>DOJ</th>\r
            <!-- <th>Status</th> -->\r
            <th>Actions</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          <tr *ngFor="let s of staffRows">\r
            <td style="font-family:var(--font-mono);font-size:11px">{{ s.employeeId }}</td>\r
            <td>\r
              <div style="display:flex;align-items:center;gap:10px">\r
                <!-- <div class="user-avatar" style="width:32px;height:32px;font-size:12px;border-radius:50%;background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-weight:700">\r
                  {{ initials(s.name) }}\r
                </div> -->\r
                <div>\r
                  <div style="font-weight:600">{{ s.name }}</div>\r
                  <div style="font-size:11px;color:var(--text-muted)">{{ s.email }}</div>\r
                </div>\r
              </div>\r
            </td>\r
            <td><span class="badge badge-{{ s.role | lowercase }}">{{ s.role }}</span></td>\r
            <td style="font-family:var(--font-mono);font-size:12px">{{ s.username }}</td>\r
            <td>{{ s.phone }}</td>\r
            <td style="font-size:11px;color:var(--text-muted)">{{ s.doj || '\u2014' }}</td>\r
            <!-- <td>\r
              <span class="badge" [class.badge-available]="s.status === 'Active'" [class.badge-cleaning]="s.status !== 'Active'">\r
                {{ s.status }}\r
              </span>\r
            </td> -->\r
            <td>\r
              <div style="display:flex;gap:8px;flex-wrap:wrap">\r
                <button type="button" class="btn btn-secondary btn-sm" (click)="openEditModal(s)" [disabled]="deletingRecordId !== null || isSubmitting">Edit</button>\r
                <button type="button" class="btn btn-danger btn-sm" (click)="onDeleteStaff(s)" [disabled]="deletingRecordId === s.recordId || isSubmitting || isLoadingStaff">Delete</button>\r
              </div>\r
            </td>\r
          </tr>\r
          <tr *ngIf="!isLoadingStaff && staffRows.length === 0">\r
            <td colspan="8" class="staff-table-empty">Data not found</td>\r
          </tr>\r
        </tbody>\r
      </table>\r
    </div>\r
\r
    <div class="staff-pagination">\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage <= 1 || isLoadingStaff" (click)="prevPage()">Prev</button>\r
      <span>Page {{ currentPage }} of {{ totalPages }}</span>\r
      <span>Total: {{ totalRecords }}</span>\r
      <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage >= totalPages || isLoadingStaff" (click)="nextPage()">Next</button>\r
      <app-api-loader [show]="showStaffLoader" [fullscreen]="true" [message]="'Loading staff...'"></app-api-loader>\r
    </div>\r
\r
    <div *ngIf="showAddModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Add Staff</h3>\r
          <button type="button" class="modal-close" (click)="showAddModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Name <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="fieldErrors.name" aria-label="Staff name" aria-required="true"\r
              [(ngModel)]="newStaff.name" (ngModelChange)="fieldErrors.name = ''">\r
            <div *ngIf="fieldErrors.name" class="co-form-error">{{ fieldErrors.name }}</div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Role <span class="form-req" aria-hidden="true">*</span></label>\r
              <select class="form-select" aria-label="Staff role" [(ngModel)]="newStaff.role">\r
                <option *ngFor="let r of roles" [ngValue]="r">{{ r }}</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Username <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="fieldErrors.username" aria-label="Staff username" aria-required="true" autocomplete="username"\r
                [(ngModel)]="newStaff.username" (ngModelChange)="fieldErrors.username = ''">\r
              <div *ngIf="fieldErrors.username" class="co-form-error">{{ fieldErrors.username }}</div>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Phone <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="fieldErrors.phone" aria-label="Staff phone" aria-required="true"\r
                inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit number"\r
                [ngModel]="newStaff.phone" (ngModelChange)="onPhoneInput($event)">\r
              <div *ngIf="fieldErrors.phone" class="co-form-error">{{ fieldErrors.phone }}</div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Email <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="fieldErrors.email" aria-label="Staff email" type="email" aria-required="true" autocomplete="email"\r
                [(ngModel)]="newStaff.email" (ngModelChange)="fieldErrors.email = ''">\r
              <div *ngIf="fieldErrors.email" class="co-form-error">{{ fieldErrors.email }}</div>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Password <span class="form-req" aria-hidden="true">*</span></label>\r
              <div class="password-input-wrap">\r
                <input class="form-input" [class.input-invalid]="fieldErrors.password" aria-label="Staff password" aria-required="true" autocomplete="new-password"\r
                  [type]="showAddPassword ? 'text' : 'password'"\r
                  [(ngModel)]="newStaff.password" (ngModelChange)="fieldErrors.password = ''; fieldErrors.confirmPassword = ''">\r
                <button type="button" class="password-toggle" (click)="showAddPassword = !showAddPassword"\r
                  title="Toggle password visibility"\r
                  [attr.aria-label]="showAddPassword ? 'Hide password' : 'Show password'" [attr.aria-pressed]="showAddPassword">\r
                  <span class="sr-only">{{ showAddPassword ? 'Hide' : 'Show' }} password</span>\r
                  <svg *ngIf="!showAddPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>\r
                  <svg *ngIf="showAddPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                </button>\r
              </div>\r
              <div *ngIf="fieldErrors.password" class="co-form-error">{{ fieldErrors.password }}</div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Confirm password <span class="form-req" aria-hidden="true">*</span></label>\r
              <div class="password-input-wrap">\r
                <input class="form-input" [class.input-invalid]="fieldErrors.confirmPassword" aria-label="Confirm password" aria-required="true" autocomplete="new-password"\r
                  [type]="showAddConfirmPassword ? 'text' : 'password'"\r
                  [(ngModel)]="newStaff.confirmPassword" (ngModelChange)="fieldErrors.confirmPassword = ''">\r
                <button type="button" class="password-toggle" (click)="showAddConfirmPassword = !showAddConfirmPassword"\r
                  title="Toggle confirm password visibility"\r
                  [attr.aria-label]="showAddConfirmPassword ? 'Hide confirm password' : 'Show confirm password'" [attr.aria-pressed]="showAddConfirmPassword">\r
                  <span class="sr-only">{{ showAddConfirmPassword ? 'Hide' : 'Show' }} confirm password</span>\r
                  <svg *ngIf="!showAddConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>\r
                  <svg *ngIf="showAddConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                </button>\r
              </div>\r
              <div *ngIf="fieldErrors.confirmPassword" class="co-form-error">{{ fieldErrors.confirmPassword }}</div>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Address</label>\r
            <input class="form-input" aria-label="Staff address" [(ngModel)]="newStaff.address" placeholder="optional">\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Date of joining</label>\r
              <input class="form-input" aria-label="Date of joining" type="date" [(ngModel)]="newStaff.dateOfJoining">\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Emergency contact</label>\r
              <input class="form-input" aria-label="Emergency contact" [(ngModel)]="newStaff.emergencyContact" placeholder="optional">\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Notes</label>\r
            <textarea class="form-textarea" aria-label="Staff notes" rows="2" [(ngModel)]="newStaff.notes" placeholder="optional"></textarea>\r
          </div>\r
          <button type="button" class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="addStaff()">\r
            {{ isSubmitting ? 'Creating\u2026' : 'Create Staff' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showEditModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Edit Staff</h3>\r
          <button type="button" class="modal-close" (click)="showEditModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- <div class="form-group">\r
            <label class="form-label">Employee ID</label>\r
            <input class="form-input" [value]="editStaff.employeeId" readonly aria-label="Employee id">\r
          </div> -->\r
          <div class="form-group">\r
            <label class="form-label">Name <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="editFieldErrors.name" aria-label="Edit staff name"\r
              [(ngModel)]="editStaff.name" (ngModelChange)="editFieldErrors.name = ''">\r
            <div *ngIf="editFieldErrors.name" class="co-form-error">{{ editFieldErrors.name }}</div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Role <span class="form-req" aria-hidden="true">*</span></label>\r
              <select class="form-select" aria-label="Edit staff role" [(ngModel)]="editStaff.role">\r
                <option *ngFor="let r of roles" [ngValue]="r">{{ r }}</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Username <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="editFieldErrors.username" aria-label="Edit username"\r
                [(ngModel)]="editStaff.username" (ngModelChange)="editFieldErrors.username = ''">\r
              <div *ngIf="editFieldErrors.username" class="co-form-error">{{ editFieldErrors.username }}</div>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Phone <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="editFieldErrors.phone" aria-label="Edit phone"\r
                inputmode="numeric" maxlength="10" [ngModel]="editStaff.phone" (ngModelChange)="onEditPhoneInput($event)">\r
              <div *ngIf="editFieldErrors.phone" class="co-form-error">{{ editFieldErrors.phone }}</div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Email <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="editFieldErrors.email" type="email" aria-label="Edit email"\r
                [(ngModel)]="editStaff.email" (ngModelChange)="editFieldErrors.email = ''">\r
              <div *ngIf="editFieldErrors.email" class="co-form-error">{{ editFieldErrors.email }}</div>\r
            </div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">New password</label>\r
              <div class="password-input-wrap">\r
                <input class="form-input" [class.input-invalid]="editFieldErrors.password" autocomplete="new-password" aria-label="New password optional"\r
                  [type]="showEditPassword ? 'text' : 'password'"\r
                  [(ngModel)]="editStaff.password" (ngModelChange)="editFieldErrors.password = ''; editFieldErrors.confirmPassword = ''"\r
                  placeholder="Leave blank to keep">\r
                <button type="button" class="password-toggle" (click)="showEditPassword = !showEditPassword"\r
                  title="Toggle password visibility"\r
                  [attr.aria-label]="showEditPassword ? 'Hide password' : 'Show password'" [attr.aria-pressed]="showEditPassword">\r
                  <span class="sr-only">{{ showEditPassword ? 'Hide' : 'Show' }} password</span>\r
                  <svg *ngIf="!showEditPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>\r
                  <svg *ngIf="showEditPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                </button>\r
              </div>\r
              <div *ngIf="editFieldErrors.password" class="co-form-error">{{ editFieldErrors.password }}</div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Confirm new password</label>\r
              <div class="password-input-wrap">\r
                <input class="form-input" [class.input-invalid]="editFieldErrors.confirmPassword" autocomplete="new-password" aria-label="Confirm new password"\r
                  [type]="showEditConfirmPassword ? 'text' : 'password'"\r
                  [(ngModel)]="editStaff.confirmPassword" (ngModelChange)="editFieldErrors.confirmPassword = ''"\r
                  placeholder="Match new password if changing">\r
                <button type="button" class="password-toggle" (click)="showEditConfirmPassword = !showEditConfirmPassword"\r
                  title="Toggle confirm password visibility"\r
                  [attr.aria-label]="showEditConfirmPassword ? 'Hide confirm password' : 'Show confirm password'" [attr.aria-pressed]="showEditConfirmPassword">\r
                  <span class="sr-only">{{ showEditConfirmPassword ? 'Hide' : 'Show' }} confirm password</span>\r
                  <svg *ngIf="!showEditConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>\r
                  <svg *ngIf="showEditConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                </button>\r
              </div>\r
              <div *ngIf="editFieldErrors.confirmPassword" class="co-form-error">{{ editFieldErrors.confirmPassword }}</div>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Address</label>\r
            <input class="form-input" aria-label="Edit address" [(ngModel)]="editStaff.address">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Emergency contact</label>\r
            <input class="form-input" aria-label="Edit emergency contact" [(ngModel)]="editStaff.emergencyContact">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Notes</label>\r
            <textarea class="form-textarea" rows="2" aria-label="Edit notes" [(ngModel)]="editStaff.notes"></textarea>\r
          </div>\r
          <button type="button" class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="submitStaffEdit()">\r
            {{ isSubmitting ? 'Saving\u2026' : 'Update Staff' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
`, styles: ["/* src/app/features/staff/staff.component.css */\n.staff-pagination {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n  color: var(--text-secondary);\n}\n.staff-table-empty {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 18px 12px;\n}\n.form-input.input-invalid {\n  border-color: var(--danger);\n}\n.password-input-wrap {\n  position: relative;\n}\n.password-input-wrap .form-input {\n  padding-right: 44px;\n}\n.password-toggle {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: var(--radius-sm, 6px);\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  padding: 0;\n  line-height: 0;\n}\n.password-toggle:hover {\n  color: var(--text-primary);\n  background: var(--bg-card-hover, rgba(0, 0, 0, 0.04));\n}\n.password-toggle:focus-visible {\n  outline: 2px solid var(--border-focus, #dc2626);\n  outline-offset: 2px;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n/*# sourceMappingURL=staff.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: StaffService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StaffComponent, { className: "StaffComponent", filePath: "src/app/features/staff/staff.component.ts", lineNumber: 57 });
})();
export {
  StaffComponent
};
//# sourceMappingURL=chunk-64GJFRR2.js.map
