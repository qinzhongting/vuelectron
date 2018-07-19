<template>
  <div>
    <h1>{{name}}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name:'页面2'
      }
    },
    methods: {
      open (link) {
        if(link){
          alert(this.name)
        }
      }
    }
  }
</script>

<style>
  
</style>