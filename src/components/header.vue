<template>
  <div>
    <header id='header'>
      <van-nav-bar 
        :title="headerMsg.title" 
        :left-text="headerMsg.left" 
        :left-arrow='headerMsg.lefticon'
        :right-text="headerMsg.right" 
        @click-left="onClickLeft" 
        @click-right="onClickRight" />
    </header>
    <div style="height: 46px;"/>
  </div>
</template>
<script>
    import { NavBar,Dialog  } from 'vant';
    export default {
        components: {
            [NavBar.name]: NavBar,
        },
        props: ['headerMsg'],
        // props:{
        //     headerMsg:{
        //         type: String,
        //         default: ''
        //     }
        // },
        created() {
            // console.log(this.headerMsg)
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
                if (!this.headerMsg.flag) {
                    const init = {
                        name: '',
                        tel: '',
                        address: '',
                        isdefault: 0,     //0||1
                    };

                    this.$store.commit('saveAdr', init)
                }
            },
            onClickRight() {
                
                if(this.headerMsg.leave){
                    Dialog.confirm({
                        title: '提示',
                        message: '您确定要退出登录吗？'
                        }).then(() => {
                            localStorage.removeItem('user');
                            this.$router.push({
                                path:'/'
                            })
                        }).catch(() => {
                        // on cancel
                        });
                    
                }else{
                    this.$router.push({
                        path:'/history'
                    })
                }

            }
        },

    }
</script>
<style lang="scss">
    /* -------------header---------- */
    #header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;

    }

    .van-nav-bar {
        background: $backColor;
    }

    .van-nav-bar__text,
    .van-nav-bar__title,
    .van-nav-bar .van-icon {
        color: $white;
    }

    .van-nav-bar__text:hover {
        background: $backColor;

    }
</style>