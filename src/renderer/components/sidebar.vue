<template>
  <div id="sidebar">
    <ul>
      <li><a href="#/ax/dh1">页面1</a></li>
      <li><a href="#/ax/dh2">页面2</a></li>
      <li><a href="#/ax/dh3">系统信息</a></li>
      <li><a href="#/ax/dh4">检查更新</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name:'as~~~~'
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  #sidebar{
    width: 100px;
    position: fixed;
    top: 0;
    height: 100%;
    left: 0;
    padding-top: 40px;
    box-sizing: border-box;
    z-index: 99;
    background: #f7f4f4;
  }
  #sidebar ul,
  #sidebar li{
    list-style: none;
    text-align: center;
  }
</style>
