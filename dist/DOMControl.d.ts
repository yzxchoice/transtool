import { Control } from './Control';
export default class DOMControl extends Control {
    private id;
    static idCounter: number;
    static idPrefix: string;
    constructor(type: any, u?: any, v?: any, offsetX?: number, offsetY?: number, size?: number);
    undraw(): void;
    setStyle(elem: any, fill?: any): void;
    draw(container: any): void;
}
