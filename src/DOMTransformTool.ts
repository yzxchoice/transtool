import TransformTool from './TransformTool'
export default class DOMTransformTool extends TransformTool {
    constructor (container: any) {
        super(container);
    }

    setControls (controls: any) {
        // remove old, persistent svg elements
        if (this.controls){
            var i = 0;
            var n = this.controls.length;
            for (i=0; i<n; i++){
                this.controls[i].undraw(this.container);
            }
        }
    }

    shouldDraw () {
        return true;
    }
}