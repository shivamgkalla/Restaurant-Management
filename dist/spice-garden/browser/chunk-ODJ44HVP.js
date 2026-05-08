import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/menu.service.ts
var MenuService = class _MenuService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  createMenu(payload) {
    return this.genricService.Post("items", payload, { observe: "response" });
  }
  editMenu(itemId, payload) {
    return this.genricService.PutWithResponse(`items/${itemId}`, payload);
  }
  deleteMenuById(itemId) {
    return this.genricService.DeleteRequest(`items/${itemId}`);
  }
  toggleAvailability(itemId) {
    return this.genricService.Patch(`items/${itemId}/availability`, {});
  }
  menuPagination(params) {
    const q = new URLSearchParams();
    q.set("page", String(Math.max(1, params.page)));
    q.set("limit", String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set("search", search);
    }
    if (params.category_id && params.category_id > 0) {
      q.set("category_id", String(params.category_id));
    }
    return this.genricService.Get(`items?${q.toString()}`);
  }
  getAllWithSearch(search) {
    const query = search?.trim() ? `items/search?search=${encodeURIComponent(search.trim())}` : "items/search";
    return this.genricService.Get(query);
  }
  static \u0275fac = function MenuService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MenuService, factory: _MenuService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

export {
  MenuService
};
//# sourceMappingURL=chunk-ODJ44HVP.js.map
