import {
  HttpClient
} from "./chunk-E7QOHDKE.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UJPJV6NU.js";

// src/environment/environment.ts
var environment = {
  production: false,
  baseUrl: "https://restaurant-management-lptk.onrender.com/"
};

// src/app/core/services/generic.service.ts
var GenericService = class _GenericService {
  httpClient;
  apiUrl = environment.baseUrl;
  timeoutDuration = 5e3;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  Get(url, params) {
    return this.httpClient.get(this.apiUrl + url);
  }
  Post(url, data, options = {}) {
    return this.httpClient.post(this.apiUrl + url, data, options);
  }
  Put(url, data) {
    return this.httpClient.put(this.apiUrl + url, data);
  }
  PutWithResponse(url, data) {
    return this.httpClient.put(this.apiUrl + url, data, { observe: "response" });
  }
  Patch(url, data) {
    return this.httpClient.patch(this.apiUrl + url, data);
  }
  DeleteRequest(requestUrl) {
    return this.httpClient.delete(this.apiUrl + requestUrl);
  }
  DownloadFile(requestUrl, options) {
    return this.httpClient.get(this.apiUrl + requestUrl, options);
  }
  static \u0275fac = function GenericService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GenericService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GenericService, factory: _GenericService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GenericService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  GenericService
};
//# sourceMappingURL=chunk-FJDPAPFN.js.map
