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

  /* 更新代码 */
  /* 
  第一步：查看当前的git仓库状态，可以使用git status
  git status
  第二步：更新全部
  git add *
  第三步：接着输入git commit -m "更新说明"
  git commit -m "更新说明"
  第四步：先git pull,拉取当前分支最新代码
  git pull
  第五步：push到远程master分支上
  git push origin master
  不出意外，打开GitHub已经同步了 
  */
</style>
