(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["7f7e7d8c"],{"05cb":function(t,e,n){},3724:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold gt-sm"},[t._v("\n    "+t._s(t.label)+"\n  ")]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-select",{attrs:{dense:"",outlined:"",readonly:t.readonly,disabled:t.disabled,options:t.options,"option-value":"id","option-label":"name","emit-value":"",multiple:t.multiple,hint:t.hint,label:t.label,rules:t.rules,"map-options":""},on:{input:t.onInput},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)])},i=[],a={name:"SelectComponent",props:{label:{type:String,required:!0},options:Array,multiple:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},onChange:{type:Function,default:null},hint:String,rules:Array},data:function(){return{selected:[]}},methods:{onInput:function(){this.$emit("input",this.selected),null!==this.onChange&&this.onChange()}}},r=a,s=n("2877"),l=Object(s["a"])(r,o,i,!1,null,null,null);e["a"]=l.exports},"6df7":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",{staticClass:"q-my-md"},[n("q-card-section",{staticClass:"bg-primary text-white"},[n("div",{staticClass:"row align-center"},[n("div",{staticClass:"text-weight-bold text-uppercase"},[t._v("\n        "+t._s(t.title)+"\n      ")])])]),n("q-separator",{attrs:{color:"primary"}}),n("q-card-section",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[t._t("content")],2),t.show&&t.onClick?n("q-card-actions",{attrs:{align:"center"}},[n("q-btn",{staticClass:"bg-primary text-white",attrs:{icon:"save"},on:{click:t.onClick}},[t._v("Save")])],1):t._e()],1)},i=[],a={name:"CardComponent",props:{title:String,onClick:Function,collapsible:{type:Boolean,default:!1}},data:function(){return{show:!0}}},r=a,s=n("2877"),l=Object(s["a"])(r,o,i,!1,null,null,null);e["a"]=l.exports},"8f6a":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{attrs:{padding:""}},[n("div",{staticClass:"row"},[n("p",[t._v("Add Project")]),n("q-space"),n("q-btn",{staticClass:"q-ml-md",attrs:{flat:"",round:"",dense:"",icon:t.$q.fullscreen.isActive?"fullscreen_exit":"fullscreen"},on:{click:function(e){return t.$q.fullscreen.toggle()}}})],1),n("card-component",{attrs:{title:"Add Project",onClick:t.addProject},scopedSlots:t._u([{key:"content",fn:function(){return[n("q-banner",{staticClass:"bg-grey-3",scopedSlots:t._u([{key:"avatar",fn:function(){return[n("q-icon",{attrs:{name:"info",color:"primary"}})]},proxy:!0}])},[t._v("\n        This module is "),n("strong",[t._v("only")]),t._v(" for adding new projects. Once\n        added, you may view your projects in the project list and edit to\n        complete and finalize your submission.\n      ")]),n("select-component",{attrs:{label:"Implementing Unit",options:t.operating_units},model:{value:t.form.operating_unit,callback:function(e){t.$set(t.form,"operating_unit",e)},expression:"form.operating_unit"}}),n("input-component",{attrs:{label:"Project Title",hint:"Project title must match title in budget proposal",rules:[function(t){return!!t||"Title is required."}]},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),n("select-component",{attrs:{label:"Basis for Implementation",hint:"Included in any of the following documents",options:t.implementation_bases,multiple:!0},model:{value:t.form.implementation_bases,callback:function(e){t.$set(t.form,"implementation_bases",e)},expression:"form.implementation_bases"}}),n("input-component",{attrs:{type:"textarea",label:"Description",hint:"Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components",rules:[function(t){return!!t||"Project description is required."}]},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),n("input-component",{attrs:{type:"textarea",label:"Expected Outputs",hint:"Actual Deliverables, i.e. 100km of paved roads",rules:[function(t){return!!t||"Project description is required."}]},model:{value:t.form.expected_outputs,callback:function(e){t.$set(t.form,"expected_outputs",e)},expression:"form.expected_outputs"}}),n("select-component",{attrs:{label:"Spatial Coverage",options:t.spatial_coverages,hint:"Choose where your project will be implemented."},model:{value:t.form.spatial_coverage,callback:function(e){t.$set(t.form,"spatial_coverage",e)},expression:"form.spatial_coverage"}}),2==t.form.spatial_coverage||3==t.form.spatial_coverage?n("select-component",{attrs:{label:"Region/s",options:t.regions,multiple:2==t.form.spatial_coverage,hint:3==t.form.spatial_coverage?"Select region":"Select as many as applicable"},model:{value:t.form.regions,callback:function(e){t.$set(t.form,"regions",e)},expression:"form.regions"}}):t._e(),n("select-component",{attrs:{label:"Implementation Start",hint:"Target year of start of implementation",options:t.implementation_periods},on:{input:t.updateImplementationEnd},model:{value:t.form.implementation_start,callback:function(e){t.$set(t.form,"implementation_start",e)},expression:"form.implementation_start"}}),n("select-component",{attrs:{label:"Implementation End",hint:"Target year of project completion",options:t.filteredImplementationPeriods,readonly:!t.form.implementation_start},model:{value:t.form.implementation_end,callback:function(e){t.$set(t.form,"implementation_end",e)},expression:"form.implementation_end"}}),n("select-component",{attrs:{label:"Main Funding Source",hint:"Choose the major type of funding source for the PAP.",options:t.funding_sources},model:{value:t.form.funding_source,callback:function(e){t.$set(t.form,"funding_source",e)},expression:"form.funding_source"}}),2==t.form.funding_source||3==t.form.funding_source?n("select-component",{attrs:{label:"ODA Funding Institutions",options:t.funding_institutions},model:{value:t.form.funding_institution,callback:function(e){t.$set(t.form,"funding_institution",e)},expression:"form.funding_institution"}}):t._e(),99==t.form.funding_institution?n("input-component",{attrs:{label:"Other Funding Institution"},model:{value:t.form.other_funding_institution,callback:function(e){t.$set(t.form,"other_funding_institution",e)},expression:"form.other_funding_institution"}}):t._e(),n("select-component",{attrs:{label:"Categorization",hint:"Indicate the status of the PAP.",options:t.categorizations},model:{value:t.form.categorization,callback:function(e){t.$set(t.form,"categorization",e)},expression:"form.categorization"}}),2==t.form.categorization?n("select-component",{attrs:{label:"Project Preparation Document",options:t.preparation_documents},model:{value:t.form.preparation_document,callback:function(e){t.$set(t.form,"preparation_document",e)},expression:"form.preparation_document"}}):t._e(),1==t.form.categorization||3==t.form.categorization?n("input-component",{attrs:{label:"UACS Code",hint:"UACS code is optional for new PAPs."},model:{value:t.form.uacs_code,callback:function(e){t.$set(t.form,"uacs_code",e)},expression:"form.uacs_code"}}):t._e(),n("input-component",{attrs:{type:"number",label:"Total Project Cost (in PhP)",hint:"Total cost of the project in absolute terms"},model:{value:t.form.total_cost,callback:function(e){t.$set(t.form,"total_cost",e)},expression:"form.total_cost"}})]},proxy:!0}])})],1)},i=[],a=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("7f7f"),n("c47a")),r=n.n(a),s=n("2f62"),l=n("fd1b"),c=n("6df7"),u=n("3724");function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(n,!0).forEach(function(e){r()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var d={components:{SelectComponent:u["a"],CardComponent:c["a"],InputComponent:l["a"]},name:"PageAddProject",data:function(){return{filteredImplementationPeriods:[],form:{title:"Title",description:"Description",expected_outputs:"Outputs"}}},computed:m({},Object(s["d"])("dropdown",["categorizations","operating_units","implementation_bases","spatial_coverages","regions","implementation_periods","funding_sources","funding_institutions"])),methods:m({},Object(s["b"])("dropdown",["loadCategorizations","loadOperatingUnits","loadImplementationBases","loadSpatialCoverages","loadRegions","loadImplementationPeriods","loadFundingInstitutions","loadFundingSources"]),{init:function(){this.loadCategorizations(),this.loadOperatingUnits(),this.loadImplementationBases(),this.loadSpatialCoverages(),this.loadRegions(),this.loadImplementationPeriods(),this.loadFundingInstitutions(),this.loadFundingSources()},updateImplementationEnd:function(t){var e=[],n=parseInt(t);e=this.implementation_periods.filter(function(t){return parseInt(t.name)>=n}),this.filteredImplementationPeriods=e},addProject:function(){var t=this;this.$q.loading.show(),this.$axios.post("/projects",this.form).then(function(e){t.$q.notify({message:e.data,color:"secondary",position:"top"}),t.$q.loading.hide(),t.$router.push("/projects")}).catch(function(e){t.$q.notify({message:e.message,color:"red",position:"top"})})}}),mounted:function(){this.init()}},f=d,g=(n("97b5"),n("2877")),b=Object(g["a"])(f,o,i,!1,null,null,null);e["default"]=b.exports},"97b5":function(t,e,n){"use strict";var o=n("05cb"),i=n.n(o);i.a},fd1b:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-3 text-primary text-weight-bold gt-sm"},[t._v(t._s(t.label))]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-input",{attrs:{dense:"",type:t.type,step:t.step,outlined:"",placeholder:t.label,hint:t.hint,rules:t.rules,"lazy-rules":"",value:t.value,readonly:t.readonly},on:{input:t.onInput}})],1)])},i=[],a=(n("c5f6"),{name:"InputComponent",props:{label:String,hint:String,type:String,step:Number,value:String,rules:Array,readonly:{default:!1,type:Boolean}},data:function(){return{}},methods:{onInput:function(t){this.$emit("input",t)}}}),r=a,s=n("2877"),l=Object(s["a"])(r,o,i,!1,null,null,null);e["a"]=l.exports}}]);