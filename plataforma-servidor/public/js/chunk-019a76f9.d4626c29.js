(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-019a76f9"],{"112c":function(t,e,n){},2629:function(t,e,n){"use strict";var i=n("d784"),o=n.n(i);o.a},"4a6c":function(t,e,n){},"5db8":function(t,e,n){"use strict";var i=n("4a6c"),o=n.n(i);o.a},b3d7:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[t.show?n("app-content",{attrs:{contentStyle:t.contentStyle}}):t._e(),t.component.cadaster.on?n("app-cadastro",{attrs:{functions:t.functions},on:{listiner:t.componentController}}):t._e()],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"content-page-component"}},[n("img",{style:t.getStyle(),attrs:{src:"/img/mountain-lake-nature-forest-landscape-scenery-4K-157.jpg"}})])},a=[],r={name:"ContentPageComponent",props:{contentStyle:{type:Object,required:!0}},methods:{getStyle(){return{width:this.contentStyle.width+"px",height:this.contentStyle.height+"px"}}}},c=r,l=n("2877"),h=Object(l["a"])(c,s,a,!1,null,null,null),u=h.exports,d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"cadastro",draggable:t.draggable},on:{dragend:function(e){return t.dragend(e)}}},[t._e(),t._e(),t._e(),t._e(),t.component.client.on?n("app-cliente",{attrs:{functions:t.functions,parentFunction:t.parentFunction}}):t._e()],1)},m=[],p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.getDefaultOffSet(),attrs:{id:"cadatro-cliente"}},[n("div",{staticClass:"option-page"},[n("img",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"img",attrs:{src:"/img/window.png"},on:{click:function(e){return t.onclick("minimize",e)}}}),n("img",{staticClass:"img",attrs:{src:"/img/software.png"},on:{click:function(e){return t.onclick("maximize",e)}}}),n("img",{staticClass:"img",attrs:{src:"/img/close.png"},on:{click:function(e){return t.onclick("close",e)}}})])])},f=[],g={name:"CadastroCliente",props:{functions:{type:Object,required:!0},parentFunction:{type:Object,required:!0}},async mounted(){this.division=await this.functions.getDivision("cadatro-cliente"),this.listen()},data:()=>({division:document.createElement("div"),defaultOffSet:{width:400,height:450},maximize:!1}),methods:{async listen(){},onclick(t,e){"maximize"==t?this.maximize?(this.maximize=!1,this.parentFunction.gragableController(!0),this.functions.maximize(this.division,this.parentFunction.getDivision(),this.defaultOffSet)):(this.maximize=!0,this.parentFunction.gragableController(!1),this.functions.maximize(this.division,this.parentFunction.getDivision())):"close"==t&&this.parentFunction.closeComponent("CadastroCliente")},getDefaultOffSet(){let t={};for(let e in this.defaultOffSet)t[e]="width"==e||"height"==e?this.defaultOffSet[e]+"px":this.defaultOffSet[e];return t}},model:{}},v=g,C=(n("5db8"),Object(l["a"])(v,p,f,!1,null,null,null)),y=C.exports,w={name:"Cadastro",props:{functions:{type:Object,required:!0}},components:{AppCliente:y},async mounted(){this.listen(),this.division=await this.functions.getDivision("cadastro"),this.parentFunction={getDivision:this.getDivision,gragableController:this.gragableController,closeComponent:this.closeComponent}},data:()=>({division:document.createElement("div"),parentFunction:{},draggable:!0,component:{client:{on:!1}},propertie:"cadaster"}),methods:{async listen(){this.$parent.$on("register-client",()=>this.componentController("client"))},gragableController(t){this.draggable=t},async dragend(t){this.functions.setPosition(t.clientX,t.clientY,this.division)},getDivision(){return this.division},closeComponent(t){"CadastroCliente"==t&&(this.component.client.on=!1,this.$emit("listiner",this.propertie))},componentController(t){this.component[t].on=!0,this.functions.eventPromise({eventName:"cursor-loading",data:{on:!1}})},initialOffSet(){}}},b=w,O=(n("d0b4"),Object(l["a"])(b,d,m,!1,null,null,null)),S=O.exports,x={name:"Home",props:{auth:{type:String,required:!1},functions:{type:Object,required:!0},shared:{type:Object,required:!0}},components:{AppContent:u,AppCadastro:S},data:()=>({show:!1,home:null,menu:null,contentStyle:{width:0,height:0},component:{cadaster:{on:!1}}}),mounted(){this.homeListiner(),this.renderContent()},methods:{async homeListiner(){this.$parent.$on("on-resize",()=>this.renderContent()),this.$parent.$on("menu-option",this.menuOption)},async renderContent(){if(!this.home&&!this.menu){let[t,e]=await Promise.all([this.functions.getDivision("router"),this.functions.getDivision("menu")]);this.home=t,this.menu=e}let{innerWidth:t,innerHeight:e}=this.functions.windowOffSet(),{offsetWidth:n,offsetHeight:i}=this.functions.getOffSet(this.menu);this.contentStyle.width=t,this.contentStyle.height=e-i,this.show||(this.show=!0)},async menuOption(t){"cadaster"==t.propertie&&(this.component.cadaster.on=!0,await this.functions.sleep(.5),this.$emit(t.name))},async componentController(t){"cadaster"==t&&(this.component.cadaster.on=!1)}}},_=x,$=(n("2629"),Object(l["a"])(_,i,o,!1,null,null,null));e["default"]=$.exports},d0b4:function(t,e,n){"use strict";var i=n("112c"),o=n.n(i);o.a},d784:function(t,e,n){}}]);
//# sourceMappingURL=chunk-019a76f9.d4626c29.js.map