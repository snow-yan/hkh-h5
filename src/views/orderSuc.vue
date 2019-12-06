<template>
  <div>
    <Header-view :header-msg='headerMsg'/>
    <ul class="flex Between p30">
      <li>
        <img 
          src="../assets/images/homepage/success_big@2x.png" 
          alt="" 
          width="60">
      </li>
      <li class="flex column state">
        <div class="font22 fw6 c3">订单支付成功</div>
        <div class="font12 fw4 c6 mt5">您的订单正在处理中</div>
      </li>
      <li>查看订单</li>
    </ul>
    <ul class="shopList  mt5">
      <li 
        class="list p30 flex Start borderBottom" 
        v-for='(item,index) in msg' 
        :key='index' 
        :msg='msg'>
        <img 
          :src="item.url" 
          alt="" 
          class="shopImg">
        <ul class="ml10 listMes flex Between">
          <li class="font16 fw6 c3">{{ item.saleName }}</li>
          <li class="flex Between">
            <span class="color font18 "><span class="font14 color">￥</span>{{ item.xsprice }}</span>
            <span>× {{ item.nums }}</span>
    
          </li>
        </ul>
      </li>
    </ul>
    <div class="flex column">

            
      <h5 class="tc fw4 mt20 mb5">为了让您获得更好和更多的体验，强烈建议您</h5>
      <h3 class="tc">使用我们的小程序</h3>
      <img 
        src="../assets/images/homepage/gh_f04b80e7c17d_258.jpg" 
        alt="" 
        width="150">
      <!-- <h5 class="tc fw4 mt10 mb1">长按保存图片</h5> -->
      <h3 class="tc">长按保存图片</h3>
      <h5 class="tc fw4 ">客服电话:96198</h5>
    </div>
  </div>
</template>
<script>
    import HeaderView from '../components/header'
export default {
    data() {
        return {
            headerMsg:{
                    title:'历史订单',
                    lefticon:true,
                    left:'返回',
                    right:''
                },
                msg: JSON.parse(localStorage.getItem('order')),              //购物车选择的商品
        }
    },
    components:{
        HeaderView
    }
}
</script>
<style lang="scss">
    .state{
        width: 50%;
        div{
            width: 100%;
        }
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

</style>