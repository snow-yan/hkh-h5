<template>
    <div>
        <!-- 搜索框扫一扫以及消息 -->
        <!-- <Search  /> -->
        <!-- <header id='header'>
            <van-nav-bar title="好快活桶装水"  right-text="历史订单" />
        </header>
        <div style="height: 46px;"></div> -->
        <!-- 地址 -->
        <!-- {{users}} -->
        <Header-view  :headerMsg='headerMsg'/>
        <!-- 登录状态下 -->
        <div id="adres" class="p30 flex Between" v-if='users'>
            <router-link :to='{path:"/adresslist"}'>
            <ul class="adrLeft mr8">
                <li class="flex Start pb9 ">
                    <img src="../assets/images/homepage/home_man_icon@2x.png" alt="" class="icon_Person mr4">
                    <span class="font16 fw6 c3">{{adrMes.Mname?adrMes.Mname:"请添加常用收货人"}} <span class="fw5 c6 ml3"
                            v-if='adrMes.Mtel'>{{adrMes.Mtel}}</span></span>
                </li>
                <li class="flex Start fw4">
                    <img src="../assets/images/homepage/home_local_icon@2x.png" alt="" class="icon_Person mr4">
                    <span class="c3 font14 hidden2 tl">{{adrMes.Maddress?adrMes.Maddress:"请添加常用收货地址"}}</span>
                </li>
            </ul>
            </router-link>
            <div class="adrRight">
                <img src="../assets/images/homepage/home_smallmore_icon@2x.png" alt="" />
            </div>
       
        </div>
        <div class="p30 flex Start " id="adres" v-else @click='goLogin'>
            <img src='../assets/images/homepage/home_unlogged_pic@2x.png' alt="" width="60">
            <ul class="tl ml10">
                <li class="fw6 font18">未登录</li>
                <li class="fw4 font14 mt5">点击可登录注册</li>
            </ul>
        </div>
        <!-- 水列表 -->
        <ul class="shopList p30">
            <li class="list flex Start mb10" v-for='(item,index) in homeMes' :key='index'
                @click.stop='goDetails(item.Gid,item.Gcid)' :msg='detailObj'>
                <img :src="item.Gurl" alt="" class="shopImg">
                <ul class="ml10 listMes flex Between">
                    <li class="font16 fw6 c3">{{item.Gname}}</li>
                    <li class="flex Between"> <span class="color font18 ">
                            <span class="font14 color">￥</span>{{item.Gxsprice}}</span>
                        <img src="../assets/images/homepage/unshop_icon_png@2x.png" alt="" class="shopCar_Img"
                            @click.stop='addShopCars(item.Gid,index)' v-if='item.Gshopcarnums == 0' />
                        <img src="../assets/images/homepage/s_shop_icon_png@2x.png" alt="" class="shopCar_Img" v-else />
                    </li>
                </ul>
            </li>
        </ul>
        <!-- <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">

            <Detail :msg='id'></Detail>
        </van-popup> -->
        <div style="height: 50px;"></div>
        <footer>

            <van-submit-bar :price="3000" button-text="立即订水"  @submit="goShopCar">
                <div @click='goShopCar'> 
                        <img src="../assets/images/homepage/dingshui_xiangzi@2x.png" alt="" class="car ml10" />
                        <div class="carNums">{{adrMes.SGnums}}</div>
                </div>
                
            </van-submit-bar>
        </footer>
    </div>
</template>

<style lang="scss" scoped rel="stylesheet/sass">
   

    /* --------------地址---------- */
    #adres {
        background: #ffffff;
    }

    .adrLeft li img {
        width: 20px;
        height: 20px;
    }

    /* -----------水列表------------ */
    .shopList .shopImg {
        width: 100px;
        height: 100px;
    }

    .shopCar_Img {
        width: 30px;
        height: 30px;
    }

    .listMes {
        width: 80%;
        height: 100px;
        flex-direction: column;
        -webkit-flex-direction: column;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;

        li {
            width: 100%;
            text-align: left;
        }

    }

    /* -------footer------ */
    .van-submit-bar__button {
        background: $backColor;
        border: 1px solid $backColor;
        width: 150px;
    }

    .van-nav-bar__text:hover {
        background: $backColor;

    }

    .car {
        width: 60px;
    }

    /* 详情弹窗 */
    .van-popup {
        border-radius: 20px 20px 0 0;
    }
    .carNums{
        position: absolute;
        top:-5px;
        left: 65px;
        background: #FF693D;
        color: #ffffff;
        padding: 5px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;

    }
</style>

<script>
    import {  SubmitBar } from 'vant';
    import { getHomeMes, getShop } from '../api/api';
    import router from '../router';
    import HeaderView from '../components/header'
    export default {
        name: 'home',
        components: {
            [SubmitBar.name]: SubmitBar,
            HeaderView,
        },
        data() {
            return {
                homeMes: [],//商品列表
                adrMes: {}, //地址信息
                users: JSON.parse(localStorage.getItem('user')),  //用户信息
                show: false,
                detailObj:{}, //cid,pid,MID
                headerMsg:{
                    title:'好快活桶装水',
                    lefticon:false,
                    left:'',
                    right:'历史订单'
                }

            }
        },
        created() {
            this.getMes()
        },

        methods: {
            // 渲染页面
            getMes() {
                var obj = {
                    action: 'shopgoods',
                    mid: this.users ? this.users[0].id : '',
                    siteid: this.siteid,
                    addid:localStorage.getItem('address')?JSON.parse(localStorage.getItem('address')).id:''

                }
                getHomeMes(obj).then(res => {
                    this.adrMes = res.msg;
                    this.homeMes = res.msg.SG;
                    localStorage.removeItem('address')
                })
            },
            goLogin() {
                router.push({ path: '/login' })

            },
            goDetails(pid,cid) {
                // this.$toast(pid);
                // this.show = true;
               const detailObj = {cid:cid,pid:pid,mid:this.users?this.users[0].id:''};
               localStorage.setItem('detailId',JSON.stringify(detailObj))
              // console.log(detailObj)
                this.$router.push({name:'detail', params:detailObj })
            },
            addShopCars(pid, index) {
                if (this.users) {
                    const obj = {
                        action: "addshopcar",
                        nums: 1,
                        mid: this.users ? this.users[0].id : '',
                        pid: pid,
                    }
                    getShop(obj).then(res => {
                        this.$toast(res.msg);
                        this.homeMes[index].Gshopcarnums = 1;
                    })
                } else {
                    this.$toast('请先登录！')
                }

            },
            goShopCar(){
                if(this.users ){
                    this.$router.push({name:'car', params:{mid:this.users[0].id } })
                }else{
                    this.$toast('请先登录！')
                }
                
            }
           
        },
    }
</script>