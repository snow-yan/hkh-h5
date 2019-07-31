<template>
    <div class="Map">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch" id='suggestId'>
            <div slot="action" @click='onSearch'>搜索</div>
        </van-search>
        <div id="allmap"></div>
        <ul id="r-result">

            <li class="borderBottom mt5 pl10" style="height: 60px;" v-for="(item,index) in html"
                @click="goAddress(item)" :key="index">

                <div><span class="c6 font16 hidden">{{item.title}}</span></div>
                <div class="c6 font12 mt5 hidden">
                    {{item.address}}
                </div>
            </li>

        </ul>



    </div>
</template>

<script>
    /* eslint-disable quotes,camelcase */

    import { MP } from "../map"
    import { Search } from 'vant'
    //  import {MP} from "./js/BMap"
    //  import {Change} from './js/changeJingwei'
    export default {
        name: 'Map',
        components: {
            [Search.name]: Search
        },
        data() {
            return {
                ak: '0r8y6Vg8F9dAnAwsGHUzvfxhG8NmkI0u',
                value: '',
                html: []
            }
        },
        created() {
            this.onSearch()
        },
        mounted() {
            this.$nextTick(function () {

            })
        },
        props: {
            province: {
                type: String
            },
            name: {
                type: String
            },
            city: {
                type: String
            },
            height: {
                type: Number
            },
            width: {
                type: Number
            }
        },
        methods: {
            onSearch() {
               

                this.html = [];
        
                var searchVal = this.value ? this.value : '';
                MP(this.ak).then(BMap => {
                    var self = this;
                    var map = new BMap.Map("allmap");           // 创建Map实例                  

                    let geolocation = new BMap.Geolocation()

                    geolocation.enableSDKLocation(); //允许SDK辅助
                    geolocation.getCurrentPosition(function (r) {


                        if (this.getStatus() == 0) {
                            //console.log(r)
                            var marker = new BMap.Marker(r.point);
                            map.addOverlay(marker);

                            map.centerAndZoom(r.point, 16);

                            var myKeys = ["公司", "楼"];

                            var circle = new BMap.Circle(r.point, 500, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.2, strokeOpacity: 0.2 });
                            map.addOverlay(circle);
                            var options = {
                                onSearchComplete: function (results) {
                                    // 判断状态是否正确-
                                    // if (local.getStatus() == 0) {
                                      //  console.log(results, 'results')
                                        results.map(item => {
                                            item.Ar.map(i => {
                                                self.html.push(i)
                                            })
                                        })

                                       // console.log(self.html, 'html')



                                    // }
                                }
                            };
                            var local = new BMap.LocalSearch(map, options);
                            if (searchVal) {
                                var arr = [];
                                arr.push(searchVal)
                                local.search(arr);
                            } else {
                                local.searchNearby(myKeys, r.point, 500);
                            }



                        } else {

                            alert('定位失败：' + this.getStatus());

                        }
                    })



                })
            },
            goAddress(item) {
                let obj = {
                  
                    title: item.title,
                    city: item.city,
                    province: item.province,
                    address: item.address,
                    place:item.point.lng+'_'+item.point.lat
                }

                MP(this.ak).then(BMap => {
                    const point = new BMap.Point(item.point.lng, item.point.lat)
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(point, (r) => {
                        obj.district = r.addressComponents.district;

                        localStorage.setItem('map', JSON.stringify(obj));
                        this.$router.go(-1)
                    })
                })

                // this.$emit('maps',obj);

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .van-search {
        height: 8vh;
    }

    .Map {
        /* width: 100vh; */
        height: 100vh;
        position: relative;
    }



    #allmap {
        height: 54vh;
        width: 100%;
    }

    #r-result {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 38vh;
        width: 100%;
        overflow-y: scroll;
        z-index: 99999999;

        div:first-child {
            border: none !important;
        }

        span {
            background: none !important;
            width: auto !important;
        }
    }
</style>