export declare enum ControlType {
    SCALE = 1,
    SCALE_X = 2,
    SCALE_Y = 3,
    SCALE_UNIFORM = 4,
    ROTATE = 5,
    TRANSLATE = 6,
    REGISTRATION = 7,
    SKEW_X = 8,
    SKEW_Y = 9,
    BORDER = 10,
    TARGET = 11,
    ROTATE_SCALE = 12,
    SHAPE_CIRCLE = 1,
    SHAPE_SQUARE = 2,
    SHAPE_BORDER = 3,
}
export declare class Control {
    protected tool: any;
    private type;
    protected x: number;
    protected y: number;
    private offsetX;
    private offsetY;
    hitTestTarget: boolean;
    protected size: number;
    protected shape: any;
    private u;
    private v;
    dynamicUV: boolean;
    protected drawCallback: any;
    private transformCallback;
    constructor(type?: any, u?: any, v?: any, offsetX?: number, offsetY?: number, size?: number);
    setDefaultShape(): void;
    updatePosition(): void;
    draw(ctx: any): void;
    contains(x: number, y: number): any;
}
