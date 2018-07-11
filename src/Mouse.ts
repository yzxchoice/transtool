export default class Mouse {
    static x: number = 0;
    static y: number = 0;
    static START = "mousedown";
    static MOVE = "mousemove";
    static END = "mouseup";

    constructor () {
        throw new Error('can not create a instance');
    }

    static get (event: any, elem: any) {
        if (!elem){
            elem = event.currentTarget;
        }
        
        if (event.touches){
            if (event.touches.length){
                Mouse.x = parseInt(event.touches[0].pageX);
                Mouse.y = parseInt(event.touches[0].pageY);
            }
        }else{
            // mouse events
            Mouse.x = parseInt(event.clientX);
            Mouse.y = parseInt(event.clientY);
        }
    
        var rect = elem.getBoundingClientRect();
        Mouse.x += elem.scrollLeft - elem.clientLeft - rect.left;
        Mouse.y += elem.scrollTop - elem.clientTop - rect.top;
        return Mouse;
    }
}