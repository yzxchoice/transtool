export default class Mouse {
    static x: number;
    static y: number;
    static START: string;
    static MOVE: string;
    static END: string;
    constructor();
    static get(event: any, elem: any): typeof Mouse;
}
