(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d60b29a"],{"0835":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Menu1"),t._m(0),e("router-view"),e("Footer")],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[e("main",{staticClass:"col-md-12 ml-sm-auto px-4",attrs:{role:"main"}})])])}],i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bg-white sticky-top"},[e("div",{staticClass:"container"},[e("nav",{staticClass:"navbar px-0 navbar-expand-lg navbar-light bg-white"},[e("a",{staticClass:"navbar-brand position-absolute",staticStyle:{left:"50%",transform:"translate(-50%, -50%)",top:"50%"},attrs:{href:"./index.html"}},[t._v(" Rototo ")]),t._m(0),e("div",{staticClass:"collapse navbar-collapse bg-white custom-header-md-open",attrs:{id:"navbarNav"}},[e("ul",{staticClass:"navbar-nav"},[e("li",{staticClass:"nav-item active"},[e("router-link",{staticClass:"nav-link",attrs:{to:"index"}},[t._v("訂閱優惠")])],1),e("li",{staticClass:"nav-item active"},[e("router-link",{staticClass:"nav-link",attrs:{to:"aboutproducts"}},[t._v("產品列表")])],1)])]),e("div",{staticClass:"d-flex"},[e("router-link",{staticClass:"mr-5 nav-link fas fa-heart",attrs:{to:"/Loveproducts"}}),e("router-link",{staticClass:"mr-5 nav-link fas fa-shopping-cart",attrs:{to:"/Cart2"}},[e("span",{staticClass:"badge badge-pill badge-danger",staticStyle:{transform:"translateX(2px) translateY(-2px)"}},[t._v(" "+t._s(this.cntCount)+" ")])])],1)])])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],l=(e("99af"),e("495b")),c={data:function(){return{isLoading:!1,uuid:"d952d084-2b40-40c3-9758-1aef7c7aa9e6",cntCount:0}},name:"HomeList",created:function(){this.getCart(),l["a"].$on("cartsQuantity",this.CartsRenew)},destroyed:function(){l["a"].$off("cartsQuantity",this.CartsRenew)},methods:{CartsRenew:function(t){this.cntCount=t},getCart:function(){var t=this;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/api/").concat(this.uuid,"/ec/shopping");this.$http.get(a).then((function(a){t.isLoading=!1,t.cntCount=a.data.data.length>0?a.data.data.length:0}))}}},o=c,u=e("2877"),d=Object(u["a"])(o,i,r,!1,null,null,null),f=d.exports,v=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},h=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bg-dark"},[e("div",{staticClass:"container"},[e("div",{staticClass:"d-flex align-items-center justify-content-between text-white py-4"},[e("p",{staticClass:"mb-0"},[t._v("© 2020 LOGO All Rights Reserved.")]),e("ul",{staticClass:"d-flex list-unstyled mb-0 h4"},[e("li",[e("a",{staticClass:"text-white mx-3",attrs:{href:"https://www.facebook.com/groups/1737030789862138/",target:"_blank"}},[e("i",{staticClass:"fab fa-facebook"})])]),e("li",[e("a",{staticClass:"text-white mx-3",attrs:{href:"https://www.instagram.com/explore/tags/%E5%A4%9A%E8%82%89%E6%A4%8D%E7%89%A9/?hl=zh-tw",target:"_blank"}},[e("i",{staticClass:"fab fa-instagram"})])]),e("li",[e("a",{staticClass:"text-white ml-3",attrs:{href:"https://line.me/ti/p/6TV__F6OBe",target:"_blank"}},[e("i",{staticClass:"fab fa-line"})])])])])])])}],b={data:function(){return{}}},p=b,g=Object(u["a"])(p,v,h,!1,null,null,null),m=g.exports,C={name:"Homecontainer",components:{Menu1:f,Footer:m},data:function(){return{}}},w=C,x=Object(u["a"])(w,s,n,!1,null,null,null);a["default"]=x.exports},"495b":function(t,a,e){"use strict";e.d(a,"a",(function(){return n}));var s=e("2b0e"),n=new s["a"]},8418:function(t,a,e){"use strict";var s=e("c04e"),n=e("9bf2"),i=e("5c6c");t.exports=function(t,a,e){var r=s(a);r in t?n.f(t,r,i(0,e)):t[r]=e}},"99af":function(t,a,e){"use strict";var s=e("23e7"),n=e("d039"),i=e("e8b5"),r=e("861d"),l=e("7b0b"),c=e("50c4"),o=e("8418"),u=e("65f0"),d=e("1dde"),f=e("b622"),v=e("2d00"),h=f("isConcatSpreadable"),b=9007199254740991,p="Maximum allowed index exceeded",g=v>=51||!n((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),m=d("concat"),C=function(t){if(!r(t))return!1;var a=t[h];return void 0!==a?!!a:i(t)},w=!g||!m;s({target:"Array",proto:!0,forced:w},{concat:function(t){var a,e,s,n,i,r=l(this),d=u(r,0),f=0;for(a=-1,s=arguments.length;a<s;a++)if(i=-1===a?r:arguments[a],C(i)){if(n=c(i.length),f+n>b)throw TypeError(p);for(e=0;e<n;e++,f++)e in i&&o(d,f,i[e])}else{if(f>=b)throw TypeError(p);o(d,f++,i)}return d.length=f,d}})}}]);
//# sourceMappingURL=chunk-5d60b29a.d2849fef.js.map