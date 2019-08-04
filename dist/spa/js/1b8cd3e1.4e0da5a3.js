(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["1b8cd3e1"],{3724:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold gt-sm"},[t._v("\n    "+t._s(t.label)+"\n  ")]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-select",{attrs:{dense:"",outlined:"",readonly:t.readonly,disabled:t.disabled,options:t.options,"option-value":"id","option-label":"name","emit-value":"",multiple:t.multiple,hint:t.hint,label:t.label,rules:t.rules,"map-options":""},on:{input:t.onInput},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)])},r=[],a={name:"SelectComponent",props:{label:{type:String,required:!0},options:Array,multiple:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},onChange:{type:Function,default:null},hint:String,rules:Array},data:function(){return{selected:[]}},methods:{onInput:function(){this.$emit("input",this.selected),null!==this.onChange&&this.onChange()}}},l=a,i=n("2877"),s=Object(i["a"])(l,o,r,!1,null,null,null);e["a"]=s.exports},"3b50":function(t,e,n){},"65fd":function(t,e,n){"use strict";var o=n("3b50"),r=n.n(o);r.a},"6df7":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"q-my-md"},[n("q-card-section",{staticClass:"bg-primary text-white"},[n("div",{staticClass:"row align-center"},[n("div",{staticClass:"text-weight-bold text-uppercase"},[t._v("\n        "+t._s(t.title)+"\n      ")])])]),n("q-separator",{attrs:{color:"primary"}}),n("q-card-section",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[t._t("content")],2),t.show&&t.onClick?n("q-card-actions",{attrs:{align:"center"}},[n("q-btn",{staticClass:"bg-primary text-white",attrs:{icon:"save"},on:{click:t.onClick}},[t._v("Save")])],1):t._e()],1)},r=[],a={name:"CardComponent",props:{title:String,onClick:Function,collapsible:{type:Boolean,default:!1}},data:function(){return{show:!0}}},l=a,i=n("2877"),s=Object(i["a"])(l,o,r,!1,null,null,null);e["a"]=s.exports},7391:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{attrs:{padding:""}},[n("div",{staticClass:"row"},[n("p",[t._v("Edit Project")]),n("q-space"),n("q-btn",{staticClass:"q-ml-md",attrs:{flat:"",round:"",dense:"",icon:t.$q.fullscreen.isActive?"fullscreen_exit":"fullscreen"},on:{click:function(e){return t.$q.fullscreen.toggle()}}})],1),n("general-information",{attrs:{project:t.project}})],1)},r=[],a=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("c47a")),l=n.n(a),i=n("2f62"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("card-component",{attrs:{title:"General Information"},scopedSlots:t._u([{key:"content",fn:function(){return[n("input-component",{attrs:{label:"Project Title",hint:"Project title must match title in budget proposal",readonly:!0},model:{value:t.project.title,callback:function(e){t.$set(t.project,"title",e)},expression:"project.title"}}),n("options-component",{attrs:{label:"Program or Project",options:[{label:"Program",value:1},{label:"Project",value:2}]},model:{value:t.project.pap_type_id,callback:function(e){t.$set(t.project,"pap_type_id",e)},expression:"project.pap_type_id"}}),n("select-component",{attrs:{label:"Basis for Implementation",hint:"Included in any of the following documents",options:t.implementation_bases,multiple:!0},model:{value:t.project.implementation_basis_id,callback:function(e){t.$set(t.project,"implementation_basis_id",e)},expression:"project.implementation_basis_id"}}),n("input-component",{attrs:{type:"textarea",label:"Description",hint:"Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components"},model:{value:t.project.description,callback:function(e){t.$set(t.project,"description",e)},expression:"project.description"}}),n("input-component",{attrs:{type:"textarea",label:"Expected Outputs",hint:"Actual Deliverables, i.e. 100km of paved roads"},model:{value:t.project.expected_outputs,callback:function(e){t.$set(t.project,"expected_outputs",e)},expression:"project.expected_outputs"}})]},proxy:!0}])})},c=[],p=n("6df7"),u=n("3724"),d=n("fd1b"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold"},[t._v(t._s(t.label))]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12 q-col-lg"},[n("q-option-group",{attrs:{options:t.options,value:t.value,inline:""},on:{input:t.onInput}})],1)])},f=[],b=(n("c5f6"),{name:"OptionsComponent",props:{label:String,options:Array,value:Number},data:function(){return{}},methods:{onInput:function(t){this.$emit("input",t)}}}),v=b,y=n("2877"),h=Object(y["a"])(v,m,f,!1,null,null,null),j=h.exports;function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(n,!0).forEach(function(e){l()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var _={components:{CardComponent:p["a"],SelectComponent:u["a"],InputComponent:d["a"],OptionsComponent:j},name:"GeneralInformation",props:{project:Object},data:function(){return{}},computed:O({},Object(i["d"])("dropdown",["implementation_bases"])),methods:O({},Object(i["b"])("dropdown",["loadImplementationBases"])),mounted:function(){this.loadImplementationBases()}},w=_,x=Object(y["a"])(w,s,c,!1,null,null,null),C=x.exports;function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function q(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(n,!0).forEach(function(e){l()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var k={components:{GeneralInformation:C},name:"PageEditProject",data:function(){return{}},computed:q({},Object(i["d"])("projects",["project"])),methods:q({},Object(i["b"])("projects",["loadProject"])),mounted:function(){this.loadProject({id:this.$route.params.id})}},S=k,$=(n("65fd"),Object(y["a"])(S,o,r,!1,null,null,null));e["default"]=$.exports},fd1b:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-3 text-primary text-weight-bold gt-sm"},[t._v(t._s(t.label))]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-input",{attrs:{dense:"",type:t.type,step:t.step,outlined:"",placeholder:t.label,hint:t.hint,rules:t.rules,"lazy-rules":"",value:t.value,readonly:t.readonly},on:{input:t.onInput}})],1)])},r=[],a=(n("c5f6"),{name:"InputComponent",props:{label:String,hint:String,type:String,step:Number,value:String,rules:Array,readonly:{default:!1,type:Boolean}},data:function(){return{}},methods:{onInput:function(t){this.$emit("input",t)}}}),l=a,i=n("2877"),s=Object(i["a"])(l,o,r,!1,null,null,null);e["a"]=s.exports}}]);