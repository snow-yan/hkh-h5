<template>
  <div id="app">

    <router-view />

  </div>
</template>
<script>


    export default {


    }
</script>
<style lang="scss">
    html {
        background: #FAFAFA;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

    }

    .box {
        background: #ffffff;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    input,
    button {
        border: none;
        background: transparent;
    }

    .tl {
        text-align: left
    }
    .tc{
        text-align: center
    }
    .borderBottom {
        position: relative;
    }

    .borderBottom::after {
        content: '';
        position: absolute;
        width: 200%;
        height: 1px;
        bottom: 0;
        left: 0;
        background: #E5E5E5;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scale(0.5, 0.5);
        -ms-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    img {
        vertical-align: middle
    }

    .p {
        padding: 10px 15px;
    }
    img{
        vertical-align: middle;
    }
</style>