import {
  KitchenStationService
} from "./chunk-NPXXJL7H.js";
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
  NgControlStatus,
  NgModel
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import "./chunk-E7QOHDKE.js";
import {
  CommonModule,
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

// src/app/features/kitchen-station/kitchen-station.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function KitchenStationComponent_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "button", 14);
    \u0275\u0275listener("click", function KitchenStationComponent_tr_20_Template_button_click_5_listener() {
      const station_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleActive(station_r2));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "div", 15)(9, "button", 16);
    \u0275\u0275listener("click", function KitchenStationComponent_tr_20_Template_button_click_9_listener() {
      const station_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(station_r2));
    });
    \u0275\u0275text(10, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 17);
    \u0275\u0275listener("click", function KitchenStationComponent_tr_20_Template_button_click_11_listener() {
      const station_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteStation(station_r2));
    });
    \u0275\u0275text(12, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const station_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(station_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("btn-primary", station_r2.isActive)("btn-secondary", !station_r2.isActive);
    \u0275\u0275property("disabled", ctx_r2.isLoading || ctx_r2.togglingStationId === station_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.togglingStationId === station_r2.id ? "Updating..." : station_r2.isActive ? "Active" : "Inactive", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.isLoading || ctx_r2.isSubmitting);
  }
}
function KitchenStationComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "Loading stations...");
    \u0275\u0275elementEnd()();
  }
}
function KitchenStationComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, "No stations found");
    \u0275\u0275elementEnd()();
  }
}
function KitchenStationComponent_div_32_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.nameError);
  }
}
function KitchenStationComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275listener("click", function KitchenStationComponent_div_32_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Create Kitchen Station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function KitchenStationComponent_div_32_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 25);
    \u0275\u0275text(10, " Station Name ");
    \u0275\u0275elementStart(11, "span", 26);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function KitchenStationComponent_div_32_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newStationName, $event) || (ctx_r2.newStationName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, KitchenStationComponent_div_32_div_14_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 29);
    \u0275\u0275listener("click", function KitchenStationComponent_div_32_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createStation());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.nameError);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newStationName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.nameError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Creating..." : "Create", " ");
  }
}
function KitchenStationComponent_div_33_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.nameError);
  }
}
function KitchenStationComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275listener("click", function KitchenStationComponent_div_33_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 21)(3, "h3");
    \u0275\u0275text(4, "Edit Kitchen Station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 22);
    \u0275\u0275listener("click", function KitchenStationComponent_div_33_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23)(8, "div", 24)(9, "label", 31);
    \u0275\u0275text(10, "Station Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function KitchenStationComponent_div_33_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editStation.name, $event) || (ctx_r2.editStation.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, KitchenStationComponent_div_33_div_12_Template, 2, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 29);
    \u0275\u0275listener("click", function KitchenStationComponent_div_33_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateStation());
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275classProp("input-invalid", ctx_r2.nameError);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editStation.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.nameError);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Updating..." : "Update", " ");
  }
}
var KitchenStationComponent = class _KitchenStationComponent {
  toast;
  kitchenStationService;
  stations = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  search = "";
  isLoading = false;
  showCreateModal = false;
  showEditModal = false;
  nameError = "";
  isSubmitting = false;
  togglingStationId = null;
  newStationName = "";
  editStation = { id: "", name: "" };
  constructor(toast, kitchenStationService) {
    this.toast = toast;
    this.kitchenStationService = kitchenStationService;
  }
  ngOnInit() {
    this.loadStations();
  }
  loadStations() {
    this.isLoading = true;
    this.kitchenStationService.stationPagination({
      page: this.currentPage,
      limit: this.pageSize,
      search: this.search
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        const statusCode = Number(response?.statusCode ?? 0);
        if (statusCode !== 200) {
          const apiMessage = response?.message || "Failed to load kitchen stations";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "error");
          return;
        }
        this.stations = (response?.data ?? []).map((s) => ({
          id: String(s.id),
          name: s.name,
          isActive: Boolean(s.is_active ?? true)
        }));
        this.totalRecords = Number(response?.meta?.total ?? 0);
        this.currentPage = Number(response?.meta?.page ?? this.currentPage);
        this.pageSize = Number(response?.meta?.limit ?? this.pageSize);
        this.totalPages = Number(response?.meta?.total_pages ?? 1);
      },
      error: (err) => {
        this.isLoading = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to load kitchen stations";
        const prefix = statusCode ? `Error ${statusCode}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  nextPage() {
    if (this.currentPage >= this.totalPages)
      return;
    this.currentPage += 1;
    this.loadStations();
  }
  prevPage() {
    if (this.currentPage <= 1)
      return;
    this.currentPage -= 1;
    this.loadStations();
  }
  openCreateModal() {
    this.newStationName = "";
    this.nameError = "";
    this.showCreateModal = true;
  }
  createStation() {
    const name = this.newStationName.trim();
    if (!name) {
      this.nameError = "Station name is required.";
      return;
    }
    this.isSubmitting = true;
    this.kitchenStationService.createKitchenStation({ name }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const body = response.body;
        const statusCode = Number(body?.statusCode ?? response.status ?? 0);
        if (![200, 201].includes(statusCode)) {
          const apiMessage = body?.message || "Failed to create station.";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
          return;
        }
        this.currentPage = 1;
        this.showCreateModal = false;
        const createdName = (body?.data?.name ?? name).trim();
        this.toast.show(`Station "${createdName}" created`, "success");
        this.loadStations();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to create station.";
        if (statusCode === 409) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
        } else if (statusCode === 400) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
        } else if (statusCode > 0) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "error");
        } else {
          this.toast.show(apiMessage, "error");
        }
      }
    });
  }
  openEditModal(station) {
    this.editStation = { id: station.id, name: station.name };
    this.nameError = "";
    this.showEditModal = true;
  }
  updateStation() {
    const name = this.editStation.name.trim();
    if (!name) {
      this.nameError = "Station name is required.";
      return;
    }
    const stationId = Number(this.editStation.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show("Invalid station id for update", "warning");
      return;
    }
    this.isSubmitting = true;
    this.kitchenStationService.updateKitchenStation(stationId, { name }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        const body = response.body;
        const statusCode = Number(body?.statusCode ?? response.status ?? 0);
        if (statusCode !== 200) {
          const apiMessage = body?.message || "Failed to update station.";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
          return;
        }
        this.showEditModal = false;
        const updatedName = (body?.data?.name ?? name).trim();
        this.toast.show(`Station "${updatedName}" updated successfully`, "success");
        this.loadStations();
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to update station.";
        if (statusCode === 400 || statusCode === 409) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
        } else if (statusCode > 0) {
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "error");
        } else {
          this.toast.show(apiMessage, "error");
        }
      }
    });
  }
  toggleActive(station) {
    const stationId = Number(station.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show("Invalid station id for status update", "warning");
      return;
    }
    this.togglingStationId = station.id;
    this.kitchenStationService.toggleAvailability(stationId).subscribe({
      next: (response) => {
        this.togglingStationId = null;
        const statusCode = Number(response?.statusCode ?? 0);
        if (statusCode !== 200) {
          const apiMessage = response?.message || "Failed to update station status";
          this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
          return;
        }
        const fromApi = response?.data?.is_active;
        const nextActive = typeof fromApi === "boolean" ? fromApi : !station.isActive;
        this.stations = this.stations.map((s) => s.id === station.id ? __spreadProps(__spreadValues({}, s), { isActive: nextActive }) : s);
        this.toast.show(response?.message || "Station status updated", "success");
      },
      error: (err) => {
        this.togglingStationId = null;
        const statusCode = Number(err?.error?.statusCode ?? err?.status ?? 0);
        const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to update station status";
        const prefix = statusCode ? `Error ${statusCode}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  deleteStation(station) {
    const stationId = Number(station.id);
    if (!Number.isFinite(stationId) || stationId <= 0) {
      this.toast.show("Invalid station id for delete", "warning");
      return;
    }
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will permanently delete station "${station.name}"!`,
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
      this.kitchenStationService.deleteKitchenStation(stationId).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          const body = response;
          const statusCode = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
          if (statusCode !== 200) {
            const apiMessage = body?.message || "Failed to delete station.";
            this.toast.show(`Error ${statusCode}: ${apiMessage}`, "warning");
            return;
          }
          this.toast.show(`Station "${station.name}" deleted`, "success");
          const willPageBeEmpty = this.stations.length === 1 && this.currentPage > 1;
          if (willPageBeEmpty) {
            this.currentPage -= 1;
          }
          this.loadStations();
        },
        error: (err) => {
          this.isSubmitting = false;
          const apiMessage = err?.error?.message || err?.error?.errors?.[0] || "Failed to delete station";
          const statusCode = err?.error?.statusCode ?? err?.status;
          const codePrefix = statusCode ? `Error ${statusCode}: ` : "";
          this.toast.show(`${codePrefix}${apiMessage}`, "error");
        }
      });
    });
  }
  static \u0275fac = function KitchenStationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KitchenStationComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(KitchenStationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KitchenStationComponent, selectors: [["app-kitchen-station"]], decls: 34, vars: 13, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "card", "table-card"], [1, "data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "card", "pagination-card"], [1, "page-meta"], [1, "page-actions"], [1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [3, "show", "fullscreen", "message"], ["class", "modal-backdrop", 4, "ngIf"], ["type", "button", 1, "btn", "btn-sm", 3, "click", "disabled"], [1, "row-actions"], [1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "3", 1, "empty-row"], [1, "modal-backdrop"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], ["for", "stationName", 1, "form-label"], [1, "required-mark"], ["id", "stationName", "placeholder", "Grill", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "field-error", 4, "ngIf"], [1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "field-error"], ["for", "editStationName", 1, "form-label"], ["id", "editStationName", "placeholder", "Grill", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function KitchenStationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Kitchen Station Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "Create and manage kitchen stations");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "button", 3);
      \u0275\u0275listener("click", function KitchenStationComponent_Template_button_click_7_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275text(8, "+ Create Station");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 4)(10, "table", 5)(11, "thead")(12, "tr")(13, "th");
      \u0275\u0275text(14, "Station Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "th");
      \u0275\u0275text(16, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "th");
      \u0275\u0275text(18, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "tbody");
      \u0275\u0275template(20, KitchenStationComponent_tr_20_Template, 13, 8, "tr", 6)(21, KitchenStationComponent_tr_21_Template, 3, 0, "tr", 7)(22, KitchenStationComponent_tr_22_Template, 3, 0, "tr", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 8)(24, "span", 9);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 10)(27, "button", 11);
      \u0275\u0275listener("click", function KitchenStationComponent_Template_button_click_27_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(28, "Previous");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 11);
      \u0275\u0275listener("click", function KitchenStationComponent_Template_button_click_29_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(30, "Next");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(31, "app-api-loader", 12);
      \u0275\u0275template(32, KitchenStationComponent_div_32_Template, 17, 6, "div", 13)(33, KitchenStationComponent_div_33_Template, 15, 6, "div", 13);
    }
    if (rf & 2) {
      \u0275\u0275advance(20);
      \u0275\u0275property("ngForOf", ctx.stations);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.stations.length === 0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate3("Page ", ctx.currentPage, " / ", ctx.totalPages, " \xB7 Total ", ctx.totalRecords, "");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage === 1 || ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.isLoading)("fullscreen", true)("message", "Loading kitchen stations...");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showCreateModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ApiLoaderComponent], styles: ["\n\n.table-card[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary);\n}\n.pagination-card[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.page-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.page-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.input-invalid[_ngcontent-%COMP%] {\n  border-color: var(--danger);\n}\n.field-error[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--danger);\n}\n.required-mark[_ngcontent-%COMP%] {\n  color: var(--danger);\n  font-weight: 700;\n}\n.required-text[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n/*# sourceMappingURL=kitchen-station.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KitchenStationComponent, [{
    type: Component,
    args: [{ selector: "app-kitchen-station", standalone: true, imports: [CommonModule, FormsModule, ApiLoaderComponent], template: `<div class="section-header">\r
  <div class="section-header-left">\r
    <h2>Kitchen Station Management</h2>\r
    <p>Create and manage kitchen stations</p>\r
  </div>\r
  <div class="section-header-right">\r
    <button class="btn btn-primary btn-sm" (click)="openCreateModal()">+ Create Station</button>\r
  </div>\r
</div>\r
\r
<div class="card table-card">\r
  <table class="data-table">\r
    <thead>\r
      <tr>\r
        <th>Station Name</th>\r
        <th>Status</th>\r
        <th>Actions</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      <tr *ngFor="let station of stations">\r
        <td><strong>{{ station.name }}</strong></td>\r
        <td>\r
          <button\r
            type="button"\r
            class="btn btn-sm"\r
            [class.btn-primary]="station.isActive"\r
            [class.btn-secondary]="!station.isActive"\r
            (click)="toggleActive(station)"\r
            [disabled]="isLoading || togglingStationId === station.id"\r
          >\r
            {{ togglingStationId === station.id ? 'Updating...' : (station.isActive ? 'Active' : 'Inactive') }}\r
          </button>\r
        </td>\r
        <td>\r
          <div class="row-actions">\r
            <button class="btn btn-secondary btn-sm" (click)="openEditModal(station)">Edit</button>\r
            <button class="btn btn-danger btn-sm" (click)="deleteStation(station)" [disabled]="isLoading || isSubmitting">Delete</button>\r
          </div>\r
        </td>\r
      </tr>\r
      <tr *ngIf="isLoading">\r
        <td colspan="3" class="empty-row">Loading stations...</td>\r
      </tr>\r
      <tr *ngIf="!isLoading && stations.length === 0">\r
        <td colspan="3" class="empty-row">No stations found</td>\r
      </tr>\r
    </tbody>\r
  </table>\r
</div>\r
\r
<div class="card pagination-card">\r
  <span class="page-meta">Page {{ currentPage }} / {{ totalPages }} \xB7 Total {{ totalRecords }}</span>\r
  <div class="page-actions">\r
    <button class="btn btn-secondary btn-sm" (click)="prevPage()" [disabled]="currentPage === 1 || isLoading">Previous</button>\r
    <button class="btn btn-secondary btn-sm" (click)="nextPage()" [disabled]="currentPage >= totalPages || isLoading">Next</button>\r
  </div>\r
</div>\r
<app-api-loader [show]="isLoading" [fullscreen]="true" [message]="'Loading kitchen stations...'"></app-api-loader>\r
\r
<div *ngIf="showCreateModal" class="modal-backdrop">\r
  <div class="modal" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h3>Create Kitchen Station</h3>\r
      <button class="modal-close" (click)="showCreateModal = false">\u2715</button>\r
    </div>\r
    <div class="modal-body">\r
      <div class="form-group">\r
        <label class="form-label" for="stationName">\r
          Station Name <span class="required-mark">*</span> \r
        </label>\r
        <input\r
          id="stationName"\r
          class="form-input"\r
          [class.input-invalid]="nameError"\r
          [(ngModel)]="newStationName"\r
          placeholder="Grill"\r
        />\r
        <div *ngIf="nameError" class="field-error">{{ nameError }}</div>\r
      </div>\r
      <button class="btn btn-primary btn-full" (click)="createStation()" [disabled]="isSubmitting">\r
        {{ isSubmitting ? 'Creating...' : 'Create' }}\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
\r
<div *ngIf="showEditModal" class="modal-backdrop">\r
  <div class="modal" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h3>Edit Kitchen Station</h3>\r
      <button class="modal-close" (click)="showEditModal = false">\u2715</button>\r
    </div>\r
    <div class="modal-body">\r
      <div class="form-group">\r
        <label class="form-label" for="editStationName">Station Name</label>\r
        <input\r
          id="editStationName"\r
          class="form-input"\r
          [class.input-invalid]="nameError"\r
          [(ngModel)]="editStation.name"\r
          placeholder="Grill"\r
        />\r
        <div *ngIf="nameError" class="field-error">{{ nameError }}</div>\r
      </div>\r
      <button class="btn btn-primary btn-full" (click)="updateStation()" [disabled]="isSubmitting">\r
        {{ isSubmitting ? 'Updating...' : 'Update' }}\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/kitchen-station/kitchen-station.component.css */\n.table-card {\n  overflow-x: auto;\n}\n.row-actions {\n  display: flex;\n  gap: 8px;\n}\n.empty-row {\n  text-align: center;\n  color: var(--text-secondary);\n}\n.pagination-card {\n  margin-top: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.page-meta {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.page-actions {\n  display: flex;\n  gap: 8px;\n}\n.input-invalid {\n  border-color: var(--danger);\n}\n.field-error {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--danger);\n}\n.required-mark {\n  color: var(--danger);\n  font-weight: 700;\n}\n.required-text {\n  color: var(--text-secondary);\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n/*# sourceMappingURL=kitchen-station.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: KitchenStationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KitchenStationComponent, { className: "KitchenStationComponent", filePath: "src/app/features/kitchen-station/kitchen-station.component.ts", lineNumber: 23 });
})();
export {
  KitchenStationComponent
};
//# sourceMappingURL=chunk-6ENIMCBG.js.map
