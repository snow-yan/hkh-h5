<template>
  <div>
    <div class="p30 ">
      <div class='container'>
        <div class='topbox'>
          <img 
            src='../assets/images/login/logo_haokuaihuo@2x.png' 
            class='hkhIcon' >
        </div>
        <div class='contentbox'>
          <slot name="item"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
   
   
</script>
<style lang="scss">
.tl {
        text-align: left
    }

    .logo {
        width: 150px;

        margin-top: 6rem;
    }


    .topbox {
        width: 170px;
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        margin: auto;
    }

    .topbox img {
        width: 100%;
    }

    .contentbox {
        padding-top: 180px;
    }
    .inputbox {
        width: 100%;
        border-bottom: 1px solid #d6d6d6;
      
        padding: 15px;
        box-sizing: border-box;
    }

    .inputbox img:first-child {
        width: 25px;
    }



    .inputbox input {
        width: 90%;
        margin-left: 1rem;
        font-size: 14px;
        border: none;
        background: transparent;
    }

    .caozuo {
     
        margin-top: 30px;
        color: #666;
        font-size: 12px;
    }

    .caozuo span {
        height: 60px;
    }

    .errorbox {
        padding: 10px 0;
    }

    .loginbtn {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-top: 50px;

        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: $backColor;
        color: white;
        font-size: 15px;
        font-weight: bold;
        border-radius: 5px;
    }

    .elselogin {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 70px;
    }
</style>