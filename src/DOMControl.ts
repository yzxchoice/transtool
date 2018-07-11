import { ControlType, Control } from './Control'
export default class DOMControl extends Control {
    private id: any;
    private idCounter: number = 0;
    private idPrefix: string = "-dom-control-";
    constructor (type: any, u?: any, v?: any, offsetX?: number, offsetY?: number, size?: number) {
        super(type, u, v, offsetX, offsetY, size);

        this.id = this.idPrefix + (++this.idCounter);
    }

    undraw () {
        var elem = document.getElementById(this.id);
        if (elem && elem.parentNode){
            elem.parentNode.removeChild(elem);
        }
    }

    setStyle (elem: any, fill?: any) {
        if (fill !== false){
            elem.setAttribute("fill", this.tool.fillStyle);
        }else{
            elem.setAttribute("fill", "none");
        }
        elem.setAttribute("stroke", this.tool.strokeStyle);
        elem.setAttribute("stroke-width", this.tool.lineWidth);
    }

    draw (container: any) {
        // for custom drawing methods, call
        // that method and skip standard drawing
        // if it returns false
        if (this.drawCallback !== null){
            if (!this.drawCallback(this, container)){
                return;
            }
        }
        
        // do not draw for non-positive sizes
        if (this.size <= 0){
            return;
        }
        
        var elem: any = document.getElementById(this.id);
        
        var x = 0;
        var y = 0;
        
        var i = 0;
        var n = 0;
        
        switch(this.shape){
            
            case ControlType.SHAPE_CIRCLE:{
                if (!elem){
                    elem = document.createElementNS(container.namespaceURI, "circle"); 
                    elem.id = this.id;
                    elem.r.baseVal.value = this.size/2;
                    this.setStyle(elem);
                    container.appendChild(elem);
                }
                
                elem.cx.baseVal.value = this.x;
                elem.cy.baseVal.value = this.y;
                break;
            }
            
            case ControlType.SHAPE_SQUARE:{
                if (!elem){
                    elem = document.createElementNS(container.namespaceURI, "rect");
                    elem.id = this.id;
                    elem.width.baseVal.value = this.size;
                    elem.height.baseVal.value = this.size;
                    this.setStyle(elem);
                    container.appendChild(elem);
                }
                
                elem.x.baseVal.value = (this.x - this.size/2);
                elem.y.baseVal.value = (this.y - this.size/2);
                break;
            }
            
            case ControlType.SHAPE_BORDER:{
                if (!elem){
                    elem = document.createElementNS(container.namespaceURI, "polygon");
                    elem.id = this.id;
                    for (i=0; i<4; i++){
                        elem.points.appendItem(container.createSVGPoint());
                    }
                    this.setStyle(elem, false);
                    container.appendChild(elem);
                }
                
                var pt;
                if (this.tool && this.tool.target){
                    var t = this.tool.target;
                    var m = this.tool.endMatrix;
                    
                    pt = elem.points.getItem(0);
                    pt.x = m.x;
                    pt.y = m.y;
                    
                    pt = elem.points.getItem(1);
                    pt.x = m.x + m.a * t.width;
                    pt.y = m.y + m.b * t.width;
                    
                    pt = elem.points.getItem(2);
                    pt.x = m.x + m.a * t.width + m.c * t.height;
                    pt.y = m.y + m.d * t.height + m.b * t.width;
                    
                    pt = elem.points.getItem(3);
                    pt.x = m.x + m.c * t.height;
                    pt.y = m.y + m.d * t.height;
                }
                
                break;
            }
            
            default:{
                // no draw
                break;
            }
        }
        
        // without a target, the control is not displayed
        if (elem && this.tool){
            if (!this.tool.target){
                elem.style.display = "none";
            }else{
                elem.style.display = "";
            }
        }
    }
}