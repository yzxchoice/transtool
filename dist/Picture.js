define(["require", "exports", "./Matrix", "./Transformable"], function (require, exports, Matrix_1, Transformable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Picture = /** @class */ (function () {
        function Picture(image, x, y) {
            this.image = image;
            var m = new Matrix_1.Matrix(1, 0, 0, 1, x, y);
            var w = image.width || image.clientWidth;
            var h = image.height || image.clientHeight;
            this.transform = new Transformable_1.default(w, h, m, this);
            var origin = "0 0";
            var style = image.style;
            if (typeof style.transformOrigin !== "undefined") {
                style.transformOrigin = origin;
            }
            else if (typeof style.webkitTransformOrigin !== "undefined") {
                style.webkitTransformOrigin = origin;
            }
            else if (typeof style.msTransformOrigin !== "undefined") {
                style.msTransformOrigin = origin;
            }
            else if (typeof style.MozTransformOrigin !== "undefined") {
                style.MozTransformOrigin = origin;
            }
            else if (typeof style.OTransformOrigin !== "undefined") {
                style.OTransformOrigin = origin;
            }
        }
        Picture.prototype.draw = function () {
            var trans = this.transform.matrix.toString();
            var style = this.image.style;
            if (typeof style.transform !== "undefined") {
                style.transform = trans;
            }
            else if (typeof style.webkitTransform !== "undefined") {
                style.webkitTransform = trans;
            }
            else if (typeof style.msTransform !== "undefined") {
                style.msTransform = trans;
            }
            else if (typeof style.MozTransform !== "undefined") {
                style.MozTransform = trans;
            }
            else if (typeof style.OTransform !== "undefined") {
                style.OTransform = trans;
            }
        };
        return Picture;
    }());
    exports.default = Picture;
});
//# sourceMappingURL=Picture.js.map