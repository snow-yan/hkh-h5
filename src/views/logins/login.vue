<template>
        
  <div>
    <Header-view :header-msg='headerMsg' />
    <Login-common>
      <div slot="item">
        <div class='inputbox flex '>
          <img src='../../assets/images/homepage/phnoe_png.png' >
          <input 
            placeholder='输入手机号/用户名' 
            name='username' 
            v-model='username' >
        </div>
        <div class='inputbox flex'>
          <img 
            src='../../assets/images/homepage/key_png.png' 
            class='suo' >
          <input 
            placeholder='输入8-16位密码' 
            type="password" 
            name='password' 
            v-model='password' >
        </div>
        <div class='caozuo flex Between'>
          <span @click='forgetPass'>忘记密码</span>
          <span @click='goCheck'>手机号注册</span>
        </div>
            
        <!-- <div class='loginbtn' catchtap='tologin'>登录</div> -->
        <button 
          class='loginbtn ' 
          @click='userLogin'>登录</button>
          <!-- </form> -->
      </div>
    </Login-common>
  </div>
</template>

<script>
    import { Button, Field, cellGroup } from 'vant';
    import { UserLogin } from '../../api/login';
    import { Toast } from 'vant';
    import router from '../../router';
    import LoginCommon from '../../components/loginCom.vue'
    import HeaderView from '../../components/header'
    export default {
        data() {
            return {
                username: '', 
                password: '',
                headerMsg: {
                    title: '登录',
                    lefticon: true,
                    left: '返回',
                    right: '',
                    flag: false
                },
            }
        },
        components: {
            [Field.name]: Field,
            [cellGroup.name]: cellGroup,
            [Button.name]: Button,
            LoginCommon,
            HeaderView,
        },
        created() {
            console.log(this.$route.query.tel)
            if(this.$route.query.tel){
                this.username = this.$route.query.tel;
            }
        },
        methods: {
            userLogin() {
                // console.log(this.username, this.password);
                if (this.username == '') {
                    Toast('用户名不能为空!')
                } else if (this.password == '') {
                    Toast('密码不能为空!')
                } else {
                    const obj = {
                        action: 'DoLogin',
                        username: this.username,
                        pass: this.password,
                        equipment: ''
                    }
                    UserLogin(obj).then(res => {
                        // console.log(res);
                        if (res.status == 1) {
                            localStorage.setItem('user', JSON.stringify(res.msg));
                            router.push({ path: '/' })
                        }

                    })
                }


            },
            // 注册
            goCheck(){
                this.$router.push({name:'check'});
                this.$store.commit('saveType','regist')
            },
            // 忘记密码
            forgetPass(){
                this.$router.push({name:'check'})
                this.$store.commit('saveType','forgetPass')
            }
        },
    }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    
    
</style>