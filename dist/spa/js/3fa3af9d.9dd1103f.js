(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["3fa3af9d"],{"21f3":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("q-card",{staticClass:"auth-tabs"},[a("q-card-section",{staticClass:"bg-primary text-secondary"},[a("div",{staticClass:"row items-center"},[a("q-avatar",{attrs:{color:"white"}},[a("img",{attrs:{src:"statics/app-logo-128x128.png"}})]),a("div",{staticClass:"headline q-ml-md text-weight-bolder"},[a("span",{staticClass:"text-uppercase"},[t._v("Department of Agriculture")]),a("br"),t._v("\n          Investment Programming & Management System\n        ")])],1)]),a("q-tabs",{staticClass:"bg-primary text-grey-4",attrs:{"active-color":"secondary","indicator-color":"secondary",align:"justify"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab",{attrs:{name:"login",label:"Login"}}),a("q-tab",{attrs:{name:"register",label:"Register"}})],1),a("q-separator"),a("q-tab-panels",{attrs:{animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"login"}},[a("login-register",{attrs:{tab:t.tab}})],1),a("q-tab-panel",{attrs:{name:"register"}},[a("login-register",{attrs:{tab:t.tab}})],1)],1)],1)],1)},s=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-form",{staticClass:"q-gutter-y-sm",on:{submit:function(e){return e.preventDefault(),t.submitForm(e)},reset:t.onReset}},[a("q-banner",{staticClass:"bg-grey-3",scopedSlots:t._u([{key:"avatar",fn:function(){return[a("q-icon",{attrs:{name:"account_circle",color:"primary"}})]},proxy:!0}])},[t._v("\n    "+t._s(t._f("titleCase")(t.tab))+" to access your account anywhere.\n  ")]),"register"==t.tab?a("q-input",{ref:"name",attrs:{dense:"",label:"Name",type:"text",rules:[function(t){return!!t||"Please enter your name."}],"lazy-rules":"",outlined:"","stack-label":""},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}}):t._e(),a("q-input",{ref:"email",attrs:{dense:"",label:"Email",type:"email",rules:[function(e){return t.isValidEmailAddress(e)||"Please enter a valid email."}],"lazy-rules":"",outlined:"","stack-label":""},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),a("q-input",{ref:"password",attrs:{dense:"",label:"Password",type:"password",rules:[function(t){return t.length>=8||"Password must at least be 8 characters."}],"lazy-rules":"",outlined:"","stack-label":""},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}}),a("div",{staticClass:"row"},[a("q-space"),a("q-btn",{attrs:{flat:"",type:"reset",label:"Reset"}}),a("q-btn",{attrs:{type:"submit",color:"primary",label:t.tab}})],1)],1)},i=[],o=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("7f7f"),a("c47a")),l=a.n(o),c=a("2f62");function u(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,r)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?u(a,!0).forEach(function(e){l()(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):u(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var f={name:"LoginRegister",props:["tab"],data:function(){return{loading:!1,formData:{name:"",email:"mlab817@gmail.com",password:"password"}}},methods:m({isValidEmailAddress:function(t){var e=/\S+@\S+\.\S+/;return e.test(String(t).toLowerCase())},submitForm:function(){this.$refs.email.validate(),this.$refs.password.validate(),this.$refs.email.hasError||this.$refs.password.hasError||("login"==this.tab?this.loginUser(this.formData):(this.$refs.name.validate(),this.registerUser(this.formData)))},onReset:function(){this.formData={}}},Object(c["b"])("auth",["registerUser","loginUser"])),filters:{titleCase:function(t){return t.charAt(0).toUpperCase()+t.slice(1)}}},b=f,p=a("2877"),d=Object(p["a"])(b,n,i,!1,null,null,null),g=d.exports,y={components:{LoginRegister:g},name:"PageLogin",data:function(){return{tab:"login"}}},h=y,v=(a("f267"),Object(p["a"])(h,r,s,!1,null,"8a348ec8",null));e["default"]=v.exports},"9ccd":function(t,e,a){},f267:function(t,e,a){"use strict";var r=a("9ccd"),s=a.n(r);s.a}}]);