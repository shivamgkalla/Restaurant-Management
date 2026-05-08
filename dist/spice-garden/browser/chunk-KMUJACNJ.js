import {
  GenericService
} from "./chunk-FJDPAPFN.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/app/core/services/customer.service.ts
var CustomerService = class _CustomerService {
  genricService;
  constructor(genricService) {
    this.genricService = genricService;
  }
  createCustomer(payload) {
    return this.genricService.Post("customers", payload, { observe: "response" });
  }
  updateCustomer(id, payload) {
    return this.genricService.Put(`customers/${id}`, payload);
  }
  /** DELETE /customers/{id} */
  deleteCustomer(id) {
    return this.genricService.DeleteRequest(`customers/${id}`);
  }
  customerPagination(payload) {
    const search = payload.search?.trim() ?? "";
    const query = search ? `customers?page=${payload.page}&page_size=${payload.page_size}&search=${encodeURIComponent(search)}` : `customers?page=${payload.page}&page_size=${payload.page_size}`;
    return this.genricService.Get(query);
  }
  getAllCustomers() {
    return this.genricService.Get("customers/search");
  }
  static \u0275fac = function CustomerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerService)(\u0275\u0275inject(GenericService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CustomerService, factory: _CustomerService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: GenericService }], null);
})();

export {
  CustomerService
};
//# sourceMappingURL=chunk-KMUJACNJ.js.map
