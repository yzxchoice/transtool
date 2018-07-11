"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mouse = /** @class */ (function () {
    function Mouse() {
        throw new Error('can not create a instance');
    }
    Mouse.get = function (event, elem) {
        if (!elem) {
            elem = event.currentTarget;
        }
        if (event.touches) {
            if (event.touches.length) {
                Mouse.x = parseInt(event.touches[0].pageX);
                Mouse.y = parseInt(event.touches[0].pageY);
            }
        }
        else {
            // mouse events
            Mouse.x = parseInt(event.clientX);
            Mouse.y = parseInt(event.clientY);
        }
        var rect = elem.getBoundingClientRect();
        Mouse.x += elem.scrollLeft - elem.clientLeft - rect.left;
        Mouse.y += elem.scrollTop - elem.clientTop - rect.top;
        return Mouse;
    };
    Mouse.x = 0;
    Mouse.y = 0;
    Mouse.START = "mousedown";
    Mouse.MOVE = "mousemove";
    Mouse.END = "mouseup";
    return Mouse;
}());
exports.default = Mouse;
