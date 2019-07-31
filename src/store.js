import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        addressObj:{
            name:'',
            tel:'',
            address:'',
            isdefault: 0,   
        },
        loginType:'' ,  //注册还是忘记密码
        loginMes:{      //用户登录注册信息
            tel:'',
            pass:'',
            vercode:'',          

        }
  },
  mutations: {
        saveAdr(state,data){
            state.addressObj = data ;
        },
        saveType(state,data){
            state.loginType = data ;
        },
        saveLoginMes(state,data){
            state.loginMes = data;
        }
      
  },


})
