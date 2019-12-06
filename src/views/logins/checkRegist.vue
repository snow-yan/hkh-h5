<template>
  <div>
    <Header-view :header-msg='headerMsg' />
    <Login-common>
      <div slot="item">
        <div class='inputbox flex'>
          <img src='../../assets/images/homepage/phnoe_png.png' >
          <input 
            placeholder='输入手机号/用户名' 
            name='username' 
            v-model='obj.tel' >
        </div>
        <div class='inputbox flex Between'>
          <img 
            src='../../assets/images/homepage/key_png.png' 
            class='suo' >
          <input 
            placeholder='输入验证码' 
            type="password" 
            name='password' 
            style="width: 60%" 
            v-model='obj.imgCode'>
          <img 
            :src="src" 
            alt="" 
            width="80" 
            @click='changeImgcode'>
        </div>
        <button 
          class='loginbtn ' 
          @click='tijiaoCheck'>验证</button>
      </div>
    </Login-common>
  </div>
</template>
<script>
    import HeaderView from '../../components/header'
    import LoginCommon from '../../components/loginCom.vue'
    import { mineMessage } from '../../api/api'
    import { mapState , mapMutations  } from 'vuex'
    export default {
        components: {
            HeaderView,
            LoginCommon,
        },
        computed: {
            ...mapState({
                loginMessage: state => state.loginMes
            }),
        },
        data() {
            return {
                headerMsg: {
                    title: '',
                    lefticon: true,
                    left: '返回',
                    right: '',
                    flag: false
                    
                },
                src:'/api/shop/mine/imgcode.ashx?rc=' + Math.round(Math.random() * 1000),
                obj:{
                    tel:'',
                    imgCode:''
                },
                type:''
            }
        },
        created() {
            this.type = this.$store.state.loginType
            if(this.type == 'regist'){
                // this.headerMsg.title = '注册'
                this.$set(this.headerMsg,'title','注册')
            }else{
                this.$set(this.headerMsg,'title','忘记密码')
            }
        },
        methods: {
            ...mapMutations(['saveLoginMes']),
            changeImgcode(){
                console.log(mapState)
                this.src='/api/shop/mine/imgcode.ashx?rc=' + Math.round(Math.random() * 1000)
            },
            tijiaoCheck(){
                const obj = {
                    action:	'CheckTelImgCode',
                    imgcode:this.obj.imgCode,
                    tel:this.obj.tel
                }
                mineMessage(obj).then(res => {
                    console.log(res)
                    this.loginMessage.tel = this.obj.tel ;
                    this.saveLoginMes( this.loginMessage)
                    if(res.status == 1){
                       
                        if(this.type == 'regist'){  //手机号未注册跳转 获取验证码页面
                            this.$router.replace({path:'/getcode'});
                          
                        }else{
                            this.$toast(res.msg)
                        }
                        
                    }else if(res.status == 2){      
                        if(this.type == 'regist'){ //手机号已注册 跳转 选择重新注册或前往登录
                            //  this.$router.push({path:'/choise',query:{tel:this.obj.tel}})
                             this.$router.replace({path:'/choise'})

                        }else{   //前往设置密码页面
                            this.$router.replace({
                                 name:'getcode',
                                 params:{
                                     tel:this.obj.tel,
                                 }
                             })
                        }
                    }
                })
            }
        },
    }
</script>