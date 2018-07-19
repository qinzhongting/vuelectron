<template>
  <div id="mainBox">
    <titler></titler>
    <div id="mainr">
      <sidebar></sidebar>
      <div id="mainrBox">
        <transition name="fade-transform" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import titler from "@/components/title.vue";
  import sidebar from "@/components/sidebar.vue";
  export default {
    name: 'landing-page',
    data () {
      return {
        name:'as~~~~2123'
      }
    },
    components: {
      titler,
      sidebar
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
  #mainrBox{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #8a7070;
    position: fixed;
    padding-top: 40px;
    padding-left: 100px;
  }
</style>