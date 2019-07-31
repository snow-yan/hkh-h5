<template>
    <div>
        <Header-view :headerMsg='headerMsg' />
        <div v-if='!isEmpty'>

            <div class=' p30'>
                <van-checkbox-group v-model="listChecked" @change='changes'>
                    <template v-for='(item,index) in list'>

                        <div class='shopcontent white mb5 flex' :key='index'>
                            <div>
                                <van-checkbox :key="item.isCheck" :name="item" :disabled='item.onshelves=="False"' />
                            </div>
                            <div class='shopcontentr'>
                                <div class='sconrightt flex Between'>
                                    <!-- <router-link :to='{name:"detail",params:{pid:item.pid,cid:item.cid,mid:mid}}'> -->
                                    <div class='imUrl' @click='goDetails(item.pid,item.cid)'>
                                        <img :src="item.url" />
                                        <div v-if='item.onshelves == "True"'></div>
                                        <div v-else class="state"> 商品已下架</div>
                                    </div>
                                    <!-- </router-link> -->
                                    <div class='sconrighttr flex Between column'>
                                        <div class='textespli' @click='goDetails(item.pid,item.cid)'>{{item.saleName}}
                                        </div>
                                        <div class='textlabel hidden' @click='goDetails(item.pid,item.cid)'>
                                            {{item.keys}}</div>
                                        <div class='textnum mt5 flex Between'>
                                            <div class='color'>￥{{item.xsprice}}</div>
                                            <div class='waterNumber flex'>
                                                <div class='flex Center' @click='reduceNum(index)'>
                                                    <img src='../assets/images/homepage/water_icon_reduce@2x.png' />
                                                </div>
                                                <div class='watN'>
                                                    <input @blur='inputNum(index)' v-model='item.nums' min="0"
                                                        maxlength="3" type="number">

                                                </div>
                                                <div class='flex Center' @click='addNum(index)'>

                                                    <img src='../assets/images/homepage/water_icon_add@2x.png' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='listrb'>
                                    <div>{{item.canusejf}}</div>
                                </div>
                            </div>
                        </div>

                        <div v-for='(itm,idx) in item.freeGoods' :key='idx'>
                            <div style='width:20%'>
                                <img :src='itm.zpurl?itm.zpurl:"../assets/images/homepage/thegift@2x.png"' />
                            </div>

                            <div style='width:60%' class='hidden'>
                                {{itm.zpcomName}}
                            </div>
                            <div style='width:20%;text-align:right'>
                                X{{itm.fnum}}
                            </div>
                        </div>
                        <!-- </div> -->

                    </template>
                </van-checkbox-group>
            </div>
            <div style="height:50px"></div>
            <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
                <van-checkbox v-model="checked" class="allCheck" @click='changeAll'>全选</van-checkbox>
            </van-submit-bar>
        </div>
    </div>

</template>
<script>
    import HeaderView from '../components/header'
    import { getHomeMes, Settlement, getShop } from '../api/api'
    import { Checkbox, CheckboxGroup, SubmitBar } from 'vant'
    export default {
        data() {
            return {
                total: 0,
                headerMsg: {
                    title: '购物车',
                    lefticon: true,
                    left: '返回',
                    right: '历史订单'
                },
                list: [],        //购物车列表
                checked: false,  //默认不全选
                listChecked: [],  //选中的购物车
                mid: JSON.parse(localStorage.getItem('user'))[0].id,  //mid
                isEmpty: false,
            }
        },
        components: {
            HeaderView,
            [SubmitBar.name]: SubmitBar,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup
        },
        created() {
            this.getlist()
        },
        methods: {
            getlist() {
                const obj = {
                    action: 'getmycar',
                    mid: this.mid,
                    siteid: this.siteid

                }
                getHomeMes(obj).then(res => {
                    //console.log(res);
                    if (res.status == 1) {
                        this.list = res.msg[0].myGoods
                    } else if (res.status == 2) {
                        this.isEmpty = true;
                    }
                })
            },
            goDetails(pid, cid) {
                const detailObj = { cid: cid, pid: pid, mid: this.mid };
                localStorage.setItem('detailId', JSON.stringify(detailObj))
              //  console.log(detailObj)
                this.$router.push({ name: 'detail', params: detailObj })
            },
            // 选择
            changes() {

                if (this.listChecked.length != 0) {

                    this.settlement(this.listChecked)
                } else {
                    this.total = 0;
                }
                const list = this.list.filter(item => item.onshelves == 'True');
                if (list.length != this.listChecked.length) {
                    this.checked = false;
                }
            },
            // 全选
            changeAll(e) {
                //console.log(e);
                if (e) {
                    const list = this.list.filter(item => item.onshelves == 'True');

                    this.listChecked = list
                } else {
                    this.listChecked = [];
                }
            },
            // 增加数量
            addNum(index) {
                let list = this.list;
                if (list[index].onshelves == 'True') {
                    let hasArr = this.listChecked.findIndex(item => item == list[index]);
                    if (hasArr == -1) {
                        list[index].nums++
                        this.listChecked.push(list[index])
                    } else {
                        this.listChecked[hasArr].nums++;

                        this.settlement(this.listChecked)

                    }
                    this.addShopCars(index);
                } else {
                    this.$toast('商品已下架！')
                }

            },
            // 减少数量
            reduceNum(index) {
                let list = this.list;
                if (list[index].onshelves == 'True') {
                    let hasArr = this.listChecked.findIndex(item => item == list[index]);
                    if (hasArr == -1) {
                        if (list[index].nums > 1) {
                            list[index].nums--
                            this.listChecked.push(list[index])
                        }

                    } else {
                        if (this.listChecked[hasArr].nums > 1) {
                            this.listChecked[hasArr].nums--;
                            this.settlement(this.listChecked)
                        }


                    }
                    this.addShopCars(index);
                } else {
                    this.$toast('商品已下架！')
                }
            },
            inputNum(index) {
                let list = this.list;
               // console.log(list[index])
                if (list[index].onshelves == 'True') {
                    if (list[index].nums <= 0) {
                        list[index].nums = 1;
                    }
                    let hasArr = this.listChecked.findIndex(item => item == list[index]);
                    if (hasArr == -1) {

                        this.listChecked.push(list[index])


                    } else {
                        this.settlement(this.listChecked)

                    }
                    this.addShopCars(index);
                } else {
                    this.$toast('商品已下架！')
                }
            },
            // 保存修改数量
            addShopCars(index) {
                if (this.mid) {
                    const obj = {
                        action: "addshopcar",
                        nums: this.list[index].nums,
                        mid: this.mid,
                        pid: this.list[index].pid,
                        type: 1, //必填
                    }
                    getShop(obj).then(() => {
                      //  console.log(res);
                    })
                } else {
                    this.$toast('请先登录！')
                }

            },
            objs(list) {
                let pids = [];
                let urls = [];
                let num = [];
                let names = [];
                let obj = {
                    usejf: 0,
                    siteid: this.siteid,
                    mid: this.mid,
                    addid: ''



                };
                for (let val of list) {
                   // console.log(val)
                    pids.push(val.pid);
                    urls.push(val.url)
                    num.push(val.nums)
                    names.push(val.comName);
                }

                obj.pids = pids.toString()
                obj.urls = urls.toString()
                obj.action = 'settlement';
                obj.nums = num.toString()
                obj.names = names.toString()
                obj.regions = names.toString();
                return obj;
            },
            // 结算
            settlement(list) {
                this.$toast.loading({
                    message: '加载中...'
                });

                const obj = this.objs(list);

                return Settlement(obj).then(res => {

                    if (res.status == 1) {
                        this.$toast.clear()
                        var index = res.msg.disbursements.indexOf('.', 0);
                        if (index == -1) {
                            this.total = Number(res.msg.disbursements.padEnd(res.msg.disbursements.length + 2, '00'));
                        } else {
                            this.total = Number(res.msg.disbursements.replace('.', '').padEnd(index + 2, '00'));
                        }
                        return res.msg
                    }

                })

            },
            onSubmit() {
                const list = this.listChecked;
                if (list.length != 0) {
                    // const order = ;
                    this.settlement(list).then(() => {
                        const obj = this.objs(list);

                        localStorage.setItem('order', JSON.stringify(this.listChecked));
                        localStorage.setItem('sObj', JSON.stringify(obj));
                        this.$router.push('/orderDetail');
                    })

                    // console.log(order)



                } else {
                    this.$toast('请选择商品！')
                }


            }
        },
    }
</script>


<style lang="scss" scoped rel="stylesheet/sass">
    .shopcontent {
        /* display: flex;
        flex-direction: row;
        align-items: center; */
        background-color: white;
        /* margin-bottom: 20rpx; */
        padding: 0 5px 5px 5px;
    }

    .shopcontent>div:first-child {
        padding: 0 10rpx;
        width: 1.45rem;
        height: 1.45rem;
        margin-right: 10px;
    }

    .shopcontent>div:first-child img {
        width: 100%
    }

    .chooseimg {
        width: 22px;
        height: 22px;
    }

    .shopcontentr {
        width: 100%;
    }

    .sconrightt {

        padding: 10px 0;

    }

    .imUrl {
        width: 30%;
        width: 5.6rem;
        height: 5.6rem;
        position: relative;
    }

    .imUrl .state {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 10px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        width: 100%;
        z-index: 9;
        /* width: 10px;height: 10px; */
    }

    .sconrightt img {
        width: 5.6rem;
        height: 5.6rem;
    }

    .sconrighttr {
        padding: 0px 0.4rem 0 0.6rem;
        width: 70%;
        height: 90px;
        display: flex;



    }

    .textespli {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        align-content: center;
        font-size: 14px;
        width: 100%;
    }

    .textlabel {
        font-size: 11px;
        color: #616161;
        margin: 20rpx 0;
        width: 100%;
    }

    .textnum {

        width: 100%;
    }

    /*主容器*/
    .waterNumber div {
        width: 1.8rem;
        height: 28px;
        border: 1px solid #E5E5E5;
        justify-content: center;
    }

    .waterNumber .watN {
        border-left: none;
        border-right: none;
        width: 2.7rem;
        line-height: 28px;
        text-align: center;
    }

    .waterNumber .watN input {
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
        line-height: 28px;
    }

    .waterNumber img {
        width: 15px;
        height: 15px;
    }

    .moneyBj {
        height: 35px;
        line-height: 35px;
        align-items: flex-end;
    }

    .moneyBj span {
        line-height: 35px;
    }

    /*数值*/
    .stepper input {
        width: 34px;
        height: 25px;
        float: left;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        z-index: 1;
        /*给中间的input设置左右边框即可*/
        border-left: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
    }

    /*普通样式*/
    .stepper .normal {
        color: #616161;
    }

    /*禁用样式*/
    .stepper .disabled {
        color: #ccc;
    }


    .listrb {
        font-size: 11px;
        color: #616161;
    }

    .changeshopcar {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 25%;
    }

    .changeshopcar div {
        width: 50px;
        height: 25px;
        border: 1px solid #FF6B60;
        border-radius: 5px;
        text-align: center;
        line-height: 25px;

        color: #FF6B60;
    }

    .allCheck {
        margin-left: 15px;
    }

    .van-button--danger {
        background: $backColor;
        border: 1px solid $backColor;
    }

    .van-submit-bar__price {
        color: $color;
    }

    .van-submit-bar__button {
        width: 150px;
    }
</style>