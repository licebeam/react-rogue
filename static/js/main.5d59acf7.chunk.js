(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(29)},23:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(7),c=n.n(a),o=(n(23),n(8)),l=n(9),u=n(13),s=n(10),d=n(14),p=12,f=24*p/2,m=[{id:f/2+p/2,type:"player",char:"@",img:null},{id:f/2+p/2+2,type:"apple",char:"o",img:null}],h=n(1),g=n(2);function w(){var e=Object(h.a)(["\n  z-index: 100;\n  display: inline-block;\n  flex-direction: column;\n  position: absolute;\n  justify-self: center;\n  align-self: center;\n  font-weight: bold;\n  font-size: ",";\n  height: ",";\n  width: ",";\n  color: ",";\n  overflow: hidden;\n  &:hover{\n    opacity: .8;\n  }\n  .sprite-image{\n    object-fit: cover;\n    height: ",";\n    width: ",";\n  }\n"]);return w=function(){return e},e}function y(){var e=Object(h.a)(["\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n  justify-content: center;\n  text-align: center;\n  z-index: 0;\n  height: ",";\n  width: ",";\n  background-color: ",";\n    color: ",";\n  &:hover{\n    opacity: .8;\n  }\n  .sprite-image{\n    object-fit: cover;\n    height: ",";\n    width: ",";\n  }\n"]);return y=function(){return e},e}function v(){var e=Object(h.a)(["\n  display: grid;\n  grid-template-columns: ",";\n"]);return v=function(){return e},e}var k=g.a.div(v(),"repeat(".concat(p,", ").concat(24,"px)")),E=g.a.div(y(),"".concat(24,"px"),"".concat(24,"px"),function(e){switch(e.tile){case"wall":return"black";case"ground":return"green";case"rock":return"grey";case"tree":return"darkgreen"}},function(e){switch(e.tile){case"wall":return"grey";case"ground":return"darkgreen";case"rock":return"darkgrey";case"tree":return"green"}},"".concat(24,"px"),"".concat(24,"px")),b=g.a.div(w(),"".concat(24*.8,"px"),"".concat(24,"px"),"".concat(24,"px"),function(e){switch(e.tile){case"player":return"orange";case"apple":return"red"}},"".concat(24,"px"),"".concat(24,"px")),x={wall:{name:"wall",char:"X",img:null},ground:{name:"ground",char:"v",img:null},tree:{name:"tree",char:"T",img:null},rock:{name:"rock",char:"M",img:null}},j=function(e){var t,n=[],i=p,r=p,a=e-(p-1);for(t=0;t<e;t++)t+1<=r?n.push({id:t+1,tile:x.wall}):t+1>=a?n.push({id:t+1,tile:x.wall}):t%i===0?n.push({id:t+1,tile:x.wall}):t%i===p-1?n.push({id:t+1,tile:x.wall}):n.push({id:t+1,tile:x.ground});return n=O(n,"rock"),n=O(n,"tree")},O=function(e,t){return e.map(function(e){var n=Math.floor(Math.random()*(f-1+1))+1;return"wall"!==e.tile.name&&(e.id===n+1||e.id===n-1||e.id===n)?{id:e.id,tile:x[t]}:e})},S=function(e,t,n,i){var r=i.find(function(t){return t.id===e.id+n});return t.map(function(t){return r&&t.id===e.id&&!function(e){switch(e){case"tree":case"wall":return!0}}(r.tile.name)&&(t.id+=n),t})},A=function(e){function t(){var e,n;Object(o.a)(this,t);for(var i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(a)))).state={editEntities:m,editTiles:[]},n.fireKey=function(e){var t=n.state,i=t.editEntities,r=t.editTiles,a=i.find(function(e){return"player"===e.type});"ArrowUp"===e.key&&n.setState({editEntities:S(a,i,-p,r)}),"ArrowDown"===e.key&&n.setState({editEntities:S(a,i,p,r)}),"ArrowRight"===e.key&&n.setState({editEntities:S(a,i,1,r)}),"ArrowLeft"===e.key&&n.setState({editEntities:S(a,i,-1,r)})},n.produceEntityOnScreen=function(e){var t=n.state.editEntities.find(function(t){if(t.id===e)return t});if(t)return r.a.createElement(b,{tile:t.type,key:t.id+"tile"},t.img?r.a.createElement("img",{className:"sprite-image",src:t.img,alt:""}):t.char)},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({editTiles:j(f)}),document.addEventListener("DOMContentLoaded",function(){document.addEventListener("keydown",function(t){e.fireKey(t)})})}},{key:"render",value:function(){var e=this,t=this.state,n=t.editTiles,i=t.editEntities;return r.a.createElement("div",{className:"App"},r.a.createElement(k,{className:"tiles"},n?n.map(function(t){return r.a.createElement(E,{tile:t.tile.name,key:t.id},t.tile.img?r.a.createElement("img",{className:"sprite-image",src:t.tile.img,alt:""}):t.tile.char,i?e.produceEntityOnScreen(t.id):null)}):null))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.5d59acf7.chunk.js.map