import {
  StateService
} from "./chunk-NQ4ELL5G.js";
import "./chunk-YRUH6UFD.js";
import {
  FormsModule
} from "./chunk-3VZHFZC7.js";
import {
  ToastService
} from "./chunk-ZS6BNEOG.js";
import {
  AsyncPipe,
  Component,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-UJPJV6NU.js";

// src/app/features/admin/admin.component.ts
function AdminComponent_ng_container_6_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2022 ", r_r1, " ");
  }
}
function AdminComponent_ng_container_6_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ks_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ks_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ks_r2.printer);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ks_r2.categories.join(", "));
  }
}
function AdminComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "span", 8);
    \u0275\u0275text(5, "\u{1F4B8}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 9);
    \u0275\u0275text(7, "Discount Settings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 10)(9, "label", 11);
    \u0275\u0275text(10, "Max Discount %");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 12, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 10)(14, "label", 13);
    \u0275\u0275text(15, "Discount Threshold (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 14, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 10)(19, "label", 15);
    \u0275\u0275text(20, "Discount Reasons");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, AdminComponent_ng_container_6_div_21_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 6)(23, "div", 7)(24, "span", 8);
    \u0275\u0275text(25, "\u{1F5A8}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 9);
    \u0275\u0275text(27, "Kitchen Stations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "table", 17)(29, "thead")(30, "tr")(31, "th");
    \u0275\u0275text(32, "Station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th");
    \u0275\u0275text(34, "Printer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "th");
    \u0275\u0275text(36, "Categories");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "tbody");
    \u0275\u0275template(38, AdminComponent_ng_container_6_tr_38_Template, 7, 3, "tr", 18);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "div", 19)(40, "div", 7)(41, "span", 8);
    \u0275\u0275text(42, "\u{1F3EA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 9);
    \u0275\u0275text(44, "Restaurant Info");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 20)(46, "div")(47, "div", 15);
    \u0275\u0275text(48, "Tax Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 21);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "div", 15);
    \u0275\u0275text(53, "Approval Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 21);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.ngIf;
    \u0275\u0275advance(11);
    \u0275\u0275property("value", s_r3.maxDiscountPct);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", s_r3.discountThreshold);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", s_r3.discountReasons);
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", s_r3.kitchenStations);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(s_r3.taxMode);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r3.approvalMode);
  }
}
var AdminComponent = class _AdminComponent {
  state;
  toast;
  settings$;
  constructor(state, toast) {
    this.state = state;
    this.toast = toast;
  }
  ngOnInit() {
    this.settings$ = this.state.select("settings");
  }
  static \u0275fac = function AdminComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], decls: 8, vars: 3, consts: [["maxDisc", ""], ["discThresh", ""], [1, "section-header"], [1, "section-header-left"], [4, "ngIf"], [1, "grid-2", 2, "gap", "20px"], [1, "card"], [1, "card-header"], [2, "font-size", "20px"], [1, "card-title"], [1, "form-group"], ["for", "maxDiscountPct", 1, "form-label"], ["id", "maxDiscountPct", "type", "number", 1, "form-input", 3, "value"], ["for", "discountThreshold", 1, "form-label"], ["id", "discountThreshold", "type", "number", 1, "form-input", 3, "value"], [1, "form-label"], ["style", "font-size:13px;padding:4px 0;color:var(--text-secondary)", 4, "ngFor", "ngForOf"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "card", 2, "margin-top", "20px"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(220px,1fr))", "gap", "16px"], [2, "font-size", "13px", "color", "var(--text-secondary)"], [2, "font-size", "13px", "padding", "4px 0", "color", "var(--text-secondary)"], [2, "font-family", "var(--font-mono)", "font-size", "11px"], [2, "font-size", "11px", "color", "var(--text-muted)"]], template: function AdminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2");
      \u0275\u0275text(3, "Admin Controls");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5, "System settings for Spice Garden");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(6, AdminComponent_ng_container_6_Template, 56, 6, "ng-container", 4);
      \u0275\u0275pipe(7, "async");
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(7, 1, ctx.settings$));
    }
  }, dependencies: [AsyncPipe, NgForOf, NgIf, FormsModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminComponent, [{
    type: Component,
    args: [{ selector: "app-admin", standalone: true, imports: [AsyncPipe, NgForOf, NgIf, FormsModule], template: `    <div class="section-header">\r
      <div class="section-header-left">\r
        <h2>Admin Controls</h2>\r
        <p>System settings for Spice Garden</p>\r
      </div>\r
    </div>\r
\r
    <ng-container *ngIf="settings$ | async as s">\r
      <div class="grid-2" style="gap:20px">\r
        <div class="card">\r
          <div class="card-header"><span style="font-size:20px">\u{1F4B8}</span><div class="card-title">Discount Settings</div></div>\r
          <div class="form-group">\r
            <label class="form-label" for="maxDiscountPct">Max Discount %</label>\r
            <input id="maxDiscountPct" class="form-input" type="number" [value]="s.maxDiscountPct" #maxDisc>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label" for="discountThreshold">Discount Threshold (\u20B9)</label>\r
            <input id="discountThreshold" class="form-input" type="number" [value]="s.discountThreshold" #discThresh>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">Discount Reasons</label>\r
            <div *ngFor="let r of s.discountReasons" style="font-size:13px;padding:4px 0;color:var(--text-secondary)">\r
              \u2022 {{ r }}\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="card">\r
          <div class="card-header"><span style="font-size:20px">\u{1F5A8}\uFE0F</span><div class="card-title">Kitchen Stations</div></div>\r
          <table class="data-table">\r
            <thead><tr><th>Station</th><th>Printer</th><th>Categories</th></tr></thead>\r
            <tbody>\r
              <tr *ngFor="let ks of s.kitchenStations">\r
                <td>{{ ks.name }}</td>\r
                <td style="font-family:var(--font-mono);font-size:11px">{{ ks.printer }}</td>\r
                <td style="font-size:11px;color:var(--text-muted)">{{ ks.categories.join(', ') }}</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
\r
      <div class="card" style="margin-top:20px">\r
        <div class="card-header"><span style="font-size:20px">\u{1F3EA}</span><div class="card-title">Restaurant Info</div></div>\r
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">\r
          <div>\r
            <div class="form-label">Tax Mode</div>\r
            <div style="font-size:13px;color:var(--text-secondary)">{{ s.taxMode }}</div>\r
          </div>\r
          <div>\r
            <div class="form-label">Approval Mode</div>\r
            <div style="font-size:13px;color:var(--text-secondary)">{{ s.approvalMode }}</div>\r
          </div>\r
        </div>\r
      </div>\r
    </ng-container>\r
  \r
` }]
  }], () => [{ type: StateService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src/app/features/admin/admin.component.ts", lineNumber: 16 });
})();
export {
  AdminComponent
};
//# sourceMappingURL=chunk-NOP6HTBW.js.map
