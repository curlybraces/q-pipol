(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["5c60aa9c"],{3724:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold gt-sm"},[t._v("\n    "+t._s(t.label)+"\n  ")]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-select",{attrs:{dense:"",outlined:"",readonly:t.readonly,disabled:t.disabled,options:t.options,"option-value":"id","option-label":"name","emit-value":"",multiple:t.multiple,hint:t.hint,label:t.label,rules:t.rules,"map-options":"",value:t.value,clearable:"","stack-label":t.$q.screen.lt.sm},on:{input:t.onInput}})],1)])},o=[],a=(n("c5f6"),{name:"SelectComponent",props:{label:{type:String,required:!0},options:Array,multiple:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},hint:String,rules:Array,value:{type:[Number,String,Array]}},data:function(){return{selected:[]}},methods:{onInput:function(t){this.$emit("input",t)}}}),i=a,l=n("2877"),s=Object(l["a"])(i,r,o,!1,null,null,null);e["a"]=s.exports},"6df7":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"q-my-md"},[n("q-card-section",{staticClass:"bg-primary text-white"},[n("div",{staticClass:"row align-center"},[n("div",{staticClass:"text-weight-bold text-uppercase"},[t._v("\n        "+t._s(t.title)+"\n      ")])])]),n("q-separator",{attrs:{color:"primary"}}),n("q-card-section",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[t._t("content")],2)],1)},o=[],a={name:"CardComponent",props:{title:String,onClick:Function,collapsible:{type:Boolean,default:!1}},data:function(){return{show:!0}}},i=a,l=n("2877"),s=Object(l["a"])(i,r,o,!1,null,null,null);e["a"]=s.exports},b227:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{attrs:{padding:""}},[n("p",[t._v("Add Activity")]),n("q-form",{ref:"form"},[n("card-component",{attrs:{title:"Add Activity"},scopedSlots:t._u([{key:"content",fn:function(){return[n("select-component",{attrs:{label:"Operating Unit",options:t.operating_units},model:{value:t.operating_unit,callback:function(e){t.operating_unit=e},expression:"operating_unit"}}),n("select-component",{attrs:{label:"PREXC Activity",options:t.prexc_activities}})]},proxy:!0}])})],1)],1)},o=[],a=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("c47a")),i=n.n(a),l=n("2f62"),s=n("6df7"),c=n("3724");function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(n,!0).forEach(function(e){i()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var d={components:{CardComponent:s["a"],SelectComponent:c["a"]},name:"AddActivity",data:function(){return{operating_unit:null,prexc_activity:null}},computed:u({},Object(l["d"])("dropdown",["prexc_activities","operating_units"])),methods:u({},Object(l["b"])("dropdown",["loadPrexcActivities","loadOperatingUnits"])),mounted:function(){this.loadPrexcActivities(),this.loadOperatingUnits()}},m=d,f=n("2877"),b=Object(f["a"])(m,r,o,!1,null,null,null);e["default"]=b.exports}}]);