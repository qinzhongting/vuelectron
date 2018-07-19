<template>
  <div id="title">
    <p @click="close" class="btn close">x</p>
    <p @click="min" class="btn min">-</p>
    <p @click="max" class="btn max">□</p>
  </div>
</template>

<script>
  const ipc = require('electron').ipcRenderer;
  export default {
    data () {
      return {
        name:'as~~~~'
      }
    },
    methods: {
      close (link) {
        ipc.send('window-close');
      },
      min (link) {
        ipc.send('window-min');
      },
      max (link) {
        ipc.send('window-max');
      }
    }
  }
</script>

<style>
  #title{
    height: 40px;
    background: #ccc;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    -webkit-app-region:drag
  }
  #title .btn{
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 30px;
    font-family: sans-serif;
    font-weight: 100;
    transition: all 0.2s;
    cursor: pointer;
    -webkit-app-region: no-drag;
    display: inline-block;
  }
  #title .btn:hover{
    background: #e9e9e9;
  }
  #title .close:hover{
    background: #f00;
    color: #fff;
  }
</style>
