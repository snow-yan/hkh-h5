<template>
        <div>
            <Header-view :headerMsg='headerMsg' />
            <Login-common>
                <div slot="item">
                   
                    <div class='inputbox flex Between'>
                        <img src='../../assets/images/homepage/yanzhengmma_png.png' class='suo' />
                        <input placeholder='请输入验证码' type="password" name='password' style="width: 55%"  v-model='vercode'/>
                        <!-- <van-button type="info">获取验证码</van-button> -->
                        <van-button slot="button" size="small" type="info" @click='showTime' v-if='TimesShow'>发送验证码</van-button>
                        <div v-else class="flex font12">
                                <van-count-down :time="time"  format="ss"  @finish="showTime"/>s后重新获取
                        </div>
                        
                    </div>
                    <button class='loginbtn mt10' @click='checkCode'>验证</button>
                </div>
            </Login-common>
        </div>
    </template>
    <script>
        import HeaderView from '../../components/header'
        import LoginCommon from '../../components/loginCom.vue'
        import { mineMessage } from '../../api/api'
        import {Button,CountDown } from 'vant'
        export default {
            components: {
                HeaderView,
                LoginCommon,
                [Button.name]:Button,
                [CountDown.name]:CountDown 
            },
            data() {
                return {
                    headerMsg: {
                        title: '获取验证码',
                        lefticon: true,
                        left: '返回',
                        right: '',
                        flag: false,
                        
                        
                    },
                    time:60*1000,
                    TimesShow:true,
                    vercode:'',
                    tel:'',
                    mes:'',// vuex里的值
                   
                }
            },
            created() {
                // this.tel = this.$route.query.tel;
                this.tel = this.$store.state.loginMes.tel;
                this.mes = this.$store.state.loginMes
            },
            methods: {
                showTime(){
                    this.TimesShow = !this.TimesShow;
                    const obj = {action:"GetCode",
                                mobile:this.tel,
                                siteId:	this.siteid
                                }
                                mineMessage(obj).then(res=>{
                                  //  console.log(res);
                                    this.$toast(res.msg);
                                    
                                    
                                })
                },
                checkCode(){
                    const obj = {
                        action:'CheckVerCode',
                        tel:this.tel,
                        vercode:this.vercode,
                    }

                    mineMessage(obj).then(res =>{
                        //console.log(res);
                        if(res.status == 1){
                           this.mes.vercode = this.vercode;
                           this.$store.commit('saveLoginMes',this.mes)
                             //跳转设置登录密码页面;
                             this.$router.replace({
                                 path:'setPass',
                                 query:{
                                     tel:this.tel,
                                     vercode:this.vercode
                                 }
                             })
                        }
                    })
                }
                
            },
        }
    </script>
    <style scoped>
       
    </style>