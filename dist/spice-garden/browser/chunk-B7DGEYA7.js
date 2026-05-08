import {
  CategoryService
} from "./chunk-TO6XBIYU.js";
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
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJPJV6NU.js";

// src/app/features/category/category.component.ts
var import_sweetalert2 = __toESM(require_sweetalert2_all());
function CategoryComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "div", 14)(10, "button", 15);
    \u0275\u0275listener("click", function CategoryComponent_tr_28_Template_button_click_10_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditModal(c_r2));
    });
    \u0275\u0275text(11, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 16);
    \u0275\u0275listener("click", function CategoryComponent_tr_28_Template_button_click_12_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(c_r2));
    });
    \u0275\u0275text(13, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.description || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.tax_config_id);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.deletingId === c_r2.id);
  }
}
function CategoryComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2, "No category found");
    \u0275\u0275elementEnd()();
  }
}
function CategoryComponent_div_40_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.name);
  }
}
function CategoryComponent_div_40_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.fieldErrors.taxConfigId);
  }
}
function CategoryComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function CategoryComponent_div_40_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.preventModalBackdropClose($event));
    });
    \u0275\u0275elementStart(1, "div", 19);
    \u0275\u0275listener("click", function CategoryComponent_div_40_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 20)(3, "h3");
    \u0275\u0275text(4, "Add Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 21);
    \u0275\u0275listener("click", function CategoryComponent_div_40_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showAddModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 22)(8, "div", 23)(9, "label", 24);
    \u0275\u0275text(10, "Category Name ");
    \u0275\u0275elementStart(11, "span", 25);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_40_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCategory.name, $event) || (ctx_r2.newCategory.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CategoryComponent_div_40_div_14_Template, 2, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 23)(16, "label", 24);
    \u0275\u0275text(17, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 28);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_40_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCategory.description, $event) || (ctx_r2.newCategory.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 23)(20, "label", 24);
    \u0275\u0275text(21, "Tax Config ID ");
    \u0275\u0275elementStart(22, "span", 25);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_40_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newCategory.taxConfigId, $event) || (ctx_r2.newCategory.taxConfigId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, CategoryComponent_div_40_div_25_Template, 2, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 30);
    \u0275\u0275listener("click", function CategoryComponent_div_40_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createCategory());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCategory.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCategory.description);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.fieldErrors.taxConfigId);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newCategory.taxConfigId);
    \u0275\u0275property("readonly", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.fieldErrors.taxConfigId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Creating..." : "Create Category", " ");
  }
}
function CategoryComponent_div_41_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.name);
  }
}
function CategoryComponent_div_41_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editFieldErrors.taxConfigId);
  }
}
function CategoryComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function CategoryComponent_div_41_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.preventModalBackdropClose($event));
    });
    \u0275\u0275elementStart(1, "div", 19);
    \u0275\u0275listener("click", function CategoryComponent_div_41_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 20)(3, "h3");
    \u0275\u0275text(4, "Edit Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 21);
    \u0275\u0275listener("click", function CategoryComponent_div_41_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal = false);
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 22)(8, "div", 23)(9, "label", 24);
    \u0275\u0275text(10, "Category Name ");
    \u0275\u0275elementStart(11, "span", 25);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_41_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCategory.name, $event) || (ctx_r2.editCategory.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CategoryComponent_div_41_div_14_Template, 2, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 23)(16, "label", 24);
    \u0275\u0275text(17, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 33);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_41_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCategory.description, $event) || (ctx_r2.editCategory.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 23)(20, "label", 24);
    \u0275\u0275text(21, "Tax Config ID ");
    \u0275\u0275elementStart(22, "span", 25);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_div_41_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editCategory.taxConfigId, $event) || (ctx_r2.editCategory.taxConfigId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, CategoryComponent_div_41_div_25_Template, 2, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 30);
    \u0275\u0275listener("click", function CategoryComponent_div_41_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateCategory());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.name);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCategory.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCategory.description);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("input-invalid", ctx_r2.editFieldErrors.taxConfigId);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editCategory.taxConfigId);
    \u0275\u0275property("readonly", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editFieldErrors.taxConfigId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSubmitting ? "Updating..." : "Update Category", " ");
  }
}
var CategoryComponent = class _CategoryComponent {
  toast;
  categoryService;
  categories = [];
  isLoading = false;
  isSubmitting = false;
  deletingId = null;
  showAddModal = false;
  showEditModal = false;
  searchInput = "";
  appliedSearch = "";
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  fieldErrors = { name: "", taxConfigId: "" };
  editFieldErrors = { name: "", taxConfigId: "" };
  newCategory = { name: "", description: "", taxConfigId: 1 };
  editCategory = { id: 0, name: "", description: "", taxConfigId: 1 };
  get showCategoryLoader() {
    return this.isLoading || this.isSubmitting || this.deletingId !== null;
  }
  get hasActiveSearch() {
    return !!this.appliedSearch;
  }
  constructor(toast, categoryService) {
    this.toast = toast;
    this.categoryService = categoryService;
  }
  ngOnInit() {
    this.loadCategories(1);
  }
  applySearch() {
    this.appliedSearch = this.searchInput.trim();
    this.loadCategories(1);
  }
  clearSearch() {
    if (!this.searchInput && !this.appliedSearch)
      return;
    this.searchInput = "";
    this.appliedSearch = "";
    this.loadCategories(1);
  }
  prevPage() {
    if (this.currentPage <= 1 || this.isLoading)
      return;
    this.loadCategories(this.currentPage - 1);
  }
  nextPage() {
    if (this.currentPage >= this.totalPages || this.isLoading)
      return;
    this.loadCategories(this.currentPage + 1);
  }
  openAddModal() {
    this.clearFieldErrors();
    this.newCategory = { name: "", description: "", taxConfigId: 1 };
    this.showAddModal = true;
  }
  preventModalBackdropClose(event) {
    event.stopPropagation();
  }
  openEditModal(category) {
    this.clearEditFieldErrors();
    this.editCategory = {
      id: category.id,
      name: category.name,
      description: category.description ?? "",
      taxConfigId: category.tax_config_id
    };
    this.showEditModal = true;
  }
  createCategory() {
    if (this.isSubmitting || !this.validateCreateForm())
      return;
    const payload = {
      name: this.newCategory.name.trim(),
      description: this.newCategory.description.trim(),
      tax_config_id: Number(this.newCategory.taxConfigId)
    };
    this.isSubmitting = true;
    this.categoryService.createCategory(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const statusCode = res.status;
        if (statusCode === 200 || statusCode === 201) {
          this.toast.show("Category created successfully", "success");
          this.showAddModal = false;
          this.loadCategories(1);
          return;
        }
        if (statusCode === 400) {
          this.toast.show("Error 400: Invalid category data.", "warning");
          return;
        }
        if (statusCode === 401) {
          this.toast.show("Error 401: Unauthorized access.", "warning");
          return;
        }
        if (statusCode === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
          return;
        }
        this.toast.show(`Error ${statusCode}: Failed to create category.`, "error");
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = err.status;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
        if (statusCode === 400) {
          this.toast.show(`Error 400: ${apiMessage || "Invalid category data."}`, "warning");
          return;
        }
        if (statusCode === 401) {
          this.toast.show(`Error 401: ${apiMessage || "Unauthorized access."}`, "warning");
          return;
        }
        if (statusCode === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
          return;
        }
        const prefix = statusCode ? `Error ${statusCode}: ` : "";
        this.toast.show(`${prefix}${apiMessage || "Failed to create category."}`, "error");
      }
    });
  }
  updateCategory() {
    if (this.isSubmitting || !this.validateEditForm())
      return;
    const payload = {
      name: this.editCategory.name.trim(),
      description: this.editCategory.description.trim(),
      tax_config_id: Number(this.editCategory.taxConfigId)
    };
    this.isSubmitting = true;
    this.categoryService.updateCategory(this.editCategory.id, payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        const statusCode = res.status;
        if (statusCode === 200) {
          this.toast.show("Category updated successfully", "success");
          this.showEditModal = false;
          this.loadCategories(this.currentPage);
          return;
        }
        if (statusCode === 400) {
          this.toast.show("Error 400: Invalid category data.", "warning");
          return;
        }
        if (statusCode === 401) {
          this.toast.show("Error 401: Unauthorized access.", "warning");
          return;
        }
        if (statusCode === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
          return;
        }
        this.toast.show(`Error ${statusCode}: Failed to update category.`, "error");
      },
      error: (err) => {
        this.isSubmitting = false;
        const statusCode = err.status;
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
        if (statusCode === 400) {
          this.toast.show(`Error 400: ${apiMessage || "Invalid category data."}`, "warning");
          return;
        }
        if (statusCode === 401) {
          this.toast.show(`Error 401: ${apiMessage || "Unauthorized access."}`, "warning");
          return;
        }
        if (statusCode === 500) {
          this.toast.show("Error 500: Server error. Please try again later.", "error");
          return;
        }
        const prefix = statusCode ? `Error ${statusCode}: ` : "";
        this.toast.show(`${prefix}${apiMessage || "Failed to update category."}`, "error");
      }
    });
  }
  deleteCategory(category) {
    if (this.deletingId !== null || this.isSubmitting || this.isLoading)
      return;
    import_sweetalert2.default.fire({
      title: "Are you sure?",
      text: `This action will permanently delete category "${category.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (!result.isConfirmed)
        return;
      this.deletingId = category.id;
      this.categoryService.deleteCategoryById(category.id).subscribe({
        next: (response) => {
          this.deletingId = null;
          const body = response;
          const statusCode = body && typeof body === "object" && body.statusCode != null ? Number(body.statusCode) : 200;
          if (statusCode === 200) {
            this.toast.show(`Category "${category.name}" deleted`, "success");
            const willPageBeEmpty = this.categories.length === 1 && this.currentPage > 1;
            this.loadCategories(willPageBeEmpty ? this.currentPage - 1 : this.currentPage);
            return;
          }
          if (statusCode === 400) {
            this.toast.show(`Error 400: ${body?.message || "Invalid delete request."}`, "warning");
            return;
          }
          if (statusCode === 401) {
            this.toast.show(`Error 401: ${body?.message || "Unauthorized access."}`, "warning");
            return;
          }
          if (statusCode === 500) {
            this.toast.show("Error 500: Server error. Please try again later.", "error");
            return;
          }
          this.toast.show(`Error ${statusCode}: ${body?.message || "Failed to delete category."}`, "error");
        },
        error: (err) => {
          this.deletingId = null;
          const statusCode = err.status;
          const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message;
          if (statusCode === 400) {
            this.toast.show(`Error 400: ${apiMessage || "Invalid delete request."}`, "warning");
            return;
          }
          if (statusCode === 401) {
            this.toast.show(`Error 401: ${apiMessage || "Unauthorized access."}`, "warning");
            return;
          }
          if (statusCode === 500) {
            this.toast.show("Error 500: Server error. Please try again later.", "error");
            return;
          }
          const prefix = statusCode ? `Error ${statusCode}: ` : "";
          this.toast.show(`${prefix}${apiMessage || "Failed to delete category."}`, "error");
        }
      });
    });
  }
  loadCategories(page) {
    this.isLoading = true;
    this.categoryService.categoryPagination({ page, limit: this.pageSize, search: this.appliedSearch || void 0 }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response?.statusCode && response.statusCode !== 200) {
          const msg = response?.message || "Failed to load categories.";
          this.toast.show(`Error ${response.statusCode}: ${msg}`, "warning");
          this.categories = [];
          return;
        }
        const rows = Array.isArray(response?.data) ? response.data : [];
        this.categories = rows;
        this.currentPage = response.meta?.page ?? page;
        this.pageSize = response.meta?.limit ?? this.pageSize;
        this.totalRecords = response.meta?.total ?? rows.length;
        this.totalPages = Math.max(1, response.meta?.total_pages ?? Math.ceil(this.totalRecords / this.pageSize));
      },
      error: (err) => {
        this.isLoading = false;
        this.categories = [];
        const apiMessage = err.error?.message || err.error?.errors?.[0] || err.message || "Failed to load categories.";
        const prefix = err.status ? `Error ${err.status}: ` : "";
        this.toast.show(`${prefix}${apiMessage}`, "error");
      }
    });
  }
  clearFieldErrors() {
    this.fieldErrors = { name: "", taxConfigId: "" };
  }
  clearEditFieldErrors() {
    this.editFieldErrors = { name: "", taxConfigId: "" };
  }
  validateCreateForm() {
    this.clearFieldErrors();
    const name = this.newCategory.name.trim();
    const taxConfigId = Number(this.newCategory.taxConfigId);
    if (!name)
      this.fieldErrors.name = "Category name is required.";
    if (!Number.isInteger(taxConfigId) || taxConfigId <= 0) {
      this.fieldErrors.taxConfigId = "Tax config id must be a positive number.";
    }
    const msg = this.fieldErrors.name || this.fieldErrors.taxConfigId;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  validateEditForm() {
    this.clearEditFieldErrors();
    const name = this.editCategory.name.trim();
    const taxConfigId = Number(this.editCategory.taxConfigId);
    if (!name)
      this.editFieldErrors.name = "Category name is required.";
    if (!Number.isInteger(taxConfigId) || taxConfigId <= 0) {
      this.editFieldErrors.taxConfigId = "Tax config id must be a positive number.";
    }
    const msg = this.editFieldErrors.name || this.editFieldErrors.taxConfigId;
    if (msg) {
      this.toast.show(msg, "warning");
      return false;
    }
    return true;
  }
  static \u0275fac = function CategoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryComponent)(\u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(CategoryService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryComponent, selectors: [["app-category"]], decls: 42, vars: 16, consts: [[1, "section-header"], [1, "section-header-left"], [1, "section-header-right"], [1, "category-actions"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "search", "aria-label", "Search categories", "placeholder", "Search categories...", 1, "form-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "card", "table-wrap"], [1, "data-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "category-pagination"], [3, "show", "fullscreen", "message"], ["class", "modal-backdrop", 3, "click", 4, "ngIf"], [1, "row-actions"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click", "disabled"], ["colspan", "4", 1, "empty-row"], [1, "modal-backdrop", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], [1, "form-req"], ["aria-label", "Category name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["class", "co-form-error", 4, "ngIf"], ["rows", "3", "aria-label", "Category description", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "aria-label", "Tax config id", "aria-readonly", "true", 1, "form-input", 3, "ngModelChange", "ngModel", "readonly"], ["type", "button", 1, "btn", "btn-primary", "btn-full", 3, "click", "disabled"], [1, "co-form-error"], ["aria-label", "Edit category name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["rows", "3", "aria-label", "Edit category description", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "aria-label", "Edit tax config id", "aria-readonly", "true", 1, "form-input", 3, "ngModelChange", "ngModel", "readonly"]], template: function CategoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Category Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 2)(7, "div", 3)(8, "button", 4);
      \u0275\u0275listener("click", function CategoryComponent_Template_button_click_8_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275text(9, "+ Add Category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CategoryComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchInput, $event) || (ctx.searchInput = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function CategoryComponent_Template_input_keydown_enter_10_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function CategoryComponent_Template_button_click_11_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275text(12, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function CategoryComponent_Template_button_click_13_listener() {
        return ctx.clearSearch();
      });
      \u0275\u0275text(14, "Clear");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "div", 7)(16, "table", 8)(17, "thead")(18, "tr")(19, "th");
      \u0275\u0275text(20, "Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th");
      \u0275\u0275text(22, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th");
      \u0275\u0275text(24, "Tax Config ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th");
      \u0275\u0275text(26, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "tbody");
      \u0275\u0275template(28, CategoryComponent_tr_28_Template, 14, 4, "tr", 9)(29, CategoryComponent_tr_29_Template, 3, 0, "tr", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 11)(31, "button", 6);
      \u0275\u0275listener("click", function CategoryComponent_Template_button_click_31_listener() {
        return ctx.prevPage();
      });
      \u0275\u0275text(32, "Prev");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 6);
      \u0275\u0275listener("click", function CategoryComponent_Template_button_click_37_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(38, "Next");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "app-api-loader", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(40, CategoryComponent_div_40_Template, 28, 12, "div", 13)(41, CategoryComponent_div_41_Template, 28, 12, "div", 13);
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.totalRecords, " categories");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchInput);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.searchInput && !ctx.hasActiveSearch || ctx.isLoading);
      \u0275\u0275advance(15);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.categories.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.currentPage <= 1 || ctx.isLoading);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("Page ", ctx.currentPage, " of ", ctx.totalPages, "");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Total: ", ctx.totalRecords, "");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.currentPage >= ctx.totalPages || ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275property("show", ctx.showCategoryLoader)("fullscreen", true)("message", "Loading categories...");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showAddModal);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showEditModal);
    }
  }, dependencies: [NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, ApiLoaderComponent], styles: ["\n\n.category-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n}\n.category-pagination[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=category.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryComponent, [{
    type: Component,
    args: [{ selector: "app-category", standalone: true, imports: [NgForOf, NgIf, FormsModule, ApiLoaderComponent], template: `<div class="section-header">\r
  <div class="section-header-left">\r
    <h2>Category Management</h2>\r
    <p>{{ totalRecords }} categories</p>\r
  </div>\r
  <div class="section-header-right">\r
    <div class="category-actions">\r
      <button type="button" class="btn btn-primary btn-sm" (click)="openAddModal()">+ Add Category</button>\r
      <input\r
        class="form-input"\r
        type="search"\r
        aria-label="Search categories"\r
        [(ngModel)]="searchInput"\r
        (keydown.enter)="applySearch()"\r
        placeholder="Search categories..."\r
      >\r
      <button type="button" class="btn btn-secondary btn-sm" (click)="applySearch()" [disabled]="isLoading">Search</button>\r
      <button type="button" class="btn btn-secondary btn-sm" (click)="clearSearch()" [disabled]="(!searchInput && !hasActiveSearch) || isLoading">Clear</button>\r
    </div>\r
  </div>\r
</div>\r
\r
<div class="card table-wrap">\r
  <table class="data-table">\r
    <thead>\r
      <tr>\r
        <th>Name</th>\r
        <th>Description</th>\r
        <th>Tax Config ID</th>\r
        <th>Actions</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      <tr *ngFor="let c of categories">\r
        <td><strong>{{ c.name }}</strong></td>\r
        <td>{{ c.description || '\u2014' }}</td>\r
        <td>{{ c.tax_config_id }}</td>\r
        <td>\r
          <div class="row-actions">\r
            <button type="button" class="btn btn-secondary btn-sm" (click)="openEditModal(c)">Edit</button>\r
            <button type="button" class="btn btn-danger btn-sm" [disabled]="deletingId === c.id" (click)="deleteCategory(c)">Delete</button>\r
          </div>\r
        </td>\r
      </tr>\r
      <tr *ngIf="!isLoading && categories.length === 0">\r
        <td colspan="4" class="empty-row">No category found</td>\r
      </tr>\r
    </tbody>\r
  </table>\r
</div>\r
\r
<div class="category-pagination">\r
  <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage <= 1 || isLoading" (click)="prevPage()">Prev</button>\r
  <span>Page {{ currentPage }} of {{ totalPages }}</span>\r
  <span>Total: {{ totalRecords }}</span>\r
  <button type="button" class="btn btn-secondary btn-sm" [disabled]="currentPage >= totalPages || isLoading" (click)="nextPage()">Next</button>\r
  <app-api-loader [show]="showCategoryLoader" [fullscreen]="true" [message]="'Loading categories...'"></app-api-loader>\r
</div>\r
\r
<div *ngIf="showAddModal" class="modal-backdrop" (click)="preventModalBackdropClose($event)">\r
  <div class="modal" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h3>Add Category</h3>\r
      <button class="modal-close" (click)="showAddModal = false">\u2715</button>\r
    </div>\r
    <div class="modal-body">\r
      <div class="form-group">\r
        <label class="form-label">Category Name <span class="form-req">*</span></label>\r
        <input class="form-input" [class.input-invalid]="fieldErrors.name" [(ngModel)]="newCategory.name" aria-label="Category name">\r
        <div *ngIf="fieldErrors.name" class="co-form-error">{{ fieldErrors.name }}</div>\r
      </div>\r
      <div class="form-group">\r
        <label class="form-label">Description</label>\r
        <textarea class="form-textarea" rows="3" [(ngModel)]="newCategory.description" aria-label="Category description"></textarea>\r
      </div>\r
      <div class="form-group">\r
        <label class="form-label">Tax Config ID <span class="form-req">*</span></label>\r
        <input class="form-input" type="number" min="1" [class.input-invalid]="fieldErrors.taxConfigId" [(ngModel)]="newCategory.taxConfigId" aria-label="Tax config id" [readonly]="true" aria-readonly="true">\r
        <div *ngIf="fieldErrors.taxConfigId" class="co-form-error">{{ fieldErrors.taxConfigId }}</div>\r
      </div>\r
      <button type="button" class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="createCategory()">\r
        {{ isSubmitting ? 'Creating...' : 'Create Category' }}\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
\r
<div *ngIf="showEditModal" class="modal-backdrop" (click)="preventModalBackdropClose($event)">\r
  <div class="modal" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h3>Edit Category</h3>\r
      <button class="modal-close" (click)="showEditModal = false">\u2715</button>\r
    </div>\r
    <div class="modal-body">\r
      <div class="form-group">\r
        <label class="form-label">Category Name <span class="form-req">*</span></label>\r
        <input class="form-input" [class.input-invalid]="editFieldErrors.name" [(ngModel)]="editCategory.name" aria-label="Edit category name">\r
        <div *ngIf="editFieldErrors.name" class="co-form-error">{{ editFieldErrors.name }}</div>\r
      </div>\r
      <div class="form-group">\r
        <label class="form-label">Description</label>\r
        <textarea class="form-textarea" rows="3" [(ngModel)]="editCategory.description" aria-label="Edit category description"></textarea>\r
      </div>\r
      <div class="form-group">\r
        <label class="form-label">Tax Config ID <span class="form-req">*</span></label>\r
        <input class="form-input" type="number" min="1" [class.input-invalid]="editFieldErrors.taxConfigId" [(ngModel)]="editCategory.taxConfigId" aria-label="Edit tax config id" [readonly]="true" aria-readonly="true">\r
        <div *ngIf="editFieldErrors.taxConfigId" class="co-form-error">{{ editFieldErrors.taxConfigId }}</div>\r
      </div>\r
      <button type="button" class="btn btn-primary btn-full" [disabled]="isSubmitting" (click)="updateCategory()">\r
        {{ isSubmitting ? 'Updating...' : 'Update Category' }}\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/category/category.component.scss */\n.category-actions {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.table-wrap {\n  overflow-x: auto;\n}\n.row-actions {\n  display: flex;\n  gap: 8px;\n}\n.empty-row {\n  text-align: center;\n  color: var(--text-muted);\n}\n.category-pagination {\n  margin-top: 12px;\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=category.component.css.map */\n"] }]
  }], () => [{ type: ToastService }, { type: CategoryService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryComponent, { className: "CategoryComponent", filePath: "src/app/features/category/category.component.ts", lineNumber: 23 });
})();
export {
  CategoryComponent
};
//# sourceMappingURL=chunk-B7DGEYA7.js.map
