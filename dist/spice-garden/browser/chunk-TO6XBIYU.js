import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/category.service.ts
var CategoryService = class _CategoryService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  createCategory(payload) {
    return this.genricService.Post("categories", payload, { observe: "response" });
  }
  categoryPagination(params) {
    const q = new URLSearchParams();
    q.set("page", String(Math.max(1, params.page)));
    q.set("limit", String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set("search", search);
    }
    return this.genricService.Get(`categories/paginated?${q.toString()}`);
  }
  getAllCategories() {
    return this.genricService.Get("categories");
  }
  updateCategory(categoryId, payload) {
    return this.genricService.PutWithResponse(`categories/${categoryId}`, payload);
  }
  deleteCategoryById(categoryId) {
    return this.genricService.DeleteRequest(`categories/${categoryId}`);
  }
  static \u0275fac = function CategoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CategoryService, factory: _CategoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

export {
  CategoryService
};
//# sourceMappingURL=chunk-TO6XBIYU.js.map
