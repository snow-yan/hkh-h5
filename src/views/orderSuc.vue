<template>
    <div>
            <Header-view  :headerMsg='headerMsg'/>
    </div>
</template>
<script>
    import HeaderView from '../components/header'
export default {
    data() {
        return {
            headerMsg:{
                    title:'历史订单',
                    lefticon:true,
                    left:'返回',
                    right:''
                }
        }
    },
    components:{
        HeaderView
    }
}
</script>