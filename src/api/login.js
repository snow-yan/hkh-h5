import { post } from '../axios.js';//导入axios实例文件中方法
const baseUrl=process.env.NODE_ENV=='production'?'':'/api'
import qs from 'qs';

export const UserLogin = obj => post(`${baseUrl}/shop/mine/AccountManage.ashx`, qs.stringify(obj));  //获取搜索框以及消息条数