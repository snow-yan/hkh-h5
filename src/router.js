import Vue from 'vue'
import Router from 'vue-router'
// import Login from './views/logins/login.vue'
// import Checkregist from './views/logins/checkRegist.vue'
// import Home from './views/Home.vue'
// import Detail from './views/detail.vue'
// import Car from './views/shopCar.vue'
// import List from './views/addressList.vue'
// import AddList from './views/addAddress.vue'
// import OrderDetail from './views/orderDetail.vue'
// import Maps from './views/choiseMap.vue'
// import History from './views/historyOrder.vue'



const Home = () => import('./views/Home.vue')                      //首页 1
const Detail = () => import('./views/detail.vue')                  //商品详情 2
const Car = () => import('./views/shopCar.vue')                    //购物车 3
const List = () => import('./views/addressList.vue')               //地址列表 4
const AddList = () => import('./views/addAddress.vue')             //添加新增地址 5
const OrderDetail = () => import('./views/orderDetail.vue')        //结算 6
const Maps = () => import('./views/choiseMap.vue')                 //地址选择地图 7
const History = () => import('./views/historyOrder.vue')           //历史订单 8

const Getcode = () => import('./views/logins/getCode.vue')         //获取验证码 9
const Login = () => import('./views/logins/login.vue')             //登录 10
const Checkregist = () => import('./views/logins/checkRegist.vue') //验证图片验证码 11
const SetPass = () => import('./views/logins/setPass.vue') //获取手机验证码 12
const ChoiseRegist = () => import('./views/logins/choiseRegist.vue') //重新注册还是登录 13

const OrderSuc = () => import('./views/orderSuc.vue')           //历史订单 8


Vue.use(Router)

export default new Router({

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,

        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/check',
            name: 'check',
            component: Checkregist
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/car',
            name: 'car',
            component: Car
        },
        {
            path: '/adresslist',
            name: 'adresslist',
            component: List
        },
        {
            path: '/addAddress',
            name: 'addAddress',
            component: AddList
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: OrderDetail
        },
        {
            path: '/map',
            name: 'map',
            component: Maps
        },
        {
            path: '/history',
            name: 'history',
            component: History
        },
        {
            path:'/getcode',
            name:'getcode',
            component:Getcode
        },{
            path:'/setPass',
            name:'setPass',
            component:SetPass
        },{
            path:'/choise',
            name:'choise',
            component:ChoiseRegist
        },{
            path:'/orderSuc',
            name:'orderSuc',
            component:OrderSuc
        }
    ]
})
