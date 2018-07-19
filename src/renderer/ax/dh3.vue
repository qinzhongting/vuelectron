<template>
  <div>
    <h1>{{name}}</h1>
    <ul>
      <li>系统架构：{{data.arch}}</li>
      <li>CPU 内核数：{{data.cpus.length}}
        <ul>
          <li v-for="(item,index) in data.cpus" :key="index">{{item.model}}</li>
        </ul>
      </li>
      <li>空闲系统内存:{{data.freemem}}字节</li>
    </ul>
  </div>
</template>

<script>
  const os = require('os');
  export default {
    data () {
      return {
        name:'运行系统信息',
        data:{},
      }
    },
    created(){
      this.data.arch = os.arch();
      this.data.cpus = os.cpus();
      this.data.freemem = os.freemem();
    },
    methods: {
      
    }
  }
</script>

<style>
</style>