import TransformTool from './TransformTool';
export default class DOMTransformTool extends TransformTool {
    constructor(container: any);
    setControls(controls: any): void;
    shouldDraw(): boolean;
}
