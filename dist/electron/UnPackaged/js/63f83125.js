(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["63f83125"],{"05cb":function(e,t,n){},"5c97":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-card",{staticClass:"q-my-md"},[n("q-card-section",{staticClass:"bg-primary text-white"},[n("div",{staticClass:"row align-center"},[n("div",{staticClass:"text-weight-bold text-uppercase"},[e._v("\n        "+e._s(e.title)+"\n      ")]),n("q-space"),e._t("action")],2)]),n("q-separator",{attrs:{color:"primary"}}),n("q-card-section",[e._t("content")],2)],1)},i=[],r={name:"CardComponent",props:{title:String}},a=r,l=n("2877"),s=Object(l["a"])(a,o,i,!1,null,null,null);t["a"]=s.exports},"5e0d":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold gt-sm"},[e._v("\n    "+e._s(e.label)+"\n  ")]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-select",{attrs:{dense:"",outlined:"",readonly:e.readonly,disabled:e.disabled,options:e.options,"option-value":"value","option-label":"label","emit-value":"",multiple:e.multiple,hint:e.hint,label:e.label,rules:e.rules,"map-options":"",value:e.value,clearable:"","stack-label":e.$q.screen.lt.sm},on:{input:e.onInput}})],1)])},i=[],r=(n("c5f6"),{name:"SelectComponent",props:{label:{type:String,required:!0},options:Array,multiple:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},hint:String,rules:Array,value:{type:[Number,String,Array]}},data:function(){return{selected:[]}},methods:{onInput:function(e){this.$emit("input",e)}}}),a=r,l=n("2877"),s=Object(l["a"])(a,o,i,!1,null,null,null);t["a"]=s.exports},"8f6a":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{attrs:{padding:""}},[n("div",{staticClass:"row"},[n("p",[e._v("Add Project")])]),n("card-component",{attrs:{title:"Add Project",onClick:e.addProject},scopedSlots:e._u([{key:"content",fn:function(){return[n("q-banner",{staticClass:"bg-grey-3",scopedSlots:e._u([{key:"avatar",fn:function(){return[n("q-icon",{attrs:{name:"info",color:"primary"}})]},proxy:!0}])},[e._v("\n        This module is "),n("strong",[e._v("only")]),e._v(" for adding new projects. Once\n        added, you may view your projects in the project list and edit to\n        complete and finalize your submission.\n      ")]),n("q-form",{ref:"form",attrs:{autofocus:""},on:{submit:e.onSubmit}},[n("select-component",{attrs:{label:"Implementing Unit",options:e.operating_units,rules:e.rules.required},model:{value:e.form.operating_unit,callback:function(t){e.$set(e.form,"operating_unit",t)},expression:"form.operating_unit"}}),n("input-component",{attrs:{label:"Project Title",hint:"Project title must match title in budget proposal",rules:e.rules.required},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}}),n("multi-select-component",{attrs:{label:"Basis for Implementation",hint:"Included in any of the following documents",options:e.implementation_bases,rules:e.rules.required},model:{value:e.form.implementation_bases,callback:function(t){e.$set(e.form,"implementation_bases",t)},expression:"form.implementation_bases"}}),n("input-component",{attrs:{type:"textarea",label:"Description",hint:"Overview, Purpose, and/or Rationale of the Undertaking, Sub-programs/Components",rules:e.rules.required},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),n("input-component",{attrs:{type:"textarea",label:"Expected Outputs",hint:"Actual Deliverables, i.e. 100km of paved roads",rules:e.rules.required},model:{value:e.form.expected_outputs,callback:function(t){e.$set(e.form,"expected_outputs",t)},expression:"form.expected_outputs"}}),n("select-component",{attrs:{label:"Spatial Coverage",options:e.spatial_coverages,hint:"Choose where your project will be implemented.",rules:e.rules.required},model:{value:e.form.spatial_coverage,callback:function(t){e.$set(e.form,"spatial_coverage",t)},expression:"form.spatial_coverage"}}),2==e.form.spatial_coverage?n("multi-select-component",{attrs:{label:"Regions",options:e.regions,hint:"Select the regions where the project will be implemented.",rules:e.rules.required},model:{value:e.form.regions,callback:function(t){e.$set(e.form,"regions",t)},expression:"form.regions"}}):3==e.form.spatial_coverage?n("select-component",{attrs:{label:"Region",options:e.regions,hint:"Select the region where the project will be implemented.",rules:e.rules.required},model:{value:e.form.regions,callback:function(t){e.$set(e.form,"regions",t)},expression:"form.regions"}}):e._e(),n("select-component",{attrs:{label:"Implementation Start",hint:"Target year of start of implementation",options:e.implementation_periods,rules:e.rules.required},on:{input:e.updateImplementationEnd},model:{value:e.form.implementation_start,callback:function(t){e.$set(e.form,"implementation_start",t)},expression:"form.implementation_start"}}),n("select-component",{attrs:{label:"Implementation End",hint:"Target year of project completion",options:e.filteredImplementationPeriods,readonly:!e.form.implementation_start,rules:e.rules.required},model:{value:e.form.implementation_end,callback:function(t){e.$set(e.form,"implementation_end",t)},expression:"form.implementation_end"}}),n("select-component",{attrs:{label:"Main Funding Source",hint:"Choose the major type of funding source for the PAP.",options:e.funding_sources,rules:e.rules.required},model:{value:e.form.funding_source,callback:function(t){e.$set(e.form,"funding_source",t)},expression:"form.funding_source"}}),2==e.form.funding_source||3==e.form.funding_source?n("select-component",{attrs:{label:"ODA Funding Institutions",options:e.funding_institutions,rules:e.rules.required},model:{value:e.form.funding_institution,callback:function(t){e.$set(e.form,"funding_institution",t)},expression:"form.funding_institution"}}):e._e(),99==e.form.funding_institution?n("input-component",{attrs:{label:"Other Funding Institution",rules:e.rules.required},model:{value:e.form.other_funding_institution,callback:function(t){e.$set(e.form,"other_funding_institution",t)},expression:"form.other_funding_institution"}}):e._e(),n("select-component",{attrs:{label:"Categorization",hint:"Indicate the status of the PAP.",options:e.categorizations,rules:e.rules.required},model:{value:e.form.categorization,callback:function(t){e.$set(e.form,"categorization",t)},expression:"form.categorization"}}),2==e.form.categorization?n("select-component",{attrs:{label:"Project Preparation Document",options:e.preparation_documents,rules:e.rules.required},model:{value:e.form.preparation_document,callback:function(t){e.$set(e.form,"preparation_document",t)},expression:"form.preparation_document"}}):e._e(),1==e.form.categorization||3==e.form.categorization?n("input-component",{attrs:{label:"UACS Code",hint:"UACS code is optional for new PAPs.",rules:e.rules.required},model:{value:e.form.uacs_code,callback:function(t){e.$set(e.form,"uacs_code",t)},expression:"form.uacs_code"}}):e._e(),n("input-component",{attrs:{type:"number",label:"Total Project Cost (in PhP)",hint:"Total cost of the project in absolute terms",rules:e.rules.required},model:{value:e.form.total_cost,callback:function(t){e.$set(e.form,"total_cost",t)},expression:"form.total_cost"}}),n("div",{staticClass:"text-center"},[n("q-btn",{attrs:{icon:"save",color:"primary",type:"submit"}},[e._v("\n            Save\n          ")])],1)],1)]},proxy:!0}])})],1)},i=[],r=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("c47a")),a=n.n(r),l=n("2f62"),s=n("5c97"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-3 text-primary text-weight-bold gt-sm"},[e._v(e._s(e.label))]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-input",{attrs:{label:e.label,dense:"",type:e.type,outlined:"",hint:e.hint,rules:e.rules,"lazy-rules":"",value:e.value,readonly:e.readonly,"stack-label":e.$q.screen.lt.sm},on:{input:e.onInput}})],1)])},c=[],p=(n("c5f6"),{name:"InputComponent",props:{label:String,hint:String,type:String,value:[String,Number],rules:Array,readonly:{default:!1,type:Boolean}},data:function(){return{}},methods:{onInput:function(e){this.$emit("input",e)}}}),m=p,d=n("2877"),f=Object(d["a"])(m,u,c,!1,null,null,null),b=f.exports,g=n("5e0d"),_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row items-start q-my-md"},[n("div",{staticClass:"col-md-3 text-primary text-weight-bold gt-sm"},[e._v("\n    "+e._s(e.label)+"\n  ")]),n("div",{staticClass:"col-md-9 col-sm-12 col-xs-12"},[n("q-select",{attrs:{dense:"",outlined:"",readonly:e.readonly,disabled:e.disabled,options:e.options,"option-value":"id","option-label":"name","emit-value":"",value:e.value,multiple:"",hint:e.hint,label:e.label,rules:e.rules,"stack-label":e.$q.screen.lt.sm,"map-options":"",clearable:""},on:{input:e.onInput}})],1)])},h=[],v={name:"SelectComponent",props:{label:{type:String,required:!0},options:Array,multiple:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},onChange:{type:Function,default:null},hint:String,rules:Array,value:Array},data:function(){return{selected:[]}},methods:{onInput:function(e){this.$emit("input",e)}}},y=v,j=Object(d["a"])(y,_,h,!1,null,null,null),x=j.exports;function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(n,!0).forEach(function(t){a()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var O={components:{SelectComponent:g["a"],MultiSelectComponent:x,CardComponent:s["a"],InputComponent:b},name:"PageAddProject",data:function(){return{filteredImplementationPeriods:[],form:{operating_unit:null,title:null,expected_outputs:null,implementation_bases:[],description:null,spatial_coverage:null,regions:[],implementation_start:null,implementation_end:null,funding_source:null,categorization:null,uacs_code:null,preparation_document:null,total_cost:null},rules:{required:[function(e){return!!e||"This field is required."}],select:[function(e){return e.length>0||"This field is required"}]}}},computed:{categorizations:function(){return this.$store.state.categorizations.categorizations}},methods:C({},Object(l["b"])("categorizations",["loadCategorizations"]),{},Object(l["b"])("operating_units",["loadOperatingUnits"]),{},Object(l["b"])("implementation_bases",["loadImplementationBases"]),{},Object(l["b"])("spatial_coverages",["loadSpatialCoverages"]),{},Object(l["b"])("regions",["loadRegions"]),{},Object(l["b"])("implementation_periods",["loadImplementationPeriods"]),{},Object(l["b"])("funding_institutions",["loadFundingInstitutions"]),{},Object(l["b"])("funding_sources",["loadFundingSources"]),{},Object(l["b"])("preparation_documents",["loadPreparationDocuments"]),{},Object(l["b"])("projects",["addProject"]),{init:function(){this.loadCategorizations(),this.loadOperatingUnits(),this.loadImplementationBases(),this.loadSpatialCoverages(),this.loadRegions(),this.loadImplementationPeriods(),this.loadFundingInstitutions(),this.loadFundingSources(),this.loadPreparationDocuments()},updateImplementationEnd:function(e){var t=[],n=parseInt(e);t=this.implementation_periods.filter(function(e){return parseInt(e.value)>=n}),this.filteredImplementationPeriods=t},addProject:function(e){var t=this;this.$q.loading.show(),this.$axios.post("/projects",e).then(function(){t.$q.loading.hide(),t.$router.push("/projects")}).catch(function(e){console.log(e.message)})},onSubmit:function(){this.addProject(this.form)}}),mounted:function(){this.init()}},P=O,w=(n("97b5"),Object(d["a"])(P,o,i,!1,null,null,null));t["default"]=w.exports},"97b5":function(e,t,n){"use strict";var o=n("05cb"),i=n.n(o);i.a}}]);