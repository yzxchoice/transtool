define(["require", "exports", "./App", "./Picture"], function (require, exports, App_1, Picture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // window.addEventListener('load', function(){
    var displayList = [
        new Picture_1.default(document.getElementById("dunny"), 0, 0),
        new Picture_1.default(document.getElementById("fatcap"), 150, 100),
        new Picture_1.default(document.getElementById("piggy"), 300, 200),
        new Picture_1.default(document.getElementById("text-box"), 450, 300)
    ];
    new App_1.default(document.getElementById("dom"), document.getElementById("svg-tool"), displayList);
});
// })
//# sourceMappingURL=bootstrap.js.map