(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f6840790"],{"0b47":function(t,e,n){"use strict";var i=n("5615"),r=n.n(i);r.a},2229:function(t,e,n){"use strict";var i=n("2498"),r=n("ce67")(1);i(i.P+i.F*!n("8eba")([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},3837:function(t,e,n){var i=n("da0b"),r=n("c58e"),s=n("1277")("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?Array:e}},"435f":function(t,e,n){},"4ec3":function(t,e,n){"use strict";n.d(e,"c",(function(){return o})),n.d(e,"d",(function(){return c})),n.d(e,"b",(function(){return l})),n.d(e,"e",(function(){return d})),n.d(e,"a",(function(){return u}));var i=n("bb36"),r=n("82c6"),s=n.n(r),a="",o=function(t){return Object(i["a"])("".concat(a,"/shop/goods/shopcar.ashx"),s.a.stringify(t))},c=function(t){return Object(i["a"])("".concat(a,"/shop/goods/goods.ashx"),s.a.stringify(t))},l=function(t){return Object(i["a"])("".concat(a,"/shop/goods/shopcar.ashx"),s.a.stringify(t))},d=function(t){return Object(i["a"])("".concat(a,"/shop/mine/AccountManage.ashx"),s.a.stringify(t))},u=function(t){return Object(i["a"])("".concat(a,"/shop/Order/OrderManage.ashx"),s.a.stringify(t))}},5615:function(t,e,n){},"8eba":function(t,e,n){"use strict";var i=n("0cc1");t.exports=function(t,e){return!!t&&i((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},"976a":function(t,e,n){"use strict";n("067d"),n("3aef")},c017:function(t,e,n){var i=n("3837");t.exports=function(t,e){return new(i(t))(e)}},c58e:function(t,e,n){var i=n("6077");t.exports=Array.isArray||function(t){return"Array"==i(t)}},ce67:function(t,e,n){var i=n("e85e"),r=n("9952"),s=n("a9cf"),a=n("8941"),o=n("c017");t.exports=function(t,e){var n=1==t,c=2==t,l=3==t,d=4==t,u=6==t,f=5==t||u,h=e||o;return function(e,o,p){for(var g,v,m=s(e),x=r(m),b=i(o,p,3),_=a(x.length),y=0,C=n?h(e,_):c?h(e,0):void 0;_>y;y++)if((f||y in x)&&(g=x[y],v=b(g,y,m),t))if(n)C[y]=v;else if(v)switch(t){case 3:return!0;case 5:return g;case 6:return y;case 2:C.push(g)}else if(d)return!1;return u?-1:l||d?d:C}}},e0bc:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header-view",{attrs:{headerMsg:t.headerMsg}}),n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("Order-mes",{attrs:{list:t.orderList}})],1)],1)},r=[],s=(n("2229"),n("3b46")),a=(n("7cfd"),n("067d"),n("435f"),n("280f"));function o(t){return"none"===window.getComputedStyle(t).display||null===t.offsetParent}var c=n("a9e2"),l=n("005b"),d=n("2b97"),u=Object(a["a"])("list"),f=u[0],h=u[1],p=u[2],g=f({mixins:[Object(c["a"])((function(t){this.scroller||(this.scroller=Object(l["b"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var e,n=t.$el,i=t.scroller,r=t.offset,s=t.direction;e=i.getBoundingClientRect?i.getBoundingClientRect():{top:0,bottom:i.innerHeight};var a=e.bottom-e.top;if(!a||o(n))return!1;var c=!1,l=t.$refs.placeholder.getBoundingClientRect();c="up"===s?l.top-e.top<=r:l.bottom-e.bottom<=r,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{class:h("loading"),key:"loading"},[this.slots("loading")||t(d["a"],{attrs:{size:"16"}},[this.loadingText||p("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished&&this.finishedText)return t("div",{class:h("finished-text")},[this.finishedText])},genErrorText:function(){var t=this.$createElement;if(this.error&&this.errorText)return t("div",{on:{click:this.clickErrorText},class:h("error-text")},[this.errorText])}},render:function(){var t=arguments[0],e=t("div",{ref:"placeholder",class:h("placeholder")});return t("div",{class:h(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():e,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():e])}}),v=n("71c2"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.list,(function(e,i){return n("ul",{key:i,staticClass:"mb5 white"},[t._l(e.OrderProductList,(function(e,i){return n("li",{key:i,staticClass:" borderBottom flex p30 lists  "},[n("div",{staticClass:"img flex"},[n("img",{attrs:{src:e.imgurl}})]),n("div",{staticClass:"xq  flex column Between"},[n("div",{staticClass:"flex Between"},[n("span",{staticClass:"font14"},[t._v(t._s(e.saleName))]),n("span",{staticClass:"color"},[t._v("￥"+t._s(e.xsprice))])]),n("div",{staticClass:"flex Between"},[n("span",{staticClass:"font12"},[t._v(t._s(e.propValues))]),n("span",[t._v("×"+t._s(e.nums))])])])])})),n("li",{staticClass:"states flex Between borderBottom"},[0==e.orderPhase?n("span",{staticClass:"fw6 font14"},[t._v("待支付")]):1==e.orderPhase?n("span",{staticClass:"fw6 font14"},[t._v("待收货")]):3==e.orderPhase?n("span",{staticClass:"fw6 font14"},[t._v("已完成")]):4==e.orderPhase?n("span",{staticClass:"fw6 font14"},[t._v("已取消")]):t._e(),n("span",{staticClass:"font12 fw5 c6"},[t._v("共"+t._s(e.OrderProductList.length)+"件商品  合计:￥"),n("span",{staticClass:"font14"},[t._v(t._s(e.totalMoney))])])]),n("li",{staticClass:"btn flex End"},[0==e.orderPhase?n("van-button",{attrs:{plain:"",hairline:"",type:"danger"}},[t._v("取消订单")]):t._e(),0==e.orderPhase?n("van-button",{staticClass:"ml10",attrs:{plain:"",hairline:"",type:"danger"}},[t._v("立即支付")]):t._e(),1==e.orderPhase||2==e.orderPhase?n("van-button",{staticClass:"ml10",attrs:{plain:"",hairline:"",type:"danger"}},[t._v("催单")]):t._e(),1==e.orderPhase||2==e.orderPhase?n("van-button",{staticClass:"ml10",attrs:{plain:"",hairline:"",type:"danger"}},[t._v("查看物流")]):t._e(),3==e.orderPhase||4==e.orderPhase?n("van-button",{staticClass:"ml10",attrs:{plain:"",hairline:"",type:"danger"}},[t._v("删除订单")]):t._e()],1)],2)})),0)},x=[],b=(n("976a"),n("0266")),_={props:["list"],created:function(){},components:Object(s["a"])({},b["a"].name,b["a"])},y=_,C=(n("0b47"),n("4e82")),O=Object(C["a"])(y,m,x,!1,null,"5449fa47",null),w=O.exports,k=n("4ec3"),L={components:Object(s["a"])({HeaderView:v["a"],OrderMes:w},g.name,g),data:function(){return{headerMsg:{title:"历史订单",lefticon:!0,left:"返回",right:""},orderList:[],loading:!1,finished:!1,pageindex:1,count:0}},created:function(){},methods:{getOrder:function(){var t=this,e={action:"GetAllOrderList",siteid:this.siteid,mid:JSON.parse(localStorage.getItem("user"))[0].id,orderphase:"",pageindex:this.pageindex};Object(k["a"])(e).then((function(e){if(1==e.status){t.pageindex+=1;var n=e.msg.dt;n.map((function(e){e.OrderProductList=JSON.parse(e.OrderProductList),t.orderList.push(e)})),t.count=e.msg.DataCount}}))},onLoad:function(){var t=this;this.getOrder(),setTimeout((function(){t.loading=!1,t.orderList.length>=t.count&&(t.finished=!0)}),500)}}},P=L,T=Object(C["a"])(P,i,r,!1,null,null,null);e["default"]=T.exports}}]);