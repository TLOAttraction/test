<!--  -->
<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 动态绑定样式 -->
    <div v-bind:style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name:"",
    props: {
      // path从父组件传入一个路由地址作为值
      path: String,
      activeColor: {
        type: String,
        default: 'rgba(235, 48, 89, 0.918)'
      }
    },
    data () {
      return {

      }
    },
    computed:{
      // 被点击时改变不同颜色图片
      isActive(){
        // 当前处于活跃状态的路由的地址与传入的路由地址一致时this.$route.path.indexOf(this.path)的值不为-1，return true。不一致时为-1，return false
        return this.$route.path.indexOf(this.path) !== -1
      },
      // 被点击时改变字体颜色
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        // 当某个组件被点击时，根据传入的路由地址，到路由映射表中查找对应的组件，找到后并显示该组件的内容，此时该组件对应的路由就处于活跃状态
        this.$router.push(this.path)
      }
    }
  }
</script>
  
<style  scoped>
  .tabbar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  
  .tabbar-item img {
    width: 24px;
    height: 24px;
    margin-top: 2px;
    /* 去掉图片底部空白 */
    vertical-align: middle;
    margin-bottom: 1px;
  }

</style>
