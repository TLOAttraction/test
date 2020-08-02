<!--  -->
<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name:"",
    data () {
      return {

      }
    },
  }
</script>

<style  scoped>
  .backtop{
    position: fixed;
    z-index: 9;
    right: 10px;
    bottom: 55px;
  }
  .backtop img{
    width: 43px;
    height: 43px;
  }
</style>
