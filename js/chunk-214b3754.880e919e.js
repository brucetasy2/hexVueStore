(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-214b3754"],{"495b":function(t,s,a){"use strict";a.d(s,"a",(function(){return e}));var i=a("2b0e"),e=new i["a"]},8418:function(t,s,a){"use strict";var i=a("c04e"),e=a("9bf2"),c=a("5c6c");t.exports=function(t,s,a){var o=i(s);o in t?e.f(t,o,c(0,a)):t[o]=a}},"969c":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),t._m(0),a("div",{staticClass:"container mt-6"},[a("div",{staticClass:"row flex-md-row-reverse flex-column"},[t._m(1),a("div",{staticClass:"col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3 text-left"},[a("h2",{staticClass:"font-weight-bold "},[t._v("Rototo 肉多多")]),a("h5",{staticClass:"font-weight-normal text-muted mt-2"},[t._v("訂閱獲取優惠卷 & 最新商品訊息")]),a("div",[a("div",{staticClass:"input-group mb-0 mt-4"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.userEmail,expression:"userEmail"}],staticClass:"form-control rounded-sm mr-3",attrs:{type:"text",placeholder:"請輸入電子郵件帳號"},domProps:{value:t.userEmail},on:{input:function(s){s.target.composing||(t.userEmail=s.target.value)}}}),a("div",{staticClass:"input-group-append "},[a("button",{staticClass:"btn btn-dark rounded-sm ",attrs:{type:"button",id:"subscription"},on:{click:t.subscription}},[t._v(" 訂閱電子報 ")])])])])])]),a("div",{staticClass:"row mt-5"},[a("div",{staticClass:"card-columns"},t._l(t.products,(function(s){return a("div",{key:s.id,staticClass:"card"},[a("img",{staticClass:"card-img-top rounded-sm",attrs:{src:s.imageUrl[0],alt:"這是產品圖片"}}),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v(t._s(s.category)+" "),a("strong",[t._v(" "+t._s(s.title))])]),a("p",{staticClass:"card-text text-center",domProps:{innerHTML:t._s(s.content)}}),a("div",{staticClass:"d-flex justify-content-end"},[a("button",{staticClass:"btn btn btn-outline-success text-nowrap rounded-lg",on:{click:function(a){return t.addtoCart(s,1)}}},[t._v(" 加入購物車 ")])])])])})),0)])]),a("div",{staticClass:"bg-light mt-7"},[a("div",{staticClass:"container"},[a("div",{staticClass:"carousel slide",attrs:{id:"carouselExampleControls","data-ride":"carousel"}},[a("div",{staticClass:"carousel-inner"},t._l(t.products,(function(s,i){return a("div",{key:s.id,staticClass:"carousel-item ",class:0===i?"active":""},[a("div",{staticClass:"row justify-content-center py-7"},[a("div",{staticClass:"col-md-8 d-flex"},[a("img",{staticClass:"rounded-circle mr-5",staticStyle:{width:"160px",height:"160px","object-fit":"cover"},attrs:{src:s.imageUrl[0],alt:""}}),a("div",{staticClass:"d-flex flex-column"},[a("p",{staticClass:"h5"},[t._v(t._s(s.title))]),a("p",{staticClass:"mt-auto text-muted",domProps:{innerHTML:t._s(s.content)}})])])])])})),0),t._m(2),t._m(3)])])]),t._m(4)],1)},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"carousel slide",attrs:{id:"carouselExampleIndicators","data-ride":"carousel"}},[a("ol",{staticClass:"carousel-indicators"},[a("li",{staticClass:"active",attrs:{"data-target":"#carouselExampleIndicators","data-slide-to":"0"}}),a("li",{attrs:{"data-target":"#carouselExampleIndicators","data-slide-to":"1"}}),a("li",{attrs:{"data-target":"#carouselExampleIndicators","data-slide-to":"2"}})]),a("div",{staticClass:"carousel-inner"},[a("div",{staticClass:"carousel-item active"},[a("img",{staticClass:"d-block w-100",staticStyle:{height:"500px","object-fit":"cover"},attrs:{src:"https://images.unsplash.com/photo-1520006709240-e2a6f6323d8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",alt:"1 slide"}}),a("div",{staticClass:"carousel-caption "},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"}),a("div",{staticClass:"col col-lg-3"},[a("div",{staticClass:"d-flex flex-column"},[a("div",{staticClass:"p-2"},[a("h2",{staticClass:"font-weight-bold text-lg-center",staticStyle:{color:"#27233A"}},[t._v(" 天性堅韌 ")])]),a("div",{staticClass:"p-2"},[a("p",{staticClass:"font-weight-bold ",staticStyle:{"font-size":"24px",color:"#27233A"}},[t._v(" 幾個星期不澆水也活得下去，很適合忙碌健忘的現代人。 ")])])])])])])]),a("div",{staticClass:"carousel-item"},[a("img",{staticClass:"d-block w-100",staticStyle:{height:"500px","object-fit":"cover"},attrs:{src:"https://images.unsplash.com/photo-1491381444146-6ef9fec7d309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",alt:"2 slide"}}),a("div",{staticClass:"carousel-caption "},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"}),a("div",{staticClass:"col col-lg-3"},[a("div",{staticClass:"d-flex flex-column"},[a("div",{staticClass:"p-2"},[a("h2",{staticClass:"font-weight-bold text-lg-center",staticStyle:{color:"#F0425C"}},[t._v(" 圓胖、喜感、逗趣 ")])]),a("div",{staticClass:"p-2"},[a("p",{staticClass:"font-weight-bold ",staticStyle:{"font-size":"24px",color:"#F0425C"}},[t._v(" 撫慰與調節現代人緊張的生活步調，減低憂鬱發生。 ")])])])])])])]),a("div",{staticClass:"carousel-item"},[a("img",{staticClass:"d-block w-100",staticStyle:{height:"500px","object-fit":"cover"},attrs:{src:"https://images.unsplash.com/photo-1485199926533-8c38475abf2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",alt:"3 slide"}}),a("div",{staticClass:"carousel-caption "},[a("div",{staticClass:"row "},[a("div",{staticClass:"col col-lg-5"},[a("div",{staticClass:"p-2"},[a("h2",{staticClass:"font-weight-bold text-lg-center",staticStyle:{color:"#673C41"}},[t._v(" 吸收有害物質 ")])]),a("div",{staticClass:"p-2"},[a("p",{staticClass:"font-weight-bold ",staticStyle:{"font-size":"24px",color:"#673C41"}},[t._v(" 對甲醛、苯等有害物質會有一定的淨化。"),a("br"),t._v("接觸空氣面積較大的多肉，效果也會越好。 ")])])]),a("div",{staticClass:"col "},[a("div",{staticClass:"d-flex flex-column"})])])])])]),a("a",{staticClass:"carousel-control-prev",attrs:{href:"#carouselExampleIndicators",role:"button","data-slide":"prev"}},[a("span",{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),a("span",{staticClass:"sr-only"},[t._v("Previous")])]),a("a",{staticClass:"carousel-control-next",attrs:{href:"#carouselExampleIndicators",role:"button","data-slide":"next"}},[a("span",{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),a("span",{staticClass:"sr-only"},[t._v("Next")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-6"},[a("img",{staticClass:"img-fluid rounded-lg",attrs:{src:"https://images.unsplash.com/photo-1474974573965-2ed43d64cb45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60\n          alt="}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("a",{staticClass:"carousel-control-prev",attrs:{href:"#carouselExampleControls",role:"button","data-slide":"prev"}},[a("span",{staticClass:"fa fa-chevron-left fa-lg text-success"}),a("span",{staticClass:"sr-only"},[t._v("Previous")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("a",{staticClass:"carousel-control-next",attrs:{href:"#carouselExampleControls",role:"button","data-slide":"next"}},[a("span",{staticClass:"fa fa-chevron-right fa-lg text-success"}),a("span",{staticClass:"sr-only"},[t._v("Next")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container my-3"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-danger my-4",staticStyle:{"font-size":"24px","font-weight":"bold"}},[t._v(" Rototo 肉多多 ")])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("h5",{staticStyle:{"font-size":"16px",color:"#00522E"}},[t._v(" 提供名家設計款多肉植物，搭配特選花器、配合主題凸顯您的品味。"),a("br"),t._v(" 配合季節推出限量訂製品，，是送禮與自用最佳選擇 ! ")])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("p",[t._v(" 多肉植物"),a("br"),t._v(" 有時像蛋糕上的奶油裝飾品、"),a("br"),t._v(" 有時化身毛茸茸的溫暖模樣、"),a("br"),t._v(" 有時也像花朵燦爛綻放、 "),a("br"),t._v(" 有時也迎風飄揚... ")])])])])}],c=(a("99af"),a("495b")),o={name:"index",components:{},data:function(){return{products:[],tempProduct:{imageUrl:[]},isLoading:!1,uuid:"d952d084-2b40-40c3-9758-1aef7c7aa9e6",userEmail:"",carts:{},status:{loadingItem:""}}},created:function(){this.getProducts()},methods:{getProducts:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api/").concat(this.uuid,"/ec/products");this.$http.get(s).then((function(s){t.products=s.data.data,t.isLoading=!1})).catch((function(s){t.$swal.fire({icon:"error",title:"Oops1...",text:"錯誤代碼".concat(s.request.status)}),t.isLoading=!1}))},subscription:function(){0===this.userEmail.length?this.$swal.fire({icon:"error",title:"訂閱失敗",text:"請輸入您的電子郵件 !",timer:6e3}):this.$swal.fire({icon:"success",title:"訂閱成功",text:"獲得優惠碼:888 !",timer:6e3})},addtoCart:function(t){var s=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.tempProduct=t,this.status.loadingItem=t.id;var i={product:t.id,quantity:a};this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/api/").concat(this.uuid,"/ec/shopping");this.$http.post(e,i).then((function(){s.isLoading=!1,s.status.loadingItem="",s.$swal.fire({icon:"sucess",title:"加入購物車..",text:"成功",timer:1500}),s.getCart()})).catch((function(t){s.$swal.fire({icon:"error",title:"加入購物車..",text:"失敗,錯誤代碼".concat(t.request.status)}),s.isLoading=!1,s.status.loadingItem=""}))},getCart:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api/").concat(this.uuid,"/ec/shopping");this.$http.get(s).then((function(s){t.carts=s.data.data,t.isLoading=!1,c["a"].$emit("cartsQuantity",t.carts.length)})).catch((function(s){t.$swal.fire({icon:"error",title:"取得購物車內容失敗...",text:"錯誤代碼".concat(s.request.status)}),t.isLoading=!1}))}}},l=o,r=a("2877"),n=Object(r["a"])(l,i,e,!1,null,null,null);s["default"]=n.exports},"99af":function(t,s,a){"use strict";var i=a("23e7"),e=a("d039"),c=a("e8b5"),o=a("861d"),l=a("7b0b"),r=a("50c4"),n=a("8418"),d=a("65f0"),u=a("1dde"),v=a("b622"),p=a("2d00"),f=v("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",C=p>=51||!e((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),g=u("concat"),x=function(t){if(!o(t))return!1;var s=t[f];return void 0!==s?!!s:c(t)},b=!C||!g;i({target:"Array",proto:!0,forced:b},{concat:function(t){var s,a,i,e,c,o=l(this),u=d(o,0),v=0;for(s=-1,i=arguments.length;s<i;s++)if(c=-1===s?o:arguments[s],x(c)){if(e=r(c.length),v+e>h)throw TypeError(m);for(a=0;a<e;a++,v++)a in c&&n(u,v,c[a])}else{if(v>=h)throw TypeError(m);n(u,v++,c)}return u.length=v,u}})}}]);
//# sourceMappingURL=chunk-214b3754.880e919e.js.map