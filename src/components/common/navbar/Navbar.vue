<!--  -->
<template>
  <div class="navbar">
    <!-- Navbar是一个公共组件，后面还会用到，所以在里面预留插槽，到时根据需求做替换 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
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
/* scoped表示这里的样式只在当前组件内有效，先给Navbar设置一些公共的样式，因为Navbar是一个公共组件，后面还会用到，所以最好只设置一些公共样式，一些具体样式在用到该组件时再设置，不同页面的具体样式不一样。
*/
  .navbar{
    display: flex;
    height: 44px;
    text-align: center;
    line-height: 44px;
    /* font-size: 14px; */
    box-shadow: 0 1px 2px rgba(100,100,100,.2);
  }
  .left{
    width: 60px;
  }
  .center{
    flex: 1;
  }
  .right{
    width: 60px;
  }

</style>
