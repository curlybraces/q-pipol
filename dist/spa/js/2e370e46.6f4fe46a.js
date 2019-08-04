(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2e370e46"],{"8f38":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{attrs:{padding:""}},[r("p",[t._v("View Projects")]),r("q-input",{staticClass:"q-mb-md",attrs:{outlined:"",dense:"",rounded:"",clearable:"",placeholder:"Search in project titles..."},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},scopedSlots:t._u([{key:"append",fn:function(){return[r("q-icon",{attrs:{name:"search"},on:{click:t.search}})]},proxy:!0}]),model:{value:t.searchField,callback:function(e){t.searchField=e},expression:"searchField"}}),r("list-component",{attrs:{items:t.projects}}),r("fab-component",{attrs:{link:"/projects/add"}})],1)},o=[],s=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("456d"),r("6b54"),r("06db"),r("386d"),r("c47a")),c=r.n(s),i=r("2f62"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-list",{staticClass:"rounded-borders",attrs:{bordered:"",separator:""}},t._l(t.items,function(e){return r("q-item",{key:e.id,attrs:{clickable:""},on:{click:function(r){return t.goTo(e.id)}}},[r("q-item-section",{staticClass:"col-2 gt-sm"},[r("q-item-label",{staticClass:"q-mt-sm"},[t._v(t._s(e.operating_unit.name))])],1),r("q-item-section",[r("q-item-label",{attrs:{lines:"1"}},[r("span",{staticClass:"text-weight-medium"},[t._v(t._s(e.title))])]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[t._v("\n        "+t._s(e.description)+"\n      ")]),r("q-item-label",{attrs:{caption:"",lines:"1"}},[t._v("\n        [ "+t._s(e.implementation_start+" - "+e.implementation_end)+" ]\n      ")])],1),r("q-item-section",{attrs:{side:""}},[r("q-item-label",[t._v("\n        PhP "+t._s(Number(e.total_cost).toLocaleString())+"\n      ")])],1),r("q-item-section",{attrs:{side:""}},[r("div",{staticClass:"text-grey-8 q-gutter-xs"},[r("q-btn",{staticClass:"gt-xs",attrs:{size:"12px",flat:"",dense:"",round:"",icon:"edit",color:"green",to:"/projects/"+e.id}}),r("q-btn",{staticClass:"gt-xs",attrs:{size:"12px",flat:"",dense:"",round:"",icon:"delete",color:"red"},on:{click:function(r){return r.stopPropagation(),t.promptToDelete(e.id)}}})],1)])],1)}),1)},l=[];function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(r,!0).forEach(function(e){c()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var d={name:"ListComponent",props:{items:Array},data:function(){return{}},methods:p({},Object(i["b"])("projects",["deleteProject"]),{goTo:function(t){this.$router.push("/projects/"+t)},promptToDelete:function(t){var e=this;this.$q.dialog({title:"Confirm Delete",message:"Are you sure you want to delete this item #"+t+"?",ok:{color:"primary"},cancel:{color:"negative"},persistent:!0}).onOk(function(){console.log("deleted"),e.deleteProject({id:t})})}})},f=d,b=r("2877"),m=Object(b["a"])(f,a,l,!1,null,null,null),j=m.exports,h=r("d98b");function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(r,!0).forEach(function(e){c()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var y={components:{FabComponent:h["a"],ListComponent:j},name:"PageViewProjects",data:function(){return{}},computed:g({},Object(i["c"])("projects",["projects","projectsFiltered"]),{},Object(i["d"])("projects",["search"]),{searchField:{get:function(){return this.search},set:function(t){this.setSearch(t)}}}),methods:g({},Object(i["b"])("projects",["loadProjects","setSearch"]),{alert:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){alert("Searching")})}),mounted:function(){this.loadProjects()}},v=y,P=Object(b["a"])(v,n,o,!1,null,null,null);e["default"]=P.exports},d98b:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"absolute-bottom text-center q-mb-md"},[r("q-btn",{attrs:{to:t.link,round:"",color:"secondary",size:"25px",icon:"add"}})],1)},o=[],s={name:"FabComponent",props:{link:{type:String,default:"#"}},data:function(){return{}}},c=s,i=r("2877"),a=Object(i["a"])(c,n,o,!1,null,null,null);e["a"]=a.exports}}]);