<template>
  <div>

   
    <div class='container'>
      <div class='contentbox flex Center column'>
        <div class='userimg'><img 
          src="" 
          mode='widthFix'></div>
        <!-- <div class='username'>好快活</div> -->
        <div class='contentext'>手机号{{ tel }}已绑定好快活商城账号，请确定是否授权登陆</div>
        <div 
          class='btnbox' 
          @click='yonghuLogin'>授权登陆</div>
        <div 
          class='btnbox' 
          @click='newRegin'>重新注册</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            tel:''
        }
    },
    created() {
     
        this.tel = this.$store.state.loginMes.tel
    },
    methods: {
        yonghuLogin(){
            this.$router.replace({path:'/login'})
        },
        newRegin(){
            this.$router.replace({path:'/getcode'})
        }

    },
}
</script>
<style scoped>
.container {
  margin: 0 40px;
  width: auto;
  font-size: 14px;
}

.contentbox{
  margin:0 auto;
  display: flex;
  /* flex-direction: column;
  justify-content: center;
  align-items: center;*/
  text-align: center; 
  padding-top: 90px;
}

.userimg{
  margin-top: 30px;
}

.userimg,.userimg img{
  width:340rpx;
  height:68rpx;
}

.username{
  margin-top: 10px;
}

.contentext{
  color: #616161;
  font-size: 14px;
  margin-top: 32px;
  margin-bottom: 50px;
}

.btnbox{
  width: 235px;
  height: 40px;
  line-height: 40px;
  background-color: #FF6B60;
  color: white;
  margin-top: 13px;
  border-radius: 5px;
}
</style>