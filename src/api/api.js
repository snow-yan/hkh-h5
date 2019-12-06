import { post } from '../axios.js';//导入axios实例文件中方法
const baseUrl = process.env.NODE_ENV == 'production' ? '' : '/api'
// const baseUrl = 'https://test.hkhsc.com'
import qs from 'qs';

export const getHomeMes = obj => post(`${baseUrl}/shop/goods/shopcar.ashx`, qs.stringify(obj));  //获取首页地址以及商品列表、购物车列表

export const getShop = obj => post(`${baseUrl}/shop/goods/goods.ashx`, qs.stringify(obj)); //商品详情页所需 、加入购物车、 获取商品banner以及积分优惠等、获取商品图文详情

export const Settlement = obj => post(`${baseUrl}/shop/goods/shopcar.ashx`, qs.stringify(obj));  //结算,创建订单

export const mineMessage = obj => post(`${baseUrl}/shop/mine/AccountManage.ashx`, qs.stringify(obj));  //个人中心 信息 地址列表

export const OrderMesssage = obj => post(`${baseUrl}/shop/Order/OrderManage.ashx`, qs.stringify(obj));  //历史订单 