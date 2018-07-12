import ControlSet from './ControlSet'
import DOMTransformTool from './DOMTransformTool';
import Mouse from './Mouse';
import { DOMControl } from '.';
import { ControlType } from './Control';
export default class App {

    static instance: App;

    dom: any;
    tool: any;
    displayList: Array<any>;

    // TODO
    static getInstance(dom?: any, toolElem?: any, displayList?: any) {
        if(!this.instance) {
            this.instance = new App(dom, toolElem, displayList);
        }
        return this.instance;
    }

    constructor (dom?: any, toolElem?: any, displayList?: any) {
        this.dom = dom;
        this.tool = new DOMTransformTool(toolElem);
        this.displayList = displayList;

        toolElem.style.zIndex = this.displayList.length;

        this.setupTool();
        this.bindHandlers();

        // selects pictures on mouse down
        this.dom.addEventListener(Mouse.START, this.down);
        
        // draws initial screen
	    this.render();
    }

    bindHandlers () {
        // instance-specific event handlers bound to this
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.render = this.render.bind(this);
    }

    setupTool () {
        ControlSet.controlClass = DOMControl;
        // var controls = this.getCustomControls();
        this.tool.setControls(ControlSet.getUniformScaler());	
    }

    getCustomControls () {
        var translater = new DOMControl(ControlType.TRANSLATE);
        // translate control is "selected" by clicking
        // on the target's shape, not the control point
        translater.hitTestTarget = true;
        
        var targetContent = new DOMControl(ControlType.TARGET);
        return [
            new DOMControl(ControlType.ROTATE, 0,0, 0,0, 30),
            new DOMControl(ControlType.ROTATE, 0,1, 0,0, 30),
            new DOMControl(ControlType.ROTATE, 1,0, 0,0, 30),
            new DOMControl(ControlType.ROTATE, 1,1, 0,0, 30),
            targetContent, // renders target between controls
            translater,
            new DOMControl(ControlType.BORDER),
            new DOMControl(ControlType.REGISTRATION, .5,.5, 0,0, 10),
            new DOMControl(ControlType.SKEW_Y, 0,.5, 0,0, 10),
            new DOMControl(ControlType.SCALE_X, 1,.5, 0,0, 10),
            new DOMControl(ControlType.SKEW_X, .5,0, 0,0, 10),
            new DOMControl(ControlType.SCALE_Y, .5,1, 0,0, 10),
            new DOMControl(ControlType.SCALE, 0,0, 0,0, 10),
            new DOMControl(ControlType.SCALE, 0,1, 0,0, 10),
            new DOMControl(ControlType.SCALE, 1,0, 0,0, 10),
            new DOMControl(ControlType.SCALE, 1,1, 0,0, 10),
            new DOMControl(ControlType.ROTATE_SCALE, 1,0, 15,-15, 10),
            new DOMControl(ControlType.SCALE_UNIFORM, 1,1, 15,15, 10),
            new DOMControl(ControlType.ROTATE, .5,0, 0,-20)
        ];
    }

    down (event: Event) {
        Mouse.get(event, this.dom);
        var controlled = this.tool.start(Mouse.x, Mouse.y);
        
        // if tool wasnt selected and being controlled
        // attempt to make a new selection at this location
        if (!controlled && this.selectImage(Mouse.x, Mouse.y)){
            // selection occurred
            // force select the translate control
            // to be able to start moving right away
            controlled = this.tool.start(Mouse.x, Mouse.y, this.findControlByType(ControlType.TRANSLATE)); 
        }
        
        if (controlled){
            // events for moving selection
            this.dom.addEventListener(Mouse.MOVE, this.move);
            document.addEventListener(Mouse.END, this.up);
        }
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    move (event: Event) {
        Mouse.get(event, this.dom);
        this.applyDynamicControls(event);
        this.tool.move(Mouse.x, Mouse.y);
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    up (event: Event) {
        this.tool.end();
	
        this.dom.removeEventListener(Mouse.MOVE, this.move);
        document.removeEventListener(Mouse.END, this.up);
        
        requestAnimationFrame(this.render);
        event.preventDefault();
    }

    applyDynamicControls (event: any) {
        // if dynamic, set controls based on 
        // keyboard keys
        var dyn = this.getDynamicControl();
        console.log('dyn:'+dyn);
        if (dyn){
            if (event.ctrlKey){
                if (event.shiftKey){
                    dyn.type = ControlType.ROTATE_SCALE;
                }else{
                    dyn.type = ControlType.ROTATE;
                }
            }else if (event.shiftKey){
                dyn.type = ControlType.SCALE;
            }else{
                dyn.type = ControlType.TRANSLATE;
            }
        }
    }

    getDynamicControl () {
        var i = 0;
        var n = this.tool.controls.length;
        for (i=0; i<n; i++){
            if (this.tool.controls[i].dynamicUV){
                return this.tool.controls[i];
            }
        }
        return null;
    }

    findControlByType(type: any) {
        var i = 0;
        var n = this.tool.controls.length;
        for (i=0; i<n; i++){
            if (this.tool.controls[i].type == type){
                return this.tool.controls[i];
            }
        }
        return null;
    }

    selectImage (x: number, y: number) {
        var pic = null;
        var t = null;
        
        // walk backwards selecting top-most first
        var i = this.displayList.length;
        while (i--){
            pic = this.displayList[i];
            t = pic.transform;
            if (t.matrix.containsPoint(x, y, t.width, t.height)){
                if (this.tool.target !== t){
                    
                    // select
                    this.tool.setTarget(t);
                    // reorder for layer rendering
                    this.displayList.splice(i,1);
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
    }

    render () {
        this.drawDisplayList();
	    this.tool.draw();
    }

    drawDisplayList () {
        var i = 0;
        var n = this.displayList.length;
        for (i=0; i<n; i++){
            this.displayList[i].image.style.zIndex = i;
            this.displayList[i].draw();
        }
    }
}