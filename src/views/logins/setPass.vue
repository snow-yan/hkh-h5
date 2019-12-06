<template>
  <div>


    <Header-view :header-msg='headerMsg' />
    <Login-common>
      <div slot="item">
        <div class='inputbox flex'>
          <img 
            src='../../assets/images/homepage/key_png.png' 
            class='suo' >
          <input 
            placeholder='输入8-16位密码' 
            type="password" 
            v-model='password' >
        </div>
        <button 
          class='loginbtn mt10' 
          @click='setPass'>确认</button>
      </div>

    </Login-common>
  </div>
</template>
<script>
    import HeaderView from '../../components/header'
    import LoginCommon from '../../components/loginCom.vue'
    import { mineMessage } from '../../api/api'
    import { MP } from "../../map"
    export default {
        data() {
            return {
                headerMsg: {
                    title: '设置密码',
                    lefticon: true,
                    left: '返回',
                    right: '',


                },
                password: '',
                ak: '0r8y6Vg8F9dAnAwsGHUzvfxhG8NmkI0u',
                point: '',
                mes:'',
                loginType:''
            }
        },
        created() {
            //console.log( this.$store.state.loginMes)
           this.loginType = this.$store.state.loginType;

            this.getLocations();
            if (this.loginType == 'forgetPass') {
                this.$set(this.headerMsg, 'title', '设置新密码')
            }
            this.mes = this.$store.state.loginMes
        },
        components: {
            HeaderView,
            LoginCommon,
        },
        methods: {
            getLocations() {
                const self = this;
                MP("0r8y6Vg8F9dAnAwsGHUzvfxhG8NmkI0u").then(BMap => {
                    let geolocation = new BMap.Geolocation();
                    geolocation.enableSDKLocation(); //允许SDK辅助
                    geolocation.getCurrentPosition(function (r) {
                       // console.log(r);
                        self.point = r.point;
                    })
                })
            },
            setPass() {
                this.mes.pass = this.password;
                this.$store.commit('saveLoginMes',this.mes);
               // console.log(this.loginType)
                if (this.loginType == 'regist') {
                    const jwD = this.point.lng + '_' + this.point.lat;
                    const obj = {
                        action: 'UserRegion',
                        tel: this.mes.tel,
                        pass: this.password,
                        vercode: this.mes.vercode,
                        siteid: this.siteid,
                        sys: 3,
                        position: jwD,  //百度经纬度
                        mid: ''
                    }
                   // console.log(obj);
                    mineMessage(obj).then(res => {
                        console.log(res);
                        if (res.status == 1) {
                            this.$toast('注册成功')
                            this.$router.replace({ path: '/login' })
                        }
                    })
                }else{
                    const obj = {
                        action: 'ForgetPass',
                        tel: this.mes.tel,
                        pass: this.password,
                        vercode: this.mes.vercode,
                       
                    }
                    mineMessage(obj).then(res => {
                        console.log(res);
                        if (res.status == 1) {
                            this.$toast(res.msg)
                            this.$router.replace({ path: '/login',query:{tel:this.mes.tel} })
                        }
                    })
                }

                // 重置密码
                // action	ForgetPass
                // pass	123456
                // tel	15735183506
                // vercode	4008
            }
        },
    }
</script>