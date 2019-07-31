<template>
    <div>
        <Header-view :headerMsg='headerMsg' />

        <router-link :to='{path:"/adresslist"}'>
            <div id="adres" class="p30 flex Between">
                <ul class="adrLeft mr8">
                    <li class="flex Start pb9 ">
                        <img src="../assets/images/homepage/home_man_icon@2x.png" alt="" class="icon_Person mr4">
                        <span class="font16 fw6 c3">{{address.username?address.username:"请添加常用收货人"}} <span
                                class="fw5 c6 ml3" v-if='address.address'>{{address.phone}}</span></span>
                    </li>
                    <li class="flex Start fw4">
                        <img src="../assets/images/homepage/home_local_icon@2x.png" alt="" class="icon_Person mr4">
                        <span class="c3 font14 hidden2 tl">{{address.address?address.address:"请添加常用收货地址"}}</span>
                    </li>
                </ul>

                <div class="adrRight">
                    <img src="../assets/images/homepage/home_smallmore_icon@2x.png" alt="" />
                </div>
            </div>
        </router-link>

        <ul class="shopList  mt5">
            <li class="list p30 flex Start borderBottom" v-for='(item,index) in msg' :key='index' :msg='msg'>
                <img :src="item.url" alt="" class="shopImg">
                <ul class="ml10 listMes flex Between">
                    <li class="font16 fw6 c3">{{item.saleName}}</li>
                    <li class="flex Between">
                        <span class="color font18 "><span class="font14 color">￥</span>{{item.xsprice}}</span>
                        <span>× {{item.nums}}</span>

                    </li>
                </ul>
            </li>
        </ul>
        <!-- <van-field readonly clickable label="配送时间" :value="value" placeholder="" @click="showPicker = true" /> -->
        <ul class="pt8 pb8 pl10 pr10 flex Between box mt5 borderBottom" @click="checkTimes">
            <li class="font16 fw6">配送时间</li>
            <li class="flex">
                <span class="font14">{{yyTime?yyTime:'立即配送'}}</span>
                <img src="../assets/images/homepage/home_smallmore_icon@2x.png" alt="" width="10" class="ml5" />
            </li>
        </ul>
        <ul class="pt8 pb8 pl10 pr10 flex Between box ">
            <li class="font16 fw6">实付款</li>
            <li class="flex">
                <span class="font20 color fw6"> <span class="font12">￥</span> {{address.disbursements}}</span>
            </li>
        </ul>
        <ul class=" pl10 pr10  box  borderBottom mt5">
            <li class="font16 fw6 pt8 pb8">选择支付方式</li>
            <li>
                <van-radio-group v-model="radio" @change='changeRadio'>
                    <van-cell-group>
                        <van-cell title="微信支付" clickable @click="radio = '1'">
                            <van-radio slot="right-icon" name="1" />
                        </van-cell>
                        <van-cell title="支付宝支付" clickable @click="radio = '2'">
                            <van-radio slot="right-icon" name="2" />
                        </van-cell>
                        <!-- <van-cell title="龙支付" clickable @click="radio = '3'">
                            <van-radio slot="right-icon" name="3" />
                        </van-cell> -->
                    </van-cell-group>
                </van-radio-group>
            </li>
        </ul>
        <!-- 配送时间picker -->
        <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns='time' @change="onChange" @confirm='onConfirm'
                @cancel='showPicker = false' />
        </van-popup>
        <div style="height: 45px;"></div>
        <van-button type="info" @click='payWay'>立即支付</van-button>
    </div>
</template>
<script>
    import HeaderView from '../components/header';
    import { Settlement, getHomeMes } from '../api/api';
    import { Field, Popup, Picker, RadioGroup, Radio, Cell, CellGroup, Button } from 'vant'
    export default {
        components: {
            HeaderView,
            [Field.name]: Field,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            VanButton: Button
        },
        data() {
            return {
                headerMsg: {
                    title: '结算',
                    lefticon: true,
                    left: '返回',
                    right: ''
                },
                msg: JSON.parse(localStorage.getItem('order')),              //购物车选择的商品
                obj: JSON.parse(localStorage.getItem('sObj')),               //购物车带过来的结算参数
                address: JSON.parse(localStorage.getItem('address')) || {},  //结算地址以及价格等

                showPicker: false,//选择配送时间，
                objs: {},  //修改配送时间数据结构
                time: '',  //picker数据结构数据               
                yyTime: '', //预约时间 默认是立即配送
                radio: '1',  //选择支付方式
                openPay: '##'
            }

        },
        created() {

            this.settlement();

            localStorage.removeItem('address');

        },

        methods: {

            // 结算
            settlement() {
                this.$toast.loading({
                    message: '加载中...'
                });

                const obj = this.obj;
                obj.addid = this.address.id
                Settlement(obj).then(res => {
                    if (res.status == 1) {
                        this.$toast.clear();
                        this.address = res.msg;
                       // console.log(res.msg)
                        this.getTime(res.msg.addid);
                    }

                })

            },
            checkTimes() {
                if (this.address.addid != 0) {
                    this.showPicker = true;
                } else {
                    this.$toast('请先选择一个地址')
                }
            },
            getTime(id) {
               // console.log(id)

                const obj = {
                    action: 'getadvancetime',
                    addid: id
                }
                getHomeMes(obj).then(res => {
                    if (res.status == 1) {
                        let objs = {};
                        const msg = res.msg;
                        for (let item of msg) {
                            objs[item.Date] = {
                                time: item.Time,
                                riqi: item.Dtime
                            }

                        }
                        this.objs = objs

                        this.time = [
                            {
                                values: Object.keys(objs),

                            },
                            {
                                values: objs['今天'].time,
                                defaultIndex: 0
                            }
                        ]
                    }

                })
            },
            onChange(picker, values) {
                picker.setColumnValues(1, this.objs[values[0]].time);

            },
            onConfirm(i) {
                this.showPicker = false;
                if (i[1] == '立即配送') {
                    this.yyTime = ''
                } else {
                    this.yyTime = this.objs[i[0]].riqi + ' ' + i[1];
                }

            },
            changeRadio() {
            },
            payWay() {
                // action=payinfo支付交易信息&payway=0微信/1支付宝&paytype=0立即支付,1扫码支付,2 H5支付&tradcode=交易流水号
                //console.log(this.address, this.obj)
                const obj = this.obj;
                obj.addid = this.address.addid;
                obj.yyTime = this.yyTime;
                obj.usejf = 0;
                obj.action = 'createorder'
                Settlement(obj).then(res => {
                    // if(res.status == 1){
                    let objs = {
                        action: 'payinfo',
                        paytype: 2,
                        tradcode: res.msg.tradCode
                    }
           
                    if (this.radio == 1) {
                        objs.payway = 0;
                    }
                    else if (this.radio == 2) {
                        objs.payway = 1;
                    }
                    Settlement(objs).then(response => {
                      //  console.log(response)
                        const msg = response.msg;
                        if (this.radio == 1) {
                            window.location.href = msg.code_url;
                        }
                        else if (this.radio == 2) {
                            window.location.href = msg.alipay_trade_precreate_response.qr_code;
                        }
                       


                        // this.openPay = msg.code_url;
                        // window.open()    
                        // console.log(msg.code_url)

                        // WeixinJSBridge.invoke(
                        //     'getBrandWCPayRequest', {
                        //         "appId":msg.appid,     //公众号名称，由商户传入     
                        //         "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
                        //         "nonceStr":msg.nonce_str, //随机串     
                        //         "package":"prepay_id="+msg.prepay_id,     
                        //         "signType":"MD5",         //微信签名方式：     
                        //         "paySign":msg.sign //微信签名 
                        //     },
                        //     function(res){     
                        //         if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                        //     }
                        // ); 
                    })
                    // }
                })

            }
        },
    }
</script>
<style lang="scss" scoped>
    /* --------------地址---------- */
    #adres {
        background: #ffffff;
    }

    .adrLeft li img {
        width: 20px;
        height: 20px;
    }

    /* -----------水列表------------ */
    .shopList {
        background: #ffffff
    }

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

    .van-picker__confirm,
    .van-picker__cancel {
        color: $backColor
    }

    .van-radio__icon {
        font-size: 22px;
    }

    .van-button {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>