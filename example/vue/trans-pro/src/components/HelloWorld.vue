<template>
  <div class="hello">
    <div id="dom">
      <img alt="dunny" id="dunny" src="../assets/dunny.png" />
      <img alt="fatcap" id="fatcap" src="../assets/fatcap.png" />
      <img alt="piggy" id="piggy" src="../assets/piggy.png" />
      <div id="text-box">Lorem <b>ipsum</b> dolor <u>sit</u> amet, consectetur <i>adipisicing</i> elit</div>
      <svg id="svg-tool" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    
    <button onClick="App.instance.tool.setControls(ControlSet.getStandard()); App.instance.render();">Standard</button>
    <button onClick="App.instance.tool.setControls(ControlSet.getScaler()); App.instance.render();">Scaler</button>
    <button onClick="App.instance.tool.setControls(ControlSet.getScalerWithRotate()); App.instance.render();">Scaler With Rotate</button>
    <button onClick="App.instance.tool.setControls(ControlSet.getUniformScaler()); App.instance.render();">Uniform Scaler</button>
    <button onClick="App.instance.tool.setControls(ControlSet.getDynamic()); App.instance.render();">Dynamic</button>
    <button onClick="App.instance.tool.setControls(App.instance.getCustomControls()); App.instance.render();">Custom</button>
  </div>
</template>

<script>
import { App, ControlSet, Picture } from 'transrool'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    window.addEventListener('load', function(){
      let displayList = [
        new Picture(document.getElementById("dunny"),0,0),
        new Picture(document.getElementById("fatcap"),150,100),
        new Picture(document.getElementById("piggy"),300,200),
        new Picture(document.getElementById("text-box"),450,300)
      ];
      new App(document.getElementById("dom"),document.getElementById("svg-tool"), displayList);
    })
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
