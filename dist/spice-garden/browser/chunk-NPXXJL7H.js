import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/kitchen-station.service.ts
var KitchenStationService = class _KitchenStationService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  createKitchenStation(payload) {
    return this.genricService.Post("kitchen-stations", payload, { observe: "response" });
  }
  updateKitchenStation(stationId, payload) {
    return this.genricService.PutWithResponse(`kitchen-stations/${stationId}`, payload);
  }
  stationPagination(params) {
    const q = new URLSearchParams();
    q.set("page", String(Math.max(1, params.page)));
    q.set("limit", String(Math.min(100, Math.max(1, params.limit))));
    const search = params.search?.trim();
    if (search) {
      q.set("search", search);
    }
    return this.genricService.Get(`kitchen-stations/paginated?${q.toString()}`);
  }
  getAllStations() {
    return this.genricService.Get("kitchen-stations");
  }
  toggleAvailability(stationId) {
    return this.genricService.Patch(`kitchen-stations/${stationId}/toggle-availability`, {});
  }
  deleteKitchenStation(stationId) {
    return this.genricService.DeleteRequest(`kitchen-stations/${stationId}`);
  }
  static \u0275fac = function KitchenStationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KitchenStationService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _KitchenStationService, factory: _KitchenStationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KitchenStationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

export {
  KitchenStationService
};
//# sourceMappingURL=chunk-NPXXJL7H.js.map
