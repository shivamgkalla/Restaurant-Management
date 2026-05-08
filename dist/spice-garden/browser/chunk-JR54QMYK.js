import {
  TableService
} from "./chunk-DD55XJ2C.js";
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
  NgControlStatus,
  NgModel
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import "./chunk-E7QOHDKE.js";
import {
  Component,
  NgForOf,
  NgIf,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/zones/zones.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function ZonesComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "button", 15);
    \u0275\u0275listener("click", function ZonesComponent_tr_22_Template_button_click_7_listener() {
      const z_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleZoneStatus(z_r2));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "div", 10)(11, "button", 16);
    \u0275\u0275listener("click", function ZonesComponent_tr_22_Template_button_click_11_listener() {
      const z_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(z_r2));
    });
    \u0275\u0275text(12, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 17);
    \u0275\u0275listener("click", function ZonesComponent_tr_22_Template_button_click_13_listener() {
      const z_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteZone(z_r2));
    });
    \u0275\u0275text(14, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const z_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(z_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(z_r2.description || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-primary", z_r2.is_active)("btn-secondary", !z_r2.is_active);
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", z_r2.is_active ? "Available" : "Unavailable", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
  }
}
function ZonesComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "No zones found");
    \u0275\u0275elementEnd()();
  }
}
function ZonesComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Loading zones...");
    \u0275\u0275elementEnd()();
  }
}
function ZonesComponent_div_33_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.zoneNameError);
  }
}
function ZonesComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275listener("click", function ZonesComponent_div_33_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Add Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function ZonesComponent_div_33_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 25);
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "span", 26);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 27);
    \u0275\u0275listener("ngModelChange", function ZonesComponent_div_33_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onZoneNameChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ZonesComponent_div_33_div_14_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 24)(16, "label", 29);
    \u0275\u0275text(17, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 30);
    \u0275\u0275twoWayListener("ngModelChange", function ZonesComponent_div_33_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newZone.description, $event) || (ctx_r2.newZone.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 31);
    \u0275\u0275listener("click", function ZonesComponent_div_33_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addZone());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.zoneNameError);
    \u0275\u0275property("ngModel", ctx_r2.newZone.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.zoneNameError);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newZone.description);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Creating\u2026" : "Create Zone", " ");
  }
}
function ZonesComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("click", function ZonesComponent_div_34_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275listener("click", function ZonesComponent_div_34_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Edit Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function ZonesComponent_div_34_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 34);
    \u0275\u0275text(10, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ZonesComponent_div_34_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editZoneData.name, $event) || (ctx_r2.editZoneData.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 24)(13, "label", 36);
    \u0275\u0275text(14, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ZonesComponent_div_34_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editZoneData.description, $event) || (ctx_r2.editZoneData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 24)(17, "label", 38)(18, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function ZonesComponent_div_34_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editZoneData.is_active, $event) || (ctx_r2.editZoneData.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Available ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "button", 31);
    \u0275\u0275listener("click", function ZonesComponent_div_34_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateZone());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editZoneData.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editZoneData.description);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editZoneData.is_active);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Updating..." : "Update Zone", " ");
  }
}
var ZonesComponent = class _ZonesComponent {
  toast;
  tableService;
  zones = [];
  isLoading = false;
  totalPages = 1;
  isSubmitting = false;
  showAddModal = false;
  showEditModal = false;
  pageSize = 10;
  totalRecords = 0;
  currentPage = 1;
  get showApiLoader() {
    return this.isLoading || this.isSubmitting;
  }
  newZone = {
    name: "",
    description: ""
  };
  zoneNameError = "";
  editZoneData = {
    id: 0,
    name: "",
    description: "",
    is_active: true
  };
  constructor(toast, tableService) {
    this.toast = toast;
    this.tableService = tableService;
  }
  ngOnInit() {
    this.loadZones();
  }
  loadZones() {
    this.isLoading = true;
    this.tableService.zonePagination(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.zones = response?.data ?? [];
        const metaTotal = Number(response?.meta?.total ?? response?.total ?? 0);
        const metaLimit = Number(response?.meta?.limit ?? response?.limit ?? this.pageSize);
        const metaPage = Number(response?.meta?.page ?? response?.page ?? response?.meta?.skip ?? response?.skip ?? this.currentPage);
        const metaTotalPages = Number(response?.meta?.total_pages);
        this.totalRecords = metaTotal;
        if (metaLimit > 0) {
          this.pageSize = metaLimit;
        }
        if (Number.isFinite(metaPage) && metaPage > 0) {
          this.currentPage = metaPage;
        }
        this.totalPages = Number.isFinite(metaTotalPages) && metaTotalPages > 0 ? metaTotalPages : Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
        if (response?.statusCode && response?.statusCode !== 200) {
          const apiMessage = response?.message || "Failed to load zones";
          this.toast.show(`Error ${response.statusCode}: ${apiMessage}`, "error");
        }
      },
      error: (err) => {
        this.isLoading = false;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to load zones";
        const codePrefix = err?.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${codePrefix}${apiMessage}`, "error");
      }
    });
  }
  openAddModal() {
    this.newZone = { name: "", description: "" };
    this.zoneNameError = "";
    this.showAddModal = true;
  }
  onZoneNameChange(value) {
    this.newZone.name = value;
    if (this.zoneNameError) {
      this.zoneNameError = "";
    }
  }
  addZone() {
    const name = this.newZone.name.trim();
    const description = this.newZone.description.trim();
    if (!name) {
      this.zoneNameError = "Zone name is required.";
      this.toast.show(this.zoneNameError, "warning");
      return;
    }
    this.isSubmitting = true;
    this.tableService.createZone({ name, description }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const statusCode = response?.statusCode;
        if (statusCode && statusCode !== 200 && statusCode !== 201) {
          const apiMessage = response?.message || "Failed to create zone.";
          const toastType = statusCode === 409 ? "warning" : "error";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, toastType);
          return;
        }
        this.toast.show(`Zone "${name}" created successfully`, "success");
        this.showAddModal = false;
        this.currentPage = 1;
        this.loadZones();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = err?.error?.statusCode ?? err?.status;
        const apiMessage = err?.error?.message || err?.error?.errors?.[0];
        if (statusCode === 409) {
          this.toast.show(`Error 409: ${apiMessage || "Zone with this name already exists"}`, "warning");
        } else if (statusCode === 400) {
          const apiMessage2 = err.error?.message || err.error?.errors?.[0] || "Invalid zone data. Please check the fields and try again.";
          this.toast.show(apiMessage2, "warning");
        } else if (statusCode === 500) {
          this.toast.show("Server error. Please try again later.", "error");
        } else {
          const msg = apiMessage || "Something went wrong. Please try again.";
          const prefix = statusCode ? `Error ${statusCode}: ` : "";
          this.toast.show(`${prefix}${msg}`, "error");
        }
      }
    });
  }
  openEditModal(zone) {
    this.editZoneData = {
      id: zone.id,
      name: zone.name,
      description: zone.description ?? "",
      is_active: zone.is_active
    };
    this.showEditModal = true;
  }
  updateZone() {
    const name = this.editZoneData.name.trim();
    if (!name || this.isSubmitting)
      return;
    this.isSubmitting = true;
    this.tableService.updateZone(this.editZoneData.id, {
      name,
      description: this.editZoneData.description.trim(),
      is_active: this.editZoneData.is_active
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showEditModal = false;
        this.toast.show("Zone updated successfully", "success");
        this.loadZones();
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err?.error?.message || "Failed to update zone";
        this.toast.show(msg, "error");
      }
    });
  }
  toggleZoneStatus(zone) {
    if (this.isSubmitting)
      return;
    this.isSubmitting = true;
    this.tableService.updateZone(zone.id, {
      name: zone.name,
      description: zone.description ?? "",
      is_active: !zone.is_active
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toast.show(`Zone "${zone.name}" marked ${zone.is_active ? "Unavailable" : "Available"}`, "success");
        this.loadZones();
      },
      error: () => {
        this.isSubmitting = false;
        this.toast.show("Failed to change zone status", "error");
      }
    });
  }
  deleteZone(zone) {
    if (this.isSubmitting)
      return;
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will permanently delete the zone "${zone.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      this.isSubmitting = true;
      this.tableService.deleteZone(zone.id).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          const body = response;
          const statusCode = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
          if (statusCode !== 200) {
            const apiMessage = body?.message || "Failed to delete zone.";
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
            return;
          }
          this.toast.show(`Zone "${zone.name}" deleted`, "success");
          const willPageBeEmpty = this.zones.length === 1 && this.currentPage > 1;
          if (willPageBeEmpty) {
            this.currentPage -= 1;
          }
          this.loadZones();
        },
        error: (err) => {
          this.isSubmitting = false;
          const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to delete zone";
          const statusCode = err?.error?.statusCode ?? err?.status;
          const codePrefix = statusCode ? `Error ${statusCode}: ` : "";
          this.toast.show(`${codePrefix}${apiMessage}`, "error");
        }
      });
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.loadZones();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadZones();
    }
  }
  static \u0275fac = function ZonesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZonesComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(TableService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZonesComponent, selectors: [["app-zones"]], decls: 36, vars: 13, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "card", 2, "overflow-x", "auto"], [1, "data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "card", 2, "margin-top", "12px", "display", "flex", "justify-content", "space-between", "align-items", "center"], [2, "font-size", "12px", "color", "var(--text-secondary)"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], ["class", "modal-backdrop", 4, "ngIf"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], [3, "show", "fullscreen", "message"], [1, "btn", "btn-sm", 3, "click", "disabled"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "4", 2, "text-align", "center", "color", "var(--text-secondary)"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], ["for", "zoneName", 1, "form-label"], ["aria-hidden", "true", 1, "form-req"], ["id", "zoneName", "aria-label", "Zone name", "placeholder", "Indoor", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "co-form-error", 4, "ngIf"], ["for", "zoneDescription", 1, "form-label"], ["id", "zoneDescription", "aria-label", "Zone description", "rows", "3", "placeholder", "Main hall seating area", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "co-form-error"], [1, "modal-backdrop", 3, "click"], ["for", "editZoneName", 1, "form-label"], ["id", "editZoneName", "aria-label", "Edit zone name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "editZoneDescription", 1, "form-label"], ["id", "editZoneDescription", "aria-label", "Edit zone description", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"]], template: function ZonesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Zone Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Create and manage restaurant zones");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "button", 3);
      \u0275\u0275listener("click", function ZonesComponent_Template_button_click_7_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(8, "+ Add Zone");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 4)(10, "table", 5)(11, "thead")(12, "tr")(13, "th");
      \u0275\u0275text(14, "Zone Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "th");
      \u0275\u0275text(16, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "th");
      \u0275\u0275text(18, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "th");
      \u0275\u0275text(20, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "tbody");
      \u0275\u0275template(22, ZonesComponent_tr_22_Template, 15, 9, "tr", 6)(23, ZonesComponent_tr_23_Template, 3, 0, "tr", 7)(24, ZonesComponent_tr_24_Template, 3, 0, "tr", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "div", 8)(26, "span", 9);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 10)(29, "button", 11);
      \u0275\u0275listener("click", function ZonesComponent_Template_button_click_29_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(30, "Previous");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 11);
      \u0275\u0275listener("click", function ZonesComponent_Template_button_click_31_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(32, "Next");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(33, ZonesComponent_div_33_Template, 21, 7, "div", 12)(34, ZonesComponent_div_34_Template, 22, 5, "div", 13);
      \u0275\u0275element(35, "app-api-loader", 14);
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275property("ngForOf", ctx.zones);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.zones.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate3(" Page ", ctx.currentPage, " / ", ctx.totalPages, " \xB7 Total ", ctx.totalRecords, " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage === 1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
      \u0275\u0275advance();
      \u0275\u0275property("show", ctx.showApiLoader)("fullscreen", true)("message", "Preparing your restaurant data...");
    }
  }, dependencies: [NgForOf, NgIf, FormsModule, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel, ApiLoaderComponent], styles: ["\n\n.zones-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.form-input.input-invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n/*# sourceMappingURL=zones.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZonesComponent, [{
    type: Component,
    args: [{ selector: "app-zones", standalone: true, imports: [NgForOf, NgIf, FormsModule, ApiLoaderComponent], template: `<div class="section-header">
  <div class="section-header-left">
    <h2>Zone Management</h2>
    <p>Create and manage restaurant zones</p>
  </div>
  <div class="section-header-right">
    <button class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Zone</button>
  </div>
</div>

<div class="card" style="overflow-x:auto">
  <table class="data-table">
    <thead>
      <tr>
        <th>Zone Name</th>
        <th>Description</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let z of zones">
        <td><strong>{{ z.name }}</strong></td>
        <td style="font-size:12px;color:var(--text-secondary)">{{ z.description || '\u2014' }}</td>
        <td>
          <button
            class="btn btn-sm"
            [class.btn-primary]="z.is_active"
            [class.btn-secondary]="!z.is_active"
            (click)="toggleZoneStatus(z)"
            [disabled]="isSubmitting"
          >
            {{ z.is_active ? 'Available' : 'Unavailable' }}
          </button>
        </td>
        <td>
          <div style="display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" (click)="openEditModal(z)">Edit</button>
            <button type="button" class="btn btn-danger btn-sm" (click)="deleteZone(z)" [disabled]="isSubmitting">Delete</button>
          </div>
        </td>
      </tr>
      <tr *ngIf="!isLoading && zones.length === 0">
        <td colspan="4" style="text-align:center;color:var(--text-secondary)">No zones found</td>
      </tr>
      <tr *ngIf="isLoading">
        <td colspan="4" style="text-align:center;color:var(--text-secondary)">Loading zones...</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="card" style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
  <span style="font-size:12px;color:var(--text-secondary)">
    Page {{ currentPage }} / {{ totalPages }} \xB7 Total {{ totalRecords }}
  </span>
  <div style="display:flex;gap:8px">
    <button class="btn btn-secondary btn-sm" (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
    <button class="btn btn-secondary btn-sm" (click)="nextPage()" [disabled]="currentPage >= totalPages || isLoading">Next</button>
  </div>
</div>

<div *ngIf="showAddModal" class="modal-backdrop">
  <div class="modal" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h3>Add Zone</h3>
      <button class="modal-close" (click)="showAddModal = false">\u2715</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label" for="zoneName">Name <span class="form-req" aria-hidden="true">*</span></label>
        <input id="zoneName" class="form-input" [class.input-invalid]="zoneNameError" aria-label="Zone name"
          [ngModel]="newZone.name" (ngModelChange)="onZoneNameChange($event)" placeholder="Indoor">
        <div *ngIf="zoneNameError" class="co-form-error">{{ zoneNameError }}</div>
      </div>
      <div class="form-group">
        <label class="form-label" for="zoneDescription">Description</label>
        <textarea id="zoneDescription" class="form-textarea" aria-label="Zone description" rows="3"
          [(ngModel)]="newZone.description" placeholder="Main hall seating area"></textarea>
      </div>
      <!-- <button class="btn btn-primary btn-full" (click)="addZone()">Create Zone</button> -->
      <!-- replace the existing Create Zone button -->
      <button class="btn btn-primary btn-full" (click)="addZone()" [disabled]="isSubmitting">
        {{ isSubmitting ? 'Creating\u2026' : 'Create Zone' }}
      </button>
    </div>
  </div>
</div>

<div *ngIf="showEditModal" class="modal-backdrop" (click)="showEditModal = false">
  <div class="modal" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h3>Edit Zone</h3>
      <button class="modal-close" (click)="showEditModal = false">\u2715</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label" for="editZoneName">Name</label>
        <input id="editZoneName" class="form-input" aria-label="Edit zone name" [(ngModel)]="editZoneData.name">
      </div>
      <div class="form-group">
        <label class="form-label" for="editZoneDescription">Description</label>
        <textarea id="editZoneDescription" class="form-textarea" aria-label="Edit zone description" rows="3"
          [(ngModel)]="editZoneData.description"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">
          <input type="checkbox" [(ngModel)]="editZoneData.is_active"> Available
        </label>
      </div>
      <button class="btn btn-primary btn-full" (click)="updateZone()" [disabled]="isSubmitting">
        {{ isSubmitting ? 'Updating...' : 'Update Zone' }}
      </button>
    </div>
  </div>
</div>

<app-api-loader [show]="showApiLoader" [fullscreen]="true" [message]="'Preparing your restaurant data...'"></app-api-loader>`, styles: ["/* src/app/features/zones/zones.component.css */\n.zones-pagination {\n  display: flex;\n  justify-content: space-between;\n}\n.form-input.input-invalid {\n  border-color: var(--danger);\n}\n/*# sourceMappingURL=zones.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: TableService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZonesComponent, { className: "ZonesComponent", filePath: "src/app/features/zones/zones.component.ts", lineNumber: 17 });
})();
export {
  ZonesComponent
};
//# sourceMappingURL=chunk-JR54QMYK.js.map
