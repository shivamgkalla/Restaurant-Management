import {
  TableService
} from "./chunk-DD55XJ2C.js";
import {
  require_sweetalert2_all
} from "./chunk-KDHDQBKH.js";
import "./chunk-FJDPAPFN.js";
import {
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
  AsyncPipe,
  BehaviorSubject,
  Component,
  LowerCasePipe,
  NgClass,
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/tables/tables.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function TablesComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TablesComponent_button_12_Template_button_click_0_listener() {
      const z_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeZone = z_r2);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("btn-primary", ctx_r2.activeZone === z_r2)("btn-secondary", ctx_r2.activeZone !== z_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(z_r2);
  }
}
function TablesComponent_div_13_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.addTableErrors.name);
  }
}
function TablesComponent_div_13_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.addTableErrors.capacity);
  }
}
function TablesComponent_div_13_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r5 = ctx.$implicit;
    \u0275\u0275property("value", z_r5)("disabled", z_r5 === "All");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(z_r5);
  }
}
function TablesComponent_div_13_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.addTableErrors.zone);
  }
}
function TablesComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275listener("click", function TablesComponent_div_13_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Add Table");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function TablesComponent_div_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 25);
    \u0275\u0275text(10, "Table Number ");
    \u0275\u0275elementStart(11, "span", 26);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 27);
    \u0275\u0275listener("ngModelChange", function TablesComponent_div_13_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onTableNameChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, TablesComponent_div_13_div_14_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 29)(16, "div", 24)(17, "label", 25);
    \u0275\u0275text(18, "Capacity ");
    \u0275\u0275elementStart(19, "span", 26);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 30);
    \u0275\u0275listener("ngModelChange", function TablesComponent_div_13_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCapacityChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, TablesComponent_div_13_div_22_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 24)(24, "label", 25);
    \u0275\u0275text(25, "Zone ");
    \u0275\u0275elementStart(26, "span", 26);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_13_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newTable.zone, $event) || (ctx_r2.newTable.zone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function TablesComponent_div_13_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onZoneChange($event));
    });
    \u0275\u0275template(29, TablesComponent_div_13_option_29_Template, 2, 3, "option", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, TablesComponent_div_13_div_30_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 24)(32, "label", 25);
    \u0275\u0275text(33, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "textarea", 33);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_13_Template_textarea_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newTable.notes, $event) || (ctx_r2.newTable.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "button", 34);
    \u0275\u0275listener("click", function TablesComponent_div_13_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addTable());
    });
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.addTableErrors.name);
    \u0275\u0275property("ngModel", ctx_r2.newTable.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.addTableErrors.name);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("input-invalid", ctx_r2.addTableErrors.capacity);
    \u0275\u0275property("ngModel", ctx_r2.newTable.capacity);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.addTableErrors.capacity);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.addTableErrors.zone);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newTable.zone);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.zones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.addTableErrors.zone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newTable.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Creating..." : "Create Table", " ");
  }
}
function TablesComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 39);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--stat-color", ctx_r2.statusColor(s_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, ctx_r2.countByStatus$(s_r6)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r6);
  }
}
function TablesComponent_ng_container_17_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r8.notes);
  }
}
function TablesComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 40);
    \u0275\u0275listener("click", function TablesComponent_ng_container_17_Template_div_click_1_listener() {
      const t_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openTable(t_r8));
    });
    \u0275\u0275elementStart(2, "div", 41)(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43)(6, "span");
    \u0275\u0275pipe(7, "lowercase");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 44);
    \u0275\u0275listener("click", function TablesComponent_ng_container_17_Template_button_click_9_listener($event) {
      const t_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(t_r8, $event));
    });
    \u0275\u0275text(10, " \u270E ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 45);
    \u0275\u0275listener("click", function TablesComponent_ng_container_17_Template_button_click_11_listener($event) {
      const t_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteTable(t_r8, $event));
    });
    \u0275\u0275text(12, " \u{1F5D1} ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 46)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, TablesComponent_ng_container_17_div_18_Template, 2, 1, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-" + t_r8.status.toLowerCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("badge badge-", \u0275\u0275pipeBind1(7, 11, t_r8.status), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r8.status);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.deletingTableId === t_r8.id || ctx_r2.isSubmitting);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u{1F465} ", t_r8.capacity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4CD} ", t_r8.zone, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r8.notes);
  }
}
function TablesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275text(1, " No records found ");
    \u0275\u0275elementEnd();
  }
}
function TablesComponent_div_29_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TablesComponent_div_29_button_11_Template_button_click_0_listener() {
      const s_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setStatus(s_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("btn-primary", ctx_r2.selectedTable.status === s_r11)("btn-secondary", ctx_r2.selectedTable.status !== s_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r11);
  }
}
function TablesComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function TablesComponent_div_29_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedTable = null);
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275listener("click", function TablesComponent_div_29_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function TablesComponent_div_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedTable = null);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "p", 51);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 52);
    \u0275\u0275template(11, TablesComponent_div_29_button_11_Template, 2, 5, "button", 6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r2.selectedTable.name, " \u2014 Update Status");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("Zone: ", ctx_r2.selectedTable.zone, " \xB7 Capacity: ", ctx_r2.selectedTable.capacity, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.allStatuses);
  }
}
function TablesComponent_div_30_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const z_r13 = ctx.$implicit;
    \u0275\u0275property("value", z_r13)("disabled", z_r13 === "All");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(z_r13);
  }
}
function TablesComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function TablesComponent_div_30_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275listener("click", function TablesComponent_div_30_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Edit Table");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function TablesComponent_div_30_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 25);
    \u0275\u0275text(10, "Table Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_30_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editTable.name, $event) || (ctx_r2.editTable.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 29)(13, "div", 24)(14, "label", 25);
    \u0275\u0275text(15, "Capacity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_30_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editTable.capacity, $event) || (ctx_r2.editTable.capacity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 24)(18, "label", 25);
    \u0275\u0275text(19, "Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 55);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_30_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editTable.zone, $event) || (ctx_r2.editTable.zone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function TablesComponent_div_30_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEditZoneChange($event));
    });
    \u0275\u0275template(21, TablesComponent_div_30_option_21_Template, 2, 3, "option", 32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 24)(23, "label", 25);
    \u0275\u0275text(24, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 56);
    \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_div_30_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editTable.notes, $event) || (ctx_r2.editTable.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 34);
    \u0275\u0275listener("click", function TablesComponent_div_30_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTable());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editTable.name);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editTable.capacity);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editTable.zone);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.zones);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editTable.notes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Updating..." : "Update Table", " ");
  }
}
function TablesComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 58)(2, "div", 59)(3, "span", 60);
    \u0275\u0275text(4, "\u{1F37D}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 61);
    \u0275\u0275text(6, "Preparing your restaurant data...");
    \u0275\u0275elementEnd()()();
  }
}
var TablesComponent = class _TablesComponent {
  toast;
  tableService;
  zones = ["All"];
  zoneItems = [];
  tables = [];
  totalRecords = 0;
  currentPage = 1;
  pageSize = 10;
  searchText = "";
  isLoadingTables = false;
  isLoadingZones = false;
  statuses = ["Available", "Occupied", "Reserved", "Cleaning"];
  allStatuses = ["Available", "Occupied", "Reserved", "Cleaning"];
  activeZone$ = new BehaviorSubject("All");
  tables$ = new BehaviorSubject([]);
  selectedTable = null;
  showAddModal = false;
  showEditModal = false;
  isSubmitting = false;
  deletingTableId = null;
  newTable = {
    name: "",
    capacity: 4,
    zone: "",
    zoneId: null,
    shape: "square",
    status: "Available",
    notes: ""
  };
  editTable = {
    id: "",
    name: "",
    capacity: 1,
    zone: "",
    zoneId: null,
    notes: ""
  };
  addTableErrors = {
    name: "",
    capacity: "",
    zone: ""
  };
  get activeZone() {
    return this.activeZone$.value;
  }
  set activeZone(v) {
    this.activeZone$.next(v);
  }
  filteredTables$;
  get showApiLoader() {
    return this.isLoadingTables || this.isLoadingZones || this.isSubmitting || !!this.deletingTableId;
  }
  constructor(toast, tableService) {
    this.toast = toast;
    this.tableService = tableService;
  }
  ngOnInit() {
    this.loadZones();
    this.loadTables();
    this.filteredTables$ = combineLatest([this.tables$, this.activeZone$]).pipe(map(([tables, zone]) => zone === "All" ? tables : tables.filter((t) => t.zone === zone)));
  }
  loadZones() {
    this.isLoadingZones = true;
    this.tableService.getAllZone().subscribe({
      next: (response) => {
        this.isLoadingZones = false;
        const zones = Array.isArray(response) ? response : response?.data ?? [];
        this.zoneItems = zones;
        this.zones = ["All", ...zones.filter((z) => z.is_active !== false).map((z) => z.name)];
        if (!this.zones.includes(this.activeZone)) {
          this.activeZone = "All";
        }
        if (!Array.isArray(response) && response?.statusCode && response.statusCode !== 200) {
          this.toast.show(`Error ${response.statusCode}: ${response?.message || "Failed to load zones"}`, "error");
        }
      },
      error: (err) => {
        this.isLoadingZones = false;
        const statusCode = err?.status;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to load zones";
        if (statusCode) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "error");
        } else {
          this.toast.show(apiMessage, "error");
        }
      }
    });
  }
  toUiStatus(status) {
    const normalized = (status ?? "").toLowerCase();
    if (normalized === "occupied")
      return "Occupied";
    if (normalized === "reserved")
      return "Reserved";
    if (normalized === "cleaning")
      return "Cleaning";
    return "Available";
  }
  toApiStatus(status) {
    return status.toLowerCase();
  }
  mapApiTableToUi(table) {
    const zoneName = table.zone?.name || this.zoneItems.find((z) => z.id === table.zone_id)?.name || `Zone ${table.zone_id}`;
    return {
      id: String(table.id),
      name: table.table_number,
      capacity: Number(table.seating_capacity ?? 1),
      zone: zoneName,
      shape: "square",
      status: this.toUiStatus(table.status),
      notes: table.notes ?? "",
      mergedWith: null
    };
  }
  loadTables(page = this.currentPage) {
    this.isLoadingTables = true;
    this.tableService.tablePagination({
      page,
      limit: this.pageSize,
      search: this.searchText.trim()
    }).subscribe({
      next: (response) => {
        this.isLoadingTables = false;
        const metaPage = Number(response?.meta?.page ?? response?.page ?? page);
        const metaLimit = Number(response?.meta?.limit ?? response?.limit ?? this.pageSize);
        const metaTotal = Number(response?.meta?.total ?? response?.total ?? 0);
        this.currentPage = metaPage > 0 ? metaPage : page;
        this.pageSize = metaLimit > 0 ? metaLimit : this.pageSize;
        this.totalRecords = metaTotal;
        const apiTables = Array.isArray(response?.data) ? response.data : [];
        this.tables = apiTables.map((t) => this.mapApiTableToUi(t));
        this.tables$.next(this.tables);
        if (response?.statusCode && response.statusCode !== 200) {
          const apiMessage = response?.message || "Failed to load tables";
          this.toast.show(`Error ${response.statusCode}: ${apiMessage}`, "error");
        }
      },
      error: (err) => {
        this.isLoadingTables = false;
        const statusCode = err?.status;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to load tables";
        if (statusCode) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "error");
        } else {
          this.toast.show(apiMessage, "error");
        }
      }
    });
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }
  onSearch() {
    this.currentPage = 1;
    this.loadTables(1);
  }
  clearSearch() {
    if (!this.searchText)
      return;
    this.searchText = "";
    this.currentPage = 1;
    this.loadTables(1);
  }
  countByStatus$(status) {
    return this.activeZone$.pipe(map((zone) => {
      const rows = zone === "All" ? this.tables : this.tables.filter((t) => t.zone === zone);
      return rows.filter((x) => x.status === status).length;
    }));
  }
  statusColor(status) {
    const map2 = {
      Available: "var(--status-available)",
      Occupied: "var(--status-occupied)",
      Reserved: "var(--status-reserved)",
      Cleaning: "var(--status-cleaning)"
    };
    return map2[status];
  }
  openTable(table) {
    this.selectedTable = __spreadValues({}, table);
  }
  setStatus(status) {
    if (!this.selectedTable)
      return;
    const tableId = Number(this.selectedTable.id);
    if (!Number.isFinite(tableId)) {
      this.toast.show("Invalid table id for status update", "error");
      return;
    }
    this.isSubmitting = true;
    this.tableService.updateTableStatus(tableId, this.toApiStatus(status)).subscribe({
      next: (response) => {
        const updatedStatus = this.toUiStatus(response?.status ?? status);
        const updatedZoneName = response?.zone?.name ?? this.tables.find((t) => t.id === String(tableId))?.zone ?? this.selectedTable?.zone ?? "";
        this.tables = this.tables.map((t) => {
          if (t.id !== String(tableId))
            return t;
          return __spreadProps(__spreadValues({}, t), {
            name: response?.table_number ?? t.name,
            capacity: Number(response?.seating_capacity ?? t.capacity),
            status: updatedStatus,
            notes: response?.notes ?? t.notes,
            zone: updatedZoneName
          });
        });
        this.tables$.next(this.tables);
        this.toast.show(`Table ${response?.table_number ?? this.selectedTable?.name} set to ${updatedStatus}`, "success");
        this.selectedTable = null;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to update table status";
        const codePrefix = err?.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${codePrefix}${apiMessage}`, "error");
      }
    });
  }
  deleteTable(table, event) {
    event.stopPropagation();
    if (this.deletingTableId || this.isSubmitting)
      return;
    const tableId = Number(table.id);
    if (!Number.isFinite(tableId)) {
      this.toast.show("Invalid table id for delete", "error");
      return;
    }
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will permanently delete the table "${table.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      this.deletingTableId = table.id;
      this.tableService.deleteTable(tableId).subscribe({
        next: (response) => {
          const statusCode = response?.statusCode ?? 200;
          if (statusCode !== 200) {
            this.deletingTableId = null;
            const apiMessage = response?.message || "Failed to delete table.";
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
            return;
          }
          const message = response?.message || "Table deleted successfully";
          this.tables = this.tables.filter((t) => t.id !== table.id);
          this.tables$.next(this.tables);
          if (this.selectedTable?.id === table.id) {
            this.selectedTable = null;
          }
          const shouldGoPrev = this.tables.length === 0 && this.currentPage > 1;
          const targetPage = shouldGoPrev ? this.currentPage - 1 : this.currentPage;
          this.toast.show(message, "success");
          this.deletingTableId = null;
          this.loadTables(targetPage);
        },
        error: (err) => {
          this.deletingTableId = null;
          const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to delete table";
          const codePrefix = err?.status ? `Error ${err.status}: ` : "";
          this.toast.show(`${codePrefix}${apiMessage}`, "error");
        }
      });
    });
  }
  openEditModal(table, event) {
    event.stopPropagation();
    const selectedZone = this.zoneItems.find((z) => z.name === table.zone);
    this.editTable = {
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      zone: table.zone,
      zoneId: selectedZone?.id ?? null,
      notes: table.notes ?? ""
    };
    this.showEditModal = true;
  }
  onEditZoneChange(zoneName) {
    const selectedZone = this.zoneItems.find((z) => z.name === zoneName);
    this.editTable.zone = zoneName;
    this.editTable.zoneId = selectedZone?.id ?? null;
  }
  updateTable() {
    const tableId = Number(this.editTable.id);
    const tableName = this.editTable.name.trim();
    const notes = this.editTable.notes.trim();
    const capacity = Number(this.editTable.capacity) || 1;
    const zoneId = this.editTable.zoneId;
    if (!Number.isFinite(tableId) || !tableName || zoneId === null || this.isSubmitting)
      return;
    this.isSubmitting = true;
    this.tableService.updateTable(tableId, {
      table_number: tableName,
      seating_capacity: capacity,
      zone_id: zoneId,
      notes
    }).subscribe({
      next: (response) => {
        const updatedTable = response?.data ?? response;
        const updatedZoneId = Number(updatedTable?.zone_id ?? zoneId);
        const updatedZoneName = updatedTable?.zone?.name ?? this.zoneItems.find((z) => z.id === updatedZoneId)?.name ?? this.editTable.zone;
        this.tables = this.tables.map((t) => {
          if (t.id !== String(tableId))
            return t;
          return __spreadProps(__spreadValues({}, t), {
            name: updatedTable?.table_number ?? tableName,
            capacity: Number(updatedTable?.seating_capacity ?? capacity),
            zone: updatedZoneName,
            notes: updatedTable?.notes ?? notes
          });
        });
        this.tables$.next(this.tables);
        this.toast.show("Table updated successfully", "success");
        this.showEditModal = false;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.isSubmitting = false;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to update table";
        const codePrefix = err?.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${codePrefix}${apiMessage}`, "error");
      }
    });
  }
  openAddModal() {
    this.newTable = {
      name: "",
      capacity: 4,
      zone: this.zoneItems[0]?.name ?? this.zones.find((z) => z !== "All") ?? "",
      zoneId: this.zoneItems[0]?.id ?? null,
      shape: "square",
      status: "Available",
      notes: ""
    };
    this.clearAddTableErrors();
    this.showAddModal = true;
  }
  onTableNameChange(value) {
    this.newTable.name = value;
    if (this.addTableErrors.name)
      this.addTableErrors.name = "";
  }
  onCapacityChange(value) {
    const numeric = Number(value);
    this.newTable.capacity = Number.isFinite(numeric) ? numeric : 0;
    if (this.addTableErrors.capacity)
      this.addTableErrors.capacity = "";
  }
  onZoneChange(zoneName) {
    const selectedZone = this.zoneItems.find((z) => z.name === zoneName);
    this.newTable.zone = zoneName;
    this.newTable.zoneId = selectedZone?.id ?? null;
    if (this.addTableErrors.zone)
      this.addTableErrors.zone = "";
  }
  addTable() {
    const tableName = this.newTable.name.trim();
    const zoneName = this.newTable.zone.trim();
    const capacity = Number(this.newTable.capacity);
    if (this.isSubmitting)
      return;
    this.clearAddTableErrors();
    if (!tableName) {
      this.addTableErrors.name = "Table name/number is required.";
    }
    if (!Number.isFinite(capacity) || capacity <= 0) {
      this.addTableErrors.capacity = "Capacity is required.";
    }
    if (!zoneName || this.newTable.zoneId === null) {
      this.addTableErrors.zone = "Zone is required.";
    }
    const firstError = this.addTableErrors.name || this.addTableErrors.capacity || this.addTableErrors.zone;
    if (firstError) {
      this.toast.show(firstError, "warning");
      return;
    }
    const zoneId = this.newTable.zoneId;
    this.isSubmitting = true;
    this.tableService.createTable({
      table_number: tableName,
      seating_capacity: capacity,
      zone_id: zoneId,
      notes: this.newTable.notes.trim(),
      pos_x: 0,
      pos_y: 0
    }).subscribe({
      next: (response) => {
        const createdTable = response?.data ?? response;
        const createdId = createdTable?.id ?? `T${String(this.tables.length + 1).padStart(3, "0")}`;
        const createdZoneId = createdTable?.zone_id ?? this.newTable.zoneId;
        const createdZoneName = this.zoneItems.find((z) => z.id === Number(createdZoneId))?.name ?? zoneName;
        this.tables = [{
          id: String(createdId),
          name: createdTable?.table_number ?? tableName,
          capacity: Number(createdTable?.seating_capacity ?? capacity),
          zone: createdZoneName,
          shape: this.newTable.shape,
          status: this.newTable.status,
          notes: createdTable?.notes ?? this.newTable.notes.trim(),
          mergedWith: null
        }, ...this.tables];
        this.tables$.next(this.tables);
        this.toast.show(`Table ${createdTable?.table_number ?? tableName} added`, "success");
        this.showAddModal = false;
        this.isSubmitting = false;
        this.loadTables(1);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400) {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || "Invalid table data. Please check the fields and try again.";
          this.toast.show(`Error 400: ${apiMessage}`, "warning");
        } else if (err.status === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
        } else {
          const apiMessage = err.error?.message || err.error?.errors?.[0] || "Failed to create table. Please try again.";
          const codePrefix = err?.status ? `Error ${err.status}: ` : "";
          this.toast.show(`${codePrefix}${apiMessage}`, "error");
        }
      }
    });
  }
  clearAddTableErrors() {
    this.addTableErrors = { name: "", capacity: "", zone: "" };
  }
  nextPage() {
    if (this.currentPage < this.totalPages && !this.isLoadingTables) {
      this.loadTables(this.currentPage + 1);
    }
  }
  prevPage() {
    if (this.currentPage > 1 && !this.isLoadingTables) {
      this.loadTables(this.currentPage - 1);
    }
  }
  static \u0275fac = function TablesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TablesComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(TableService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TablesComponent, selectors: [["app-tables"]], decls: 32, vars: 20, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], ["aria-label", "Search table", "placeholder", "Search table name/number", 1, "form-input", "tables-search-input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], ["class", "btn btn-sm", 3, "btn-primary", "btn-secondary", "click", 4, "ngFor", "ngForOf"], ["class", "modal-backdrop", 4, "ngIf"], [1, "stats-grid", "tables-stats-grid"], ["class", "stat-card", 3, "--stat-color", 4, "ngFor", "ngForOf"], [1, "table-grid"], [4, "ngFor", "ngForOf"], ["class", "table-empty", 4, "ngIf"], [1, "card", "tables-pagination-bar"], [1, "tables-pagination-info"], [1, "tables-pagination-actions"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], ["class", "api-loader-backdrop", 4, "ngIf"], [1, "btn", "btn-sm", 3, "click"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], ["aria-hidden", "true", 1, "form-req"], ["aria-label", "Table name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "co-form-error", 4, "ngIf"], [1, "grid-2"], ["aria-label", "Table capacity", "type", "number", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Table zone", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], ["aria-label", "Table notes", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "co-form-error"], [3, "value", "disabled"], [1, "stat-card"], [1, "stat-value"], [1, "stat-label"], [1, "table-card", 3, "click", "ngClass"], [1, "table-card-top"], [1, "table-name"], [1, "table-card-actions"], ["aria-label", "Edit table", "title", "Edit table", 1, "table-edit-btn", 3, "click", "disabled"], ["aria-label", "Delete table", "title", "Delete table", 1, "table-delete-btn", 3, "click", "disabled"], [1, "table-meta"], ["class", "table-note", 4, "ngIf"], [1, "table-note"], [1, "table-empty"], [1, "modal-backdrop", 3, "click"], [1, "tables-status-modal-meta"], [1, "tables-status-options"], ["aria-label", "Edit table name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit table capacity", "type", "number", "min", "1", 1, "form-input", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit table zone", 1, "form-select", 3, "ngModelChange", "ngModel"], ["aria-label", "Edit table notes", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "api-loader-backdrop"], [1, "api-loader-card"], [1, "plate-loader"], [1, "plate-loader-icon"], [1, "api-loader-text"]], template: function TablesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Table Management");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2)(5, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function TablesComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function TablesComponent_Template_input_keyup_enter_5_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 4);
      \u0275\u0275listener("click", function TablesComponent_Template_button_click_6_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275text(7, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 4);
      \u0275\u0275listener("click", function TablesComponent_Template_button_click_8_listener() {
        return ctx.clearSearch();
      });
      \u0275\u0275text(9, "Clear");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function TablesComponent_Template_button_click_10_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(11, "+ Add Table");
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, TablesComponent_button_12_Template, 2, 5, "button", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, TablesComponent_div_13_Template, 37, 16, "div", 7);
      \u0275\u0275elementStart(14, "div", 8);
      \u0275\u0275template(15, TablesComponent_div_15_Template, 6, 6, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 10);
      \u0275\u0275template(17, TablesComponent_ng_container_17_Template, 19, 13, "ng-container", 11);
      \u0275\u0275pipe(18, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, TablesComponent_div_19_Template, 2, 0, "div", 12);
      \u0275\u0275pipe(20, "async");
      \u0275\u0275elementStart(21, "div", 13)(22, "span", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 15)(25, "button", 4);
      \u0275\u0275listener("click", function TablesComponent_Template_button_click_25_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(26, "Previous");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 4);
      \u0275\u0275listener("click", function TablesComponent_Template_button_click_27_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(28, "Next");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(29, TablesComponent_div_29_Template, 12, 4, "div", 16)(30, TablesComponent_div_30_Template, 28, 7, "div", 16)(31, TablesComponent_div_31_Template, 7, 0, "div", 17);
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingTables);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoadingTables);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.zones);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.statuses);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(18, 16, ctx.filteredTables$));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.isLoadingTables && ((tmp_7_0 = \u0275\u0275pipeBind1(20, 18, ctx.filteredTables$)) == null ? null : tmp_7_0.length) === 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate3(" Page ", ctx.currentPage, " / ", ctx.totalPages, " \xB7 Total ", ctx.totalRecords, " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage === 1 || ctx.isLoadingTables);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoadingTables);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.selectedTable);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showApiLoader);
    }
  }, dependencies: [AsyncPipe, NgForOf, NgIf, NgClass, LowerCasePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.table-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n}\n.table-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: 18px;\n  cursor: pointer;\n  transition: all .2s;\n  min-height: 132px;\n}\n.table-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, .3);\n}\n.table-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.table-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.table-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.25;\n  padding-top: 2px;\n  word-break: break-word;\n}\n.table-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  display: flex;\n  gap: 10px;\n}\n.table-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 8px;\n  border-top: 1px solid var(--border);\n  padding-top: 6px;\n}\n.table-delete-btn[_ngcontent-%COMP%] {\n  border: 1px solid #ef4444;\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n  border-radius: 6px;\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all .2s ease;\n}\n.table-delete-btn[_ngcontent-%COMP%]:hover {\n  background: #ef4444;\n  color: #ffffff;\n  border-color: #ef4444;\n}\n.table-delete-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.table-edit-btn[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  background: rgba(59, 130, 246, 0.15);\n  color: #60a5fa;\n  border-radius: 6px;\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all .2s ease;\n}\n.table-edit-btn[_ngcontent-%COMP%]:hover {\n  background: #3b82f6;\n  color: #ffffff;\n  border-color: #3b82f6;\n}\n.table-edit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.table-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary);\n  padding: 18px 12px;\n}\n.form-input.input-invalid[_ngcontent-%COMP%], \n.form-select.input-invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n.api-loader-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(8, 10, 18, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1400;\n}\n.api-loader-card[_ngcontent-%COMP%] {\n  min-width: 260px;\n  padding: 20px 24px;\n  border-radius: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background:\n    linear-gradient(\n      145deg,\n      #161d2f,\n      #101625);\n  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.plate-loader[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 999px;\n  border: 3px solid rgba(255, 255, 255, 0.22);\n  border-top-color: #f59e0b;\n  animation: _ngcontent-%COMP%_spinPlate 0.95s linear infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.plate-loader-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  transform: translateY(-1px);\n}\n.api-loader-text[_ngcontent-%COMP%] {\n  color: #f9fafb;\n  font-size: 13px;\n  letter-spacing: 0.2px;\n}\n@keyframes _ngcontent-%COMP%_spinPlate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.section-header-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.tables-search-input[_ngcontent-%COMP%] {\n  min-width: 220px;\n}\n.tables-stats-grid[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.tables-pagination-bar[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.tables-pagination-info[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.tables-pagination-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.tables-status-modal-meta[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.tables-status-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=tables.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TablesComponent, [{
    type: Component,
    args: [{ selector: "app-tables", standalone: true, imports: [AsyncPipe, NgForOf, NgIf, NgClass, LowerCasePipe, FormsModule], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Table Management</h2>\r
        <!-- <p>click a table to update its status</p> -->\r
      </div>\r
      <div class="section-header-right">\r
        <input\r
          class="form-input tables-search-input"\r
          aria-label="Search table"\r
          placeholder="Search table name/number"\r
          [(ngModel)]="searchText"\r
          (keyup.enter)="onSearch()"\r
        />\r
        <button class="btn btn-secondary btn-sm" (click)="onSearch()" [disabled]="isLoadingTables">Search</button>\r
        <button class="btn btn-secondary btn-sm" (click)="clearSearch()" [disabled]="isLoadingTables">Clear</button>\r
        <button class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Table</button>\r
        <button *ngFor="let z of zones" class="btn btn-sm"\r
          [class.btn-primary]="activeZone === z"\r
          [class.btn-secondary]="activeZone !== z"\r
          (click)="activeZone = z">{{ z }}</button>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showAddModal" class="modal-backdrop">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Add Table</h3>\r
          <button class="modal-close" (click)="showAddModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">Table Number <span class="form-req" aria-hidden="true">*</span></label>\r
            <input class="form-input" [class.input-invalid]="addTableErrors.name" aria-label="Table name"\r
              [ngModel]="newTable.name" (ngModelChange)="onTableNameChange($event)">\r
            <div *ngIf="addTableErrors.name" class="co-form-error">{{ addTableErrors.name }}</div>\r
          </div>\r
          <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Capacity <span class="form-req" aria-hidden="true">*</span></label>\r
              <input class="form-input" [class.input-invalid]="addTableErrors.capacity" aria-label="Table capacity" type="number" min="1"\r
                [ngModel]="newTable.capacity" (ngModelChange)="onCapacityChange($event)">\r
              <div *ngIf="addTableErrors.capacity" class="co-form-error">{{ addTableErrors.capacity }}</div>\r
            </div>\r
            <div class="form-group"><label class="form-label">Zone <span class="form-req" aria-hidden="true">*</span></label>\r
              <select class="form-select" [class.input-invalid]="addTableErrors.zone" aria-label="Table zone" [(ngModel)]="newTable.zone" (ngModelChange)="onZoneChange($event)">\r
                <option *ngFor="let z of zones" [value]="z" [disabled]="z === 'All'">{{ z }}</option>\r
              </select>\r
              <div *ngIf="addTableErrors.zone" class="co-form-error">{{ addTableErrors.zone }}</div>\r
            </div>\r
          </div>\r
          <!-- <div class="grid-2">\r
            <div class="form-group">\r
              <label class="form-label">Shape</label>\r
              <select class="form-select" aria-label="Table shape" [(ngModel)]="newTable.shape">\r
                <option value="round">Round</option><option value="square">Square</option><option value="rectangle">Rectangle</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">Status</label>\r
              <select class="form-select" aria-label="Table status" [(ngModel)]="newTable.status">\r
                <option *ngFor="let s of allStatuses" [value]="s">{{ s }}</option>\r
              </select>\r
            </div>\r
          </div> -->\r
          <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" aria-label="Table notes" rows="2" [(ngModel)]="newTable.notes"></textarea></div>\r
          <button class="btn btn-primary btn-full" (click)="addTable()" [disabled]="isSubmitting">\r
            {{ isSubmitting ? 'Creating...' : 'Create Table' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="stats-grid tables-stats-grid">\r
      <div *ngFor="let s of statuses" class="stat-card" [style.--stat-color]="statusColor(s)">\r
        <div class="stat-value">{{ countByStatus$(s) | async }}</div>\r
        <div class="stat-label">{{ s }}</div>\r
      </div>\r
    </div>\r
\r
    <div class="table-grid">\r
      <ng-container *ngFor="let t of filteredTables$ | async">\r
        <div class="table-card" [ngClass]="'status-' + t.status.toLowerCase()" (click)="openTable(t)">\r
          <div class="table-card-top">\r
            <span class="table-name">{{ t.name }}</span>\r
            <div class="table-card-actions">\r
              <span class="badge badge-{{ t.status | lowercase }}">{{ t.status }}</span>\r
              <button\r
                class="table-edit-btn"\r
                aria-label="Edit table"\r
                title="Edit table"\r
                (click)="openEditModal(t, $event)"\r
                [disabled]="isSubmitting"\r
              >\r
                \u270E\r
              </button>\r
              <button\r
                class="table-delete-btn"\r
                aria-label="Delete table"\r
                title="Delete table"\r
                (click)="deleteTable(t, $event)"\r
                [disabled]="deletingTableId === t.id || isSubmitting"\r
              >\r
                \u{1F5D1}\r
              </button>\r
            </div>\r
          </div>\r
          <div class="table-meta">\r
            <span>\u{1F465} {{ t.capacity }}</span>\r
            <span>\u{1F4CD} {{ t.zone }}</span>\r
          </div>\r
          <div *ngIf="t.notes" class="table-note">{{ t.notes }}</div>\r
        </div>\r
      </ng-container>\r
    </div>\r
    <div *ngIf="!isLoadingTables && (filteredTables$ | async)?.length === 0" class="table-empty">\r
      No records found\r
    </div>\r
    <div class="card tables-pagination-bar">\r
      <span class="tables-pagination-info">\r
        Page {{ currentPage }} / {{ totalPages }} \xB7 Total {{ totalRecords }}\r
      </span>\r
      <div class="tables-pagination-actions">\r
        <button class="btn btn-secondary btn-sm" (click)="prevPage()" [disabled]="currentPage === 1 || isLoadingTables">Previous</button>\r
        <button class="btn btn-secondary btn-sm" (click)="nextPage()" [disabled]="currentPage >= totalPages || isLoadingTables">Next</button>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="selectedTable" class="modal-backdrop" (click)="selectedTable = null">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>{{ selectedTable.name }} \u2014 Update Status</h3>\r
          <button class="modal-close" (click)="selectedTable = null">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="tables-status-modal-meta">Zone: {{ selectedTable.zone }} \xB7 Capacity: {{ selectedTable.capacity }}</p>\r
          <div class="tables-status-options">\r
            <button *ngFor="let s of allStatuses" class="btn btn-sm"\r
              [class.btn-primary]="selectedTable.status === s"\r
              [class.btn-secondary]="selectedTable.status !== s"\r
              (click)="setStatus(s)">{{ s }}</button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showEditModal" class="modal-backdrop" (click)="showEditModal = false">\r
      <div class="modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>Edit Table</h3>\r
          <button class="modal-close" (click)="showEditModal = false">\u2715</button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group"><label class="form-label">Table Number</label><input class="form-input" aria-label="Edit table name" [(ngModel)]="editTable.name"></div>\r
          <div class="grid-2">\r
            <div class="form-group"><label class="form-label">Capacity</label><input class="form-input" aria-label="Edit table capacity" type="number" min="1" [(ngModel)]="editTable.capacity"></div>\r
            <div class="form-group"><label class="form-label">Zone</label>\r
              <select class="form-select" aria-label="Edit table zone" [(ngModel)]="editTable.zone" (ngModelChange)="onEditZoneChange($event)">\r
                <option *ngFor="let z of zones" [value]="z" [disabled]="z === 'All'">{{ z }}</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" aria-label="Edit table notes" rows="2" [(ngModel)]="editTable.notes"></textarea></div>\r
          <button class="btn btn-primary btn-full" (click)="updateTable()" [disabled]="isSubmitting">\r
            {{ isSubmitting ? 'Updating...' : 'Update Table' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="showApiLoader" class="api-loader-backdrop">\r
      <div class="api-loader-card">\r
        <div class="plate-loader">\r
          <span class="plate-loader-icon">\u{1F37D}\uFE0F</span>\r
        </div>\r
        <div class="api-loader-text">Preparing your restaurant data...</div>\r
      </div>\r
    </div>\r
  \r
`, styles: ["/* src/app/features/tables/tables.component.css */\n.table-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 16px;\n}\n.table-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: 18px;\n  cursor: pointer;\n  transition: all .2s;\n  min-height: 132px;\n}\n.table-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, .3);\n}\n.table-card-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.table-card-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.table-name {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.25;\n  padding-top: 2px;\n  word-break: break-word;\n}\n.table-meta {\n  font-size: 12px;\n  color: var(--text-muted);\n  display: flex;\n  gap: 10px;\n}\n.table-note {\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 8px;\n  border-top: 1px solid var(--border);\n  padding-top: 6px;\n}\n.table-delete-btn {\n  border: 1px solid #ef4444;\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n  border-radius: 6px;\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all .2s ease;\n}\n.table-delete-btn:hover {\n  background: #ef4444;\n  color: #ffffff;\n  border-color: #ef4444;\n}\n.table-delete-btn:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.table-edit-btn {\n  border: 1px solid var(--border);\n  background: rgba(59, 130, 246, 0.15);\n  color: #60a5fa;\n  border-radius: 6px;\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all .2s ease;\n}\n.table-edit-btn:hover {\n  background: #3b82f6;\n  color: #ffffff;\n  border-color: #3b82f6;\n}\n.table-edit-btn:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.table-empty {\n  text-align: center;\n  color: var(--text-secondary);\n  padding: 18px 12px;\n}\n.form-input.input-invalid,\n.form-select.input-invalid {\n  border-color: var(--danger);\n}\n.api-loader-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(8, 10, 18, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1400;\n}\n.api-loader-card {\n  min-width: 260px;\n  padding: 20px 24px;\n  border-radius: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background:\n    linear-gradient(\n      145deg,\n      #161d2f,\n      #101625);\n  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.plate-loader {\n  width: 52px;\n  height: 52px;\n  border-radius: 999px;\n  border: 3px solid rgba(255, 255, 255, 0.22);\n  border-top-color: #f59e0b;\n  animation: spinPlate 0.95s linear infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.plate-loader-icon {\n  font-size: 20px;\n  transform: translateY(-1px);\n}\n.api-loader-text {\n  color: #f9fafb;\n  font-size: 13px;\n  letter-spacing: 0.2px;\n}\n@keyframes spinPlate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.section-header-right {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.tables-search-input {\n  min-width: 220px;\n}\n.tables-stats-grid {\n  margin-bottom: 20px;\n}\n.tables-pagination-bar {\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.tables-pagination-info {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.tables-pagination-actions {\n  display: flex;\n  gap: 8px;\n}\n.tables-status-modal-meta {\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.tables-status-options {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=tables.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: TableService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TablesComponent, { className: "TablesComponent", filePath: "src/app/features/tables/tables.component.ts", lineNumber: 28 });
})();
export {
  TablesComponent
};
//# sourceMappingURL=chunk-UQGVKUVU.js.map
