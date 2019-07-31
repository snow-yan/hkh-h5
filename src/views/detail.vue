<template>
    <div class="white">
        <Header-view :headerMsg='headerMsg' />

        <div class="banner">
            <van-swipe>
                <van-swipe-item v-for="(image, index) in swiperImg" :key="index">
                    <img :src='image' />
                </van-swipe-item>
            </van-swipe>
        </div>
        <ul class=" pt5 pl10 pr10 pb5 pl10 pr10 borderBottom">
            <li class="tl font16 fw6">{{detailMes.salename}}</li>
            <li class="flex Between font12 fw4 mt5"> <span>{{detailMes.keys}}</span> <span class="color font20"> <span
                        class="font16">￥</span>{{detailMes.xsprice}}</span></li>
        </ul>
        <ul class="guige pt5">
            <li class="flex Between pl10 pr10 pb5 detailList" @click='clickShow'>
                <div class="c3 font14">已选</div>
                <div style="width: 70%" class="tl c6 font12"> {{detailMes.propValues}} </div>
                <div><span class="font12">X{{value}}</span> <img src="../assets/images/homepage/home_more_icon_png@2x.png"
                        alt="" width="8" class="ml10"></div>
            </li>
            <li class="flex Between pl10 pr10 pb5 detailList">
                <div class="c3 font14">积分</div>
                <div style="width: 70%" class="tl c6 font12"> {{detailMes.canusejf}} </div>
                <div><img src="../assets/images/homepage/home_more_icon_png@2x.png" alt="" width="8" class="ml10" /></div>
            </li>
            <li class="flex Between pl10 pr10 pb5 detailList">
                <div class="c3 font14">优惠券</div>
                <div style="width: 70%" class="tl c6 font12" v-if='youhui.length == 0'> 暂无优惠券 </div>
                <div style="width: 70%" class="tl c6 font12" v-else> 点击查看可使用优惠券 </div>
                <div> <img src="../assets/images/homepage/home_more_icon_png@2x.png" alt="" width="8" class="ml10">
                </div>
            </li>
            <li class="flex Between pl10 pr10 pb5 detailList">
                <div class="c3 font14">包邮</div>
                <div style="width: 70%" class="tl c6 font12"> {{detailMes.baoyou}} </div>
                <div><span class="font12">X1</span> <img src="../assets/images/homepage/home_more_icon_png@2x.png"
                        alt="" width="8" class="ml10"></div>
            </li>
            <li class="flex Between pl10 pr10 pb5 detailList">
                <div class="c3 font14">总金额</div>
                <div style="width: 70%" class="tl c6 font12"></div>
                <div class="color font16 fw6"> ￥{{total}}</div>
            </li>

        </ul>
        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
            <div style='width:100%;height:100%;position:relative;'>
                <div class='waterLists flex borderBottom p30 flexStart'>
                    <img :src='swiperImg[0]' class='shopWater' />
                    <div class='waterDesc flex ml10 '>
                        <div class='font14 hidden'>{{detailMes.salename}}</div>
                        <div class='mesName3 hidden color'>
                            ￥{{detailMes.xsprice}}
                        </div>
                    </div>
                </div>
                <div class='disTimeContent'>
                    <div class='flex flexStart pt10 ggList'>
                        <div class='title'>购买数量</div>
                        <div class='ml10'>
                            <div class='waterNumber flex'>
                                <div class='flex'  @click='bindMinus'>
                                    <img src='../assets/images/homepage/water_icon_reduce@2x.png' /> 
                                </div>
                                <div class='flex watN '>
                                    <input class='center' type='number' v-model='value' @blur='bindInput' />
                                </div>
                                <div class='flex' @click='bindPlus'>
                                    <img src='../assets/images/homepage/water_icon_add@2x.png' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class='flex flexStart  ggList' v-for='(item,index) in guige' :key='index'>
                        <div class='title'>{{item.classSpecName}}</div>
                        <div class='ml10 rl flex flexStart ' style='flex-wrap:wrap;'>
                            <span v-for='(itm,idx) in item.classSpecValues' :key='idx' v-bind:class=' {active:itm.isTrue}'
                                class="prop mr10">
                                {{itm.classSpecValue}}
                            </span>


                        </div>
                    </div>

                </div>
                <!-- <div class='addShopCar ' @click='addShopCars'>添加购物车</div> -->
            </div>
        </van-popup>
        <div v-html="detailImg" class="imgDetail"></div>
        <div style="height: 45px;"></div>
        <div class='addShopCar fixed ' @click='addShopCars'>添加购物车</div>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, Popup } from 'vant';
    import { getShop } from '../api/api';
    import HeaderView from '../components/header';
    export default {
        name: 'detail',
        data() {
            return {
                headerMsg: {
                    title: '好快活桶装水',
                    lefticon: true,
                    left: '返回',
                    right: ''
                },
                swiperImg: [], //轮播
                detailMes: '', // 详情
                youhui: [], // 优惠券
                gift: [],   //赠品
                detailImg: '', // 图文详情\
                show: false, //规格显示
                guige: {}, //规格
                value: 1,
                total:0,
                ids:{},
                users: JSON.parse(localStorage.getItem('user')),
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            HeaderView,
            [Popup.name]: Popup

        },
        created() {
            let msg = this.$route.params.pid ? this.$route.params : (JSON.parse(localStorage.getItem('detailId')));
            this.ids = msg
           // console.log(msg)
            this.getSwiper(msg);
            this.getImg(msg);
            this.getGuige(msg)
        },
        props: ['msg'],
        watch: {
            msg: {
                handler() {
                    this.getSwiper()
                }
            }
        },
        methods: {
            getSwiper(msg) {

                const obj = {
                    action: 'getproduct', mid: msg.mid || '', pid: msg.pid, cid: msg.cid
                }
                getShop(obj).then(res => {
                    //console.log(res);
                    if (res.status == 1) {
                        let arr = res.msg[0].url.split(',')
                        this.swiperImg = arr;
                        this.detailMes = res.msg[0];
                        this.total = res.msg[0].xsprice;
                        this.youhui = res.msg1;
                        this.gift = res.msg2;
                        this.headerMsg.title = res.msg[0].salename
                    }
                })

            },
            getImg(msg) {
                const obj = {
                    action: 'getdetail',
                    cid: msg.cid
                }
                getShop(obj).then(res => {
                    //console.log(res)
                    this.detailImg = decodeURIComponent(res.msg)
                })
            },
            getGuige(msg) {
                const obj = {
                    action: 'getprop',
                    cid: msg.cid,
                    pid: msg.pid,
                }
                getShop(obj).then(res => {
                    //console.log(res);
                    this.guige = res.msg
                })
            },
            clickShow() {
                this.show = !this.show;
            },
            bindPlus(){
                this.value++;
                this.pay()
            },
            bindMinus(){
               
                if(this.value>1){
                    this.value--;
                }
                this.pay()
               
            },
            bindInput(){

                this.pay();
            },
            pay(){
                if(this.value>999){
                    this.value = 999 ;
                }
                if (this.value< 1) { this.value = 1; }
                const price = this.detailMes.hdprice ? this.detailMes.hdprice : this.detailMes.xsprice;
                this.total = this.value * price;
            },
            addShopCars() {
                if (this.users) {
                    const obj = {
                        action: "addshopcar",
                        nums: this.value,
                        mid: this.users ? this.users[0].id : '',
                        pid: this.ids.pid,
                    }
                    getShop(obj).then(res => {
                        this.$toast(res.msg);
                        this.show = false;
                    })
                } else {
                    this.$toast('请先登录！')
                }

            },
        },
    }
</script>
<style lang="scss">
    .banner {
        width: 100%;
        background: #FAFAFA;
        padding: 10px 0;
        text-align: center
    }

    .banner img {
        width: 185px;
        height: 185px;
    }

    .detailList {
        line-height: 30px
    }

    .detailList div:first-child {
        width: 4rem;
        text-align: left;
    }

    .detailList div:last-child {
        width: 4rem;
        text-align: right;
    }

    .imgDetail img {
        width: 100%;
    }

    .disTimeTitle {
        height: 51px;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .disTimeContent {
        padding: 0 15px;
    }

    .prop {
        padding: 3px 15px;
        background: #ffffff;
        border: 1px solid #AAAAAA;
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        border-radius: 5px;
        margin-top: 10px;

    }

    .ggList:nth-child(2) {
        padding-top: 10px;
    }

    .ggList {
        align-items: baseline;

        /* margin-top: 20rpx; */
        .active {
            background: $backColor;
            color: #ffffff;
            border: 1px solid $backColor;
        }
    }

    .ggList .title {
        width: 20%;
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

    }

    .addShopCar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 45px;
        background: $backColor;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 254, 254, 1);
        z-index: 99999999;
    }

    .rl {
        padding: 5px 0;
    }

    .tongWater {
        background: #fff;
    }

    .waterList {
        width: 100%;
        box-sizing: border-box;
        padding: 0rpx 15px 0rpx 15px;
    }


    .waterLists {
        justify-content: flex-start;
        padding: 12px 15px;
    }

    .payLists {
        justify-content: space-between;
        padding: 13px 0;
    }

    .waterLists .shopWater {
        width: 70px;
        height: 70px;
    }

    .waterDesc {
        /* width: 45%; */
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        height: 50px;
    }

    .waterDesc div {
        width: 100%;
    }

    .waterNumber div {
        width: 31px;
        height: 28px;
        border: 1px solid #e5e5e5;
        justify-content: center;
    }

    .waterNumber .watN {
        border-left: none;
        border-right: none;
        width: 42px;
    }

    .waterNumber .watN input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        text-align: center;
    }

    .waterNumber img {
        width: 15px;
        height: 15px;
    }
    .fixed{
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>