<template>
    <div>
        <Header-view :headerMsg='headerMsg' />
        <div class="van-address-edit">
            <div class="van-cell van-field">
                <div class="van-cell__title van-field__label"><span>收货人</span></div>
                <div class="van-cell__value">
                    <div class="van-field__body"><input type="text" placeholder="收货人姓名" class="van-field__control"
                            v-model="obj.name" @blur='getMes'>
                    </div>
                </div>
            </div>
            <div class="van-cell van-field">
                <div class="van-cell__title van-field__label"><span>联系电话</span></div>
                <div class="van-cell__value">
                    <div class="van-field__body"><input type="tel" placeholder="收货人手机号" class="van-field__control"
                            v-model="obj.tel" @blur='getMes'>
                    </div>
                </div>
            </div>

            <div class="van-cell van-field ">
                <router-link :to='{path:"/map"}' class="flex Between " style="width: 100%">
                    <div class="van-cell__title van-field__label"><span class="c3">地址定位</span></div>
                    <div class="van-cell__value">
                        <div class="van-field__body">
                            <input type="tel" maxlength="6" placeholder="地址定位" class="van-field__control"
                                v-model='map.title'>
                        </div>
                    </div>
                    <img src="../assets/images/homepage/home_smallmore_icon@2x.png" alt="" width="10"
                        style="float: right" />
                </router-link>
            </div>


            <div class="van-cell van-address-edit-detail">
                <div class="van-cell__value van-cell__value--alone">
                    <div class="van-cell van-field">
                        <div class="van-cell__title van-field__label"><span>详细地址</span></div>
                        <div class="van-cell__value">
                            <div class="van-field__body"><textarea rows="1" maxlength="200" placeholder="街道门牌、楼层房间号等信息"
                                    class="van-field__control" style="height: 24px;" v-model="obj.address"
                                    @blur='getMes'></textarea></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="van-cell van-cell--center van-switch-cell">
                <div class="van-cell__title">
                    <van-checkbox v-model="obj.isdefault" checked-color="#1989fa" @change='getMes'>设为默认地址</van-checkbox>
                </div>
            </div>
            <div class="van-address-edit__buttons"><button
                    class="van-button van-button--info van-button--normal van-button--block" @click='addAddress'><span
                        class="van-button__text">保存</span></button><button
                    class="van-button van-button--default van-button--normal van-button--block"><span
                        class="van-button__text">删除</span></button></div>
        </div>

    </div>
</template>
<script>

    import { AddressEdit, checkbox } from 'vant';
    import HeaderView from '../components/header';
    import { mineMessage } from '../api/api';
    import { mapMutations, mapState } from 'vuex'

    export default {
        data() {
            return {
                headerMsg: {
                    title: '新增地址',
                    lefticon: true,
                    left: '返回',
                    right: '',
                    flag: false

                },
                searchResult: [],
                map: JSON.parse(localStorage.getItem('map')) || '', //选择的地图信息                
                mid: JSON.parse(localStorage.getItem('user'))[0].id,  //mid
                addressId: this.$route.params.id || '', //地址id
                // obj:{
                //     name:this.$store.state.addressObj.name||'',
                //     tel:this.$store.state.addressObj.tel||'',
                //     address:this.$store.state.addressObj.address||'',
                //     isdefault:this.$store.state.addressObj.isdefault||false, //默认地址
                // },
            }

        },
        computed: {
            ...mapState({
                obj: state => state.addressObj
            }),

        },
        components: {
            HeaderView,
            [AddressEdit.name]: AddressEdit,
            [checkbox.name]: checkbox

        },
        created() {
            localStorage.removeItem('map');

          //  console.log(this.addressId, 'addressId');
            if (this.addressId != '') {
                this.getAddress();
            }
        },
        methods: {
            ...mapMutations([
                'saveAdr'
            ]),
            // 如果是编辑就执行获取地址信息
            getAddress() {
                const objs = {
                    action: "GetAddressById",
                    addid: this.addressId
                }
                mineMessage(objs).then(res => {
                   // console.log(res);
                    const msg = res.msg;
                    if (res.status == 1) {
                        const edit = {
                            name: msg.contactName,
                            tel: msg.contactTel,
                            address: msg.address,
                            isdefault: msg.IsDefault ? 1 : 0
                        }
                        this.saveAdr(edit)
                        this.map = {
                            address: msg.address,
                            city: msg.city,
                            district: msg.district,
                            province: msg.province,
                            title: msg.location,
                            place: msg.place
                        }
                    }
                })
            },
            getMes() {
                this.saveAdr(this.obj)  // this.$store.commit('saveAdr',this.obj)
            },
            addAddress() {
                if (this.obj.name == '') {
                    this.$toast('请输入收货人')
                } else if (this.obj.tel == '' || this.obj.tel.length != 11) {
                    this.$toast('请输入正确的收货电话')
                }
                const obj = {
                    action: "AddNewAddress",
                    contactname: this.obj.name,
                    contacttel: this.obj.tel,
                    address: this.obj.address,
                    location: this.map.title,
                    isdefault: this.obj.isdefault ? 1 : 0,  //      1/0
                    siteid: this.siteid,
                    mid: this.mid,
                    province: this.map.province,
                    city: this.map.city,
                    district: this.map.district,
                    place: this.map.place,
                    addid: this.addressId || ''
                }
                mineMessage(obj).then(res => {
                    if (res.status == 1) {
                        const init = {
                            name: '',
                            tel: '',
                            address: '',
                            isdefault: 0,     //0||1
                        };
                        this.saveAdr(init)
                        this.$router.go(-1);

                    }
                    this.$toast(res.msg)
                })
            }
        },
    }
</script>