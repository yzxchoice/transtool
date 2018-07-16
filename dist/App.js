define(["require", "exports", "./ControlSet", "./DOMTransformTool", "./Mouse", "./DOMControl", "./Control"], function (require, exports, ControlSet_1, DOMTransformTool_1, Mouse_1, DOMControl_1, Control_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App(dom, toolElem, displayList) {
            this.dom = dom;
            this.tool = new DOMTransformTool_1.default(toolElem);
            this.displayList = displayList;
            toolElem.style.zIndex = this.displayList.length;
            this.setupTool();
            this.bindHandlers();
            // selects pictures on mouse down
            this.dom.addEventListener(Mouse_1.default.START, this.down);
            // draws initial screen
            this.render();
        }
        // TODO
        App.getInstance = function (dom, toolElem, displayList) {
            if (!this.instance) {
                this.instance = new App(dom, toolElem, displayList);
            }
            return this.instance;
        };
        App.prototype.bindHandlers = function () {
            // instance-specific event handlers bound to this
            this.up = this.up.bind(this);
            this.down = this.down.bind(this);
            this.move = this.move.bind(this);
            this.render = this.render.bind(this);
        };
        App.prototype.setupTool = function () {
            ControlSet_1.default.controlClass = DOMControl_1.default;
            // var controls = this.getCustomControls();
            this.tool.setControls(ControlSet_1.default.getUniformScaler());
        };
        App.prototype.getCustomControls = function () {
            var translater = new DOMControl_1.default(Control_1.ControlType.TRANSLATE);
            // translate control is "selected" by clicking
            // on the target's shape, not the control point
            translater.hitTestTarget = true;
            var targetContent = new DOMControl_1.default(Control_1.ControlType.TARGET);
            return [
                new DOMControl_1.default(Control_1.ControlType.ROTATE, 0, 0, 0, 0, 30),
                new DOMControl_1.default(Control_1.ControlType.ROTATE, 0, 1, 0, 0, 30),
                new DOMControl_1.default(Control_1.ControlType.ROTATE, 1, 0, 0, 0, 30),
                new DOMControl_1.default(Control_1.ControlType.ROTATE, 1, 1, 0, 0, 30),
                targetContent,
                translater,
                new DOMControl_1.default(Control_1.ControlType.BORDER),
                new DOMControl_1.default(Control_1.ControlType.REGISTRATION, .5, .5, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SKEW_Y, 0, .5, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE_X, 1, .5, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SKEW_X, .5, 0, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE_Y, .5, 1, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE, 0, 0, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE, 0, 1, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE, 1, 0, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE, 1, 1, 0, 0, 10),
                new DOMControl_1.default(Control_1.ControlType.ROTATE_SCALE, 1, 0, 15, -15, 10),
                new DOMControl_1.default(Control_1.ControlType.SCALE_UNIFORM, 1, 1, 15, 15, 10),
                new DOMControl_1.default(Control_1.ControlType.ROTATE, .5, 0, 0, -20)
            ];
        };
        App.prototype.down = function (event) {
            Mouse_1.default.get(event, this.dom);
            var controlled = this.tool.start(Mouse_1.default.x, Mouse_1.default.y);
            // if tool wasnt selected and being controlled
            // attempt to make a new selection at this location
            if (!controlled && this.selectImage(Mouse_1.default.x, Mouse_1.default.y)) {
                // selection occurred
                // force select the translate control
                // to be able to start moving right away
                controlled = this.tool.start(Mouse_1.default.x, Mouse_1.default.y, this.findControlByType(Control_1.ControlType.TRANSLATE));
            }
            if (controlled) {
                // events for moving selection
                this.dom.addEventListener(Mouse_1.default.MOVE, this.move);
                document.addEventListener(Mouse_1.default.END, this.up);
            }
            requestAnimationFrame(this.render);
            event.preventDefault();
        };
        App.prototype.move = function (event) {
            Mouse_1.default.get(event, this.dom);
            this.applyDynamicControls(event);
            this.tool.move(Mouse_1.default.x, Mouse_1.default.y);
            requestAnimationFrame(this.render);
            event.preventDefault();
        };
        App.prototype.up = function (event) {
            this.tool.end();
            this.dom.removeEventListener(Mouse_1.default.MOVE, this.move);
            document.removeEventListener(Mouse_1.default.END, this.up);
            requestAnimationFrame(this.render);
            event.preventDefault();
        };
        App.prototype.applyDynamicControls = function (event) {
            // if dynamic, set controls based on 
            // keyboard keys
            var dyn = this.getDynamicControl();
            console.log('dyn:' + dyn);
            if (dyn) {
                if (event.ctrlKey) {
                    if (event.shiftKey) {
                        dyn.type = Control_1.ControlType.ROTATE_SCALE;
                    }
                    else {
                        dyn.type = Control_1.ControlType.ROTATE;
                    }
                }
                else if (event.shiftKey) {
                    dyn.type = Control_1.ControlType.SCALE;
                }
                else {
                    dyn.type = Control_1.ControlType.TRANSLATE;
                }
            }
        };
        App.prototype.getDynamicControl = function () {
            var i = 0;
            var n = this.tool.controls.length;
            for (i = 0; i < n; i++) {
                if (this.tool.controls[i].dynamicUV) {
                    return this.tool.controls[i];
                }
            }
            return null;
        };
        App.prototype.findControlByType = function (type) {
            var i = 0;
            var n = this.tool.controls.length;
            for (i = 0; i < n; i++) {
                if (this.tool.controls[i].type == type) {
                    return this.tool.controls[i];
                }
            }
            return null;
        };
        App.prototype.selectImage = function (x, y) {
            var pic = null;
            var t = null;
            // walk backwards selecting top-most first
            var i = this.displayList.length;
            while (i--) {
                pic = this.displayList[i];
                t = pic.transform;
                if (t.matrix.containsPoint(x, y, t.width, t.height)) {
                    if (this.tool.target !== t) {
                        // select
                        this.tool.setTarget(t);
                        // reorder for layer rendering
                        this.displayList.splice(i, 1);
                        this.displayList.push(pic);
                        return true;
                    }
                    // already selected
                    return false;
                }
            }
            // deselect
            this.tool.setTarget(null);
            return false;
        };
        App.prototype.render = function () {
            this.drawDisplayList();
            this.tool.draw();
        };
        App.prototype.drawDisplayList = function () {
            var i = 0;
            var n = this.displayList.length;
            for (i = 0; i < n; i++) {
                this.displayList[i].image.style.zIndex = i;
                this.displayList[i].draw();
            }
        };
        return App;
    }());
    exports.default = App;
});
//# sourceMappingURL=App.js.map