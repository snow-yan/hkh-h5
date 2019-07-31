<template>
    <div>
        <Header-view :headerMsg='headerMsg' />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <Order-mes :list='orderList' />
        </van-list>
    </div>
</template>
<script>
    import HeaderView from '../components/header'
    import OrderMes from '../components/list'
    import { OrderMesssage } from '../api/api'
    import { List } from 'vant'
    export default {
        components: {
            HeaderView,
            OrderMes,
            [List.name]: List
        },
        data() {
            return {
                headerMsg: {
                    title: '历史订单',
                    lefticon: true,
                    left: '返回',
                    right: '',

                },
                orderList: [],
                loading: false,
                finished: false,
                pageindex: 1,
                count: 0
            }
        },
        created() {
            // this.getOrder()
        },
        methods: {
            getOrder() {
                const obj = {
                    action: "GetAllOrderList",
                    siteid: this.siteid,
                    mid: JSON.parse(localStorage.getItem('user'))[0].id,
                    orderphase: '',
                    pageindex: this.pageindex,
                }
                OrderMesssage(obj).then(res => {
                    if (res.status == 1) {
                        this.pageindex += 1;
                        const msg = res.msg.dt;
                        msg.map(item => {
                            item.OrderProductList = JSON.parse(item.OrderProductList);
                            this.orderList.push(item);


                        })
                        this.count = res.msg.DataCount;

                    }
                })

            },
            onLoad() {
                this.getOrder()
               // console.log(this.pageindex, 'pageindex');
                // 异步更新数据
                setTimeout(() => {
                    // // 加载状态结束
                    this.loading = false;
                    // // 数据全部加载完成//
                    if (this.orderList.length >= this.count) {
                        this.finished = true;
                    }
                }, 500);
            }
        },
    }
</script>