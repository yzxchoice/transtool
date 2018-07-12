import { DOMControl } from '.';
export default class App {
    static instance: App;
    dom: any;
    tool: any;
    displayList: Array<any>;
    static getInstance(dom?: any, toolElem?: any, displayList?: any): App;
    constructor(dom?: any, toolElem?: any, displayList?: any);
    bindHandlers(): void;
    setupTool(): void;
    getCustomControls(): DOMControl[];
    down(event: Event): void;
    move(event: Event): void;
    up(event: Event): void;
    applyDynamicControls(event: any): void;
    getDynamicControl(): any;
    findControlByType(type: any): any;
    selectImage(x: number, y: number): boolean;
    render(): void;
    drawDisplayList(): void;
}
