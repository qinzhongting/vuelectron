<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vueele'
  }
</script>

<style>
  /* CSS */
  *{
    margin: 0;
    padding: 0;
  }
  /*fade*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/*breadcrumb transition*/
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
.quitExit{
  margin-left: 10px!important;
}

::-webkit-scrollbar 
{
    width: 5px;
    height: 5px;
    background-color: #409eff;
} 
   
/*定义滚动条轨道 内阴影+圆角*/ 
::-webkit-scrollbar-track 
{
    border-radius: 10px;
    background-color: #c4ddff;
} 
   
/*定义滑块 内阴影+圆角*/ 
::-webkit-scrollbar-thumb 
{
    border-radius: 10px;
    background-color: #409eff;
} 
</style>
