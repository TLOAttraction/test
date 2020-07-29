<template>
  <div id="app">
    <keep-alive exclude="detail">
      <!-- router-view和router-link是vue-router里面的内置子组件 ，router-view用于占位，router-view挂载的子组件将显示在router-view所在的位置上-->
      <router-view></router-view>
    </keep-alive>
    
    <maintabbar></maintabbar>
  </div>
</template>

<script>
import maintabbar from './/components/content/mainTabbar/MainTabbar'

export default {
  name: 'App',
  components: {
    maintabbar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
