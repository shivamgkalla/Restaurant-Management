import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/table.service.ts
var TableService = class _TableService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  createZone(zone) {
    return this.genricService.Post("zones", zone);
  }
  getAllZone() {
    return this.genricService.Get(`zones`);
  }
  /** GET /zones?page=&limit= (1-based page) */
  zonePagination(page, limit) {
    const p = Math.max(1, page);
    const l = Math.min(100, Math.max(1, limit));
    return this.genricService.Get(`zones?page=${p}&limit=${l}`);
  }
  updateZone(id, payload) {
    return this.genricService.Put(`zones/${id}`, payload);
  }
  deleteZone(id) {
    return this.genricService.DeleteRequest(`zones/${id}`);
  }
  createTable(payload) {
    return this.genricService.Post("tables", payload);
  }
  tablePagination(payload) {
    const page = Math.max(1, payload.page);
    const limit = Math.min(100, Math.max(1, payload.limit));
    const search = payload.search?.trim() ?? "";
    const query = search ? `tables?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}` : `tables?page=${page}&limit=${limit}`;
    return this.genricService.Get(query);
  }
  updateTableStatus(tableId, status) {
    return this.genricService.Patch(`tables/${tableId}/status`, { status });
  }
  deleteTable(tableId) {
    return this.genricService.DeleteRequest(`tables/${tableId}`);
  }
  updateTable(tableId, payload) {
    return this.genricService.Put(`tables/${tableId}`, payload);
  }
  static \u0275fac = function TableService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TableService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TableService, factory: _TableService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

export {
  TableService
};
//# sourceMappingURL=chunk-DD55XJ2C.js.map
