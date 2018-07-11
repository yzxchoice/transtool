export interface MatrixType {
    a: number;
    b: number;
    c: number;
    d: number;
    x: number;
    y: number;
}
export declare class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    x: number;
    y: number;
    static temp: Matrix;
    constructor(a?: number, b?: number, c?: number, d?: number, x?: number, y?: number);
    toString(): string;
    equals(m: MatrixType): boolean;
    identity(): void;
    clone(): Matrix;
    copyFrom(m: MatrixType): void;
    rotate(angle: number): void;
    translate(x: number, y: number): void;
    concat(m: MatrixType): void;
    invert(): void;
    getRotationX(): number;
    getRotationY(): number;
    getTransformedX(x: number, y: number): number;
    getTransformedY(x: number, y: number): number;
    scale(x: number, y: number): void;
    containsPoint(x: number, y: number, w: number, h: number): boolean;
}
