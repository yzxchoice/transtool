import App from './App';
import ControlSet from './ControlSet';
import Picture from './Picture';

// window.addEventListener('load', function(){
    let displayList = [
        new Picture(document.getElementById("dunny"),0,0),
        new Picture(document.getElementById("fatcap"),150,100),
        new Picture(document.getElementById("piggy"),300,200),
        new Picture(document.getElementById("text-box"),450,300)
    ];
    new App(document.getElementById("dom"),document.getElementById("svg-tool"), displayList);
// })