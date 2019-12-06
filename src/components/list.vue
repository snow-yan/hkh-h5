<template>
  <div>
    <ul 
      v-for='(item,index) in list ' 
      class="mb5 white" 
      :key='index'>
      <li 
        class=" borderBottom flex p30 lists  " 
        v-for='(itm,idx) in item.OrderProductList' 
        :key='idx'>
        <div class="img flex">
          <img :src="itm.imgurl">
        </div>
        <div class="xq  flex column Between">
          <div class="flex Between"><span class="font14">{{ itm.saleName }}</span><span
            class="color">￥{{ itm.xsprice }}</span></div>
          <div class="flex Between"> <span class="font12">{{ itm.propValues }}</span> <span>×{{ itm.nums }}</span>
          </div>
        </div>
      </li>

      <li class="states flex Between borderBottom">
        <span 
          v-if='item.orderPhase==0' 
          class="fw6 font14">待支付</span>
        <span 
          v-else-if='item.orderPhase==1' 
          class="fw6 font14">待收货</span>
        <span 
          v-else-if='item.orderPhase==3' 
          class="fw6 font14">已完成</span>
        <span 
          v-else-if='item.orderPhase==4' 
          class="fw6 font14">已取消</span>
        <span class="font12 fw5 c6">共{{ item.OrderProductList.length }}件商品 合计:￥<span
          class="font14">{{ item.totalMoney }}</span></span>
      </li>
      <li class="btn flex End">
        <van-button 
          plain 
          hairline 
          type="danger" 
          v-if='item.orderPhase==0'>取消订单</van-button>
        <van-button 
          plain 
          hairline 
          type="danger" 
          v-if='item.orderPhase==0' 
          class="ml10">立即支付</van-button>
        <van-button 
          plain 
          hairline 
          type="danger" 
          v-if='item.orderPhase==1 || item.orderPhase==2' 
          class="ml10">催单
        </van-button>
        <van-button 
          plain 
          hairline 
          type="danger" 
          v-if='item.orderPhase==1 || item.orderPhase==2' 
          class="ml10">
          查看物流</van-button>
        <van-button 
          plain 
          hairline 
          type="danger" 
          v-if='item.orderPhase==3 || item.orderPhase==4' 
          class="ml10">
          删除订单</van-button>
      </li>
    </ul>
  </div>
</template>
<script>
    import { Button } from 'vant'
    export default {
        props: ['list'],
        // props:{
        //     list:{
        //         type: Object,
        //         default: null
        //     }
        // },
        created() {
            // console.log(this.list)
        },
        components: {
            [Button.name]: Button
        }
    }
</script>
<style lang="scss" scoped>
    .lists {
        .img {
            width: 30%;

            img {
                width: 70px;
                height: 70px;
                background: #ededed;
            }
        }

        .xq {
            width: 70%;
            height: 70px;

            div {
                width: 100%;

            }
        }

    }

    .states {
        padding: 10px 15px;
    }

    .btn {
        padding: 10px 15px;
    }

    .van-button {
        height: 30px;
        line-height: 30px;
    }

    .van-button--plain.van-button--danger {
        color: #FF693D;
    }
</style>