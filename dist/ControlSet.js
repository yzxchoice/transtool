define(["require", "exports", "./Control"], function (require, exports, Control_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ControlSet = /** @class */ (function () {
        function ControlSet() {
            throw new Error('can not create a instance');
        }
        ControlSet.getStandard = function () {
            var translater = new this.controlClass(Control_1.ControlType.TRANSLATE);
            translater.hitTestTarget = true;
            return [
                new this.controlClass(Control_1.ControlType.BORDER),
                translater,
                new this.controlClass(Control_1.ControlType.ROTATE, 0, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.ROTATE, 0, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.ROTATE, 1, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.ROTATE, 1, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 0, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 1, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 1, 0, 0, 10)
            ];
        };
        ControlSet.getScaler = function () {
            var translater = new this.controlClass(Control_1.ControlType.TRANSLATE);
            translater.hitTestTarget = true;
            return [
                new this.controlClass(Control_1.ControlType.BORDER),
                translater,
                new this.controlClass(Control_1.ControlType.SCALE, 0, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 0, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 1, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 1, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 0, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 1, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 1, 0, 0, 10)
            ];
        };
        ControlSet.getUniformScaler = function () {
            var translater = new this.controlClass(Control_1.ControlType.TRANSLATE);
            translater.hitTestTarget = true;
            return [
                new this.controlClass(Control_1.ControlType.BORDER),
                translater,
                new this.controlClass(Control_1.ControlType.ROTATE, .5, 0, 0, -20, 10),
                new this.controlClass(Control_1.ControlType.SCALE_UNIFORM, 0, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_UNIFORM, 0, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_UNIFORM, 1, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_UNIFORM, 1, 1, 0, 0, 10)
            ];
        };
        ControlSet.getScalerWithRotate = function () {
            var translater = new this.controlClass(Control_1.ControlType.TRANSLATE, 0, 0, 0, 0, -1);
            // translate control is "selected" by clicking
            // on the target's shape, not the control point
            translater.hitTestTarget = true;
            return [
                new this.controlClass(Control_1.ControlType.BORDER),
                translater,
                new this.controlClass(Control_1.ControlType.ROTATE, .5, 0, 0, -20, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 0, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 0, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 1, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE, 1, 1, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 0, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_X, 1, .5, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 0, 0, 0, 10),
                new this.controlClass(Control_1.ControlType.SCALE_Y, .5, 1, 0, 0, 10)
            ];
        };
        ControlSet.getDynamic = function () {
            var dyn = new this.controlClass(Control_1.ControlType.TRANSLATE);
            dyn.dynamicUV = true;
            dyn.hitTestTarget = true;
            return [
                new this.controlClass(Control_1.ControlType.BORDER),
                dyn
            ];
        };
        return ControlSet;
    }());
    exports.default = ControlSet;
});
//# sourceMappingURL=ControlSet.js.map