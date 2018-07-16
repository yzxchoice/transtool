var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./TransformTool"], function (require, exports, TransformTool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DOMTransformTool = /** @class */ (function (_super) {
        __extends(DOMTransformTool, _super);
        function DOMTransformTool(container) {
            return _super.call(this, container) || this;
        }
        DOMTransformTool.prototype.setControls = function (controls) {
            // remove old, persistent svg elements
            if (this.controls) {
                var i = 0;
                var n = this.controls.length;
                for (i = 0; i < n; i++) {
                    this.controls[i].undraw(this.container);
                }
            }
            _super.prototype.setControls.call(this, controls);
        };
        DOMTransformTool.prototype.shouldDraw = function () {
            return true;
        };
        return DOMTransformTool;
    }(TransformTool_1.default));
    exports.default = DOMTransformTool;
});
//# sourceMappingURL=DOMTransformTool.js.map