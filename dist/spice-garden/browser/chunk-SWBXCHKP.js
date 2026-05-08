import {
  Component,
  Input,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-UJPJV6NU.js";

// src/app/shared/components/api-loader/api-loader.component.ts
function ApiLoaderComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 1)(2, "div", 2)(3, "span", 3);
    \u0275\u0275text(4, "\u{1F37D}\uFE0F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("api-loader-backdrop", ctx_r0.fullscreen)("api-loader-inline", !ctx_r0.fullscreen);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
var ApiLoaderComponent = class _ApiLoaderComponent {
  show = false;
  fullscreen = false;
  message = "Loading...";
  static \u0275fac = function ApiLoaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiLoaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApiLoaderComponent, selectors: [["app-api-loader"]], inputs: { show: "show", fullscreen: "fullscreen", message: "message" }, decls: 1, vars: 1, consts: [[3, "api-loader-backdrop", "api-loader-inline", 4, "ngIf"], [1, "api-loader-card"], [1, "plate-loader"], [1, "plate-loader-icon"], [1, "api-loader-text"]], template: function ApiLoaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ApiLoaderComponent_div_0_Template, 7, 5, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.show);
    }
  }, dependencies: [NgIf], styles: ["\n\n.api-loader-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(8, 10, 18, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1400;\n}\n.api-loader-inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n.api-loader-card[_ngcontent-%COMP%] {\n  min-width: 220px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background:\n    linear-gradient(\n      145deg,\n      #161d2f,\n      #101625);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.api-loader-inline[_ngcontent-%COMP%]   .api-loader-card[_ngcontent-%COMP%] {\n  min-width: auto;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.9);\n  box-shadow: none;\n}\n.plate-loader[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  border: 2px solid rgba(255, 255, 255, 0.22);\n  border-top-color: #f59e0b;\n  animation: _ngcontent-%COMP%_spinPlate 0.95s linear infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.api-loader-backdrop[_ngcontent-%COMP%]   .plate-loader[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-width: 3px;\n}\n.plate-loader-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  transform: translateY(-1px);\n}\n.api-loader-backdrop[_ngcontent-%COMP%]   .plate-loader-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.api-loader-text[_ngcontent-%COMP%] {\n  color: #f9fafb;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n}\n.api-loader-backdrop[_ngcontent-%COMP%]   .api-loader-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@keyframes _ngcontent-%COMP%_spinPlate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=api-loader.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiLoaderComponent, [{
    type: Component,
    args: [{ selector: "app-api-loader", standalone: true, imports: [NgIf], template: '<div *ngIf="show" [class.api-loader-backdrop]="fullscreen" [class.api-loader-inline]="!fullscreen">\n  <div class="api-loader-card">\n    <div class="plate-loader">\n      <span class="plate-loader-icon">\u{1F37D}\uFE0F</span>\n    </div>\n    <div class="api-loader-text">{{ message }}</div>\n  </div>\n</div>\n', styles: ["/* src/app/shared/components/api-loader/api-loader.component.css */\n.api-loader-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(8, 10, 18, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1400;\n}\n.api-loader-inline {\n  display: inline-flex;\n  align-items: center;\n}\n.api-loader-card {\n  min-width: 220px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background:\n    linear-gradient(\n      145deg,\n      #161d2f,\n      #101625);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.api-loader-inline .api-loader-card {\n  min-width: auto;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.9);\n  box-shadow: none;\n}\n.plate-loader {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  border: 2px solid rgba(255, 255, 255, 0.22);\n  border-top-color: #f59e0b;\n  animation: spinPlate 0.95s linear infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.api-loader-backdrop .plate-loader {\n  width: 52px;\n  height: 52px;\n  border-width: 3px;\n}\n.plate-loader-icon {\n  font-size: 13px;\n  transform: translateY(-1px);\n}\n.api-loader-backdrop .plate-loader-icon {\n  font-size: 20px;\n}\n.api-loader-text {\n  color: #f9fafb;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n}\n.api-loader-backdrop .api-loader-text {\n  font-size: 13px;\n}\n@keyframes spinPlate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=api-loader.component.css.map */\n"] }]
  }], null, { show: [{
    type: Input
  }], fullscreen: [{
    type: Input
  }], message: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApiLoaderComponent, { className: "ApiLoaderComponent", filePath: "src/app/shared/components/api-loader/api-loader.component.ts", lineNumber: 11 });
})();

export {
  ApiLoaderComponent
};
//# sourceMappingURL=chunk-SWBXCHKP.js.map
