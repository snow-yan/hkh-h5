<template>
  <div>
    <Header-view :header-msg='headerMsg' />
    <van-radio-group v-model="radio">
      <div 
        class='addressbox mb5' 
        v-for='(item,index) in list ' 
        :key='index'>
        <div 
          class='addressMes flex box' 
          @click='choiceAddress(item)'>
          <div class='adLeft'>
            <div class='flex adList'>
              <div class=''>
                <img 
                  src='../assets/images/homepage/home_man_icon@2x.png' 
                  mode='widthFix' >
              </div>
              <div class='ml10 flex '>
                <div 
                  class='c3 font16 hidden' 
                  style='max-width:330px;'>{{ item.contactName }}</div>
                <span class='mesTel'>{{ item.contactTel }}</span>
              </div>
            </div>
            <div class='flex adList mt5'>
              <div>
                <img 
                  src='../assets/images/homepage/home_local_icon@2x.png' 
                  mode='widthFix' >
              </div>
              <div class='ml10'>
                <span
                  class='mesAdr hidden2 font13 c6'>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.location }}{{ item.address }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class='operationbox flex Between mt5'>
          <div 
            class='operchoose' 
            catchtap='ToDefault'>
            <van-radio 
              :name="item" 
              @click='radioChecked'>
              <div class='ml3 font14 c6'>设为默认地址</div>
            </van-radio>
          </div>

          <div 
            class='operdo flex' 
            wx:else>
            <div 
              catchtap='thisss' 
              class="font12" 
              @click='editAddress(item.id)'>编辑</div>
            <img 
              src='../assets/images/homepage/del-icon@2x.png' 
              class='delAddress'
              @click='delAddress(item.id)' >
          </div>
        </div>
      </div>


    </van-radio-group>
    <div style="height: 42px;"/>
    <router-link :to='{path:"/addAddress"}'>
      <van-button 
        type="info" 
        class="addAddress">新增地址</van-button></router-link>
  </div>
</template>
<script>
    import HeaderView from '../components/header';
    import { RadioGroup, Radio, Button, Dialog } from 'vant';
    import { mineMessage } from '../api/api'
    export default {
        data() {
            return {
                headerMsg: {
                    title: '地址列表',
                    lefticon: true,
                    left: '返回',
                    right: '退出登录',
                    leave:true,

                },
                radio: {},
                mid: JSON.parse(localStorage.getItem('user'))[0].id,  //mid
                list: [], //地址列表
            }
        },
        components: {
            HeaderView,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Dialog.name]: Dialog
        },
        created() {
            this.getList();      

        },
        methods: {
            getList() {
                const obj = {
                    action: 'GetMyAddress',
                    siteid: this.siteid,
                    mid: this.mid
                }
                mineMessage(obj).then(res => {
                    console.log(res);
                    if (res.status == 1) {
                        this.list = res.msg;
                        const index = res.msg.find(item => item.IsDefault == true);
                        if (index != -1) {
                            this.radio = index;
                        }

                    }
                })
            },
            // 设置默认地址
            radioChecked() {
                // console.log(this.radio,e)
                const obj = {
                    action: "AdrToDefault",
                    mid: this.mid,
                    aid: this.radio.id
                }

                mineMessage(obj).then(res => {
                    this.$toast(res.msg)
                })
            },
            // 删除地址
            delAddress(aid) {

                Dialog.confirm({
                    title: '删除地址',
                    message: '确定要删除该地址吗？',
                }).then(() => {
                    const obj = {
                        action: "DelAddress",
                        addid: aid,
                        mid: this.mid,
                    }
                    mineMessage(obj).then(res => {
                        //console.log(res);
                        this.$toast(res.msg)
                        this.getList();

                    })
                });

            },   
            // 选地址 
            choiceAddress(item){
                //console.log(item);
                localStorage.setItem('address',JSON.stringify(item));
                this.$router.go(-1);
            },
            editAddress(id){
                console.log(id);
                this.$router.push({path:'/addAddress',query:{id:id}})
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        }
    }
</script>
<style lang="scss">
    .container {
        height: 100%;
    }

    .van-radio__icon {
        font-size: 18px;
    }

    .addressbox {
        background-color: white;
        padding: 7px 15px;
        /* margin-bottom: 24px; */
    }

    .username {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .myaddress {
        margin: 5px 0;
    }

    .operationbox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #616161;
    }

    .operchoose label,
    .operdo {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333333;
    }

    .operchoose radio {
        zoom: .7;
    }

    .operdo div {
        margin-left: 10px;
        padding: 5px;
        color: #999999;
        font-size: 14px;
    }

    .addaddress {
        position: fixed;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        background-color: #FF6B60;
        color: white;
        width: 100%;
        text-align: center;
        font-size: 15px;
    }

    /* 地址 */

    .addressMes {
        background: #fff;
        justify-content: flex-start;
        margin-top: 5px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #ededed;
    }

    .addressMes .adLeft {
        width: 100%;
    }

    .adList img {
        width: 17px;
        height: 17px;
        vertical-align: middle;
    }

    .mesTel {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        letter-spacing: 1px;
    }

    .mesAdr {
        /* font-size: 12px; */
        font-weight: 400;

        font-family: PingFang-SC-Regular;
    }

    .adRight {
        width: 10%;
    }

    .adRight img {
        width: 10px;
        height: 15px;
        float: right;
    }

    .delAddress {
        width: 18px;
        height: 18px;
        margin-left: 14px;
    }

    .operdo .activity {
        color: #fff;
        background-color: #FF6B60;
        border-radius: 5px;
        font-size: 14px;
        padding: 2px 10px;
    }

    .addAddress {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .van-button--info {
        background-color: $backColor;
        border: 1px solid $backColor;
    }
</style>