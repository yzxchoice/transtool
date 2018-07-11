import { Matrix } from './Matrix'
import Transformable from './Transformable'
export default class Picture {
    image: any;
    transform: any;
    constructor (image: any, x: number, y: number) {
        this.image = image;
        let m = new Matrix(1,0,0,1,x,y);
        let w = image.width || image.clientWidth;
        let h = image.height || image.clientHeight;
        this.transform = new Transformable(w, h, m, this);

        var origin = "0 0";
        var style = image.style;
        if (typeof style.transformOrigin !== "undefined"){
            style.transformOrigin = origin;
            
        }else if (typeof style.webkitTransformOrigin !== "undefined"){
            style.webkitTransformOrigin = origin;
        }else if (typeof style.msTransformOrigin !== "undefined"){
            style.msTransformOrigin = origin;
        }else if (typeof style.MozTransformOrigin !== "undefined"){
            style.MozTransformOrigin = origin;
        }else if (typeof style.OTransformOrigin !== "undefined"){
            style.OTransformOrigin = origin;
        }
    }

    draw () {
        var trans = this.transform.matrix.toString();
        var style = this.image.style;
        
        if (typeof style.transform !== "undefined"){
            style.transform = trans;
            
        }else if (typeof style.webkitTransform !== "undefined"){
            style.webkitTransform = trans;
        }else if (typeof style.msTransform !== "undefined"){
            style.msTransform = trans;
        }else if (typeof style.MozTransform !== "undefined"){
            style.MozTransform = trans;
        }else if (typeof style.OTransform !== "undefined"){
            style.OTransform = trans;
        }
    }
}