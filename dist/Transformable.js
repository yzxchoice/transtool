"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transformable = /** @class */ (function () {
    function Transformable(width, height, matrix, owner) {
        this.width = 0;
        this.height = 0;
        this.width = width;
        this.height = height;
        this.matrix = matrix;
        this.owner = owner;
        this.changed = null;
    }
    return Transformable;
}());
exports.default = Transformable;
