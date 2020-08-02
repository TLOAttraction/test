<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </navbar>
    <cartlist></cartlist>
    <cartbuttombar></cartbuttombar>
  </div>
</template>

<script>

  import navbar from 'components/common/navbar/Navbar'
  import cartlist from './childComps/CartList'
  import cartbuttombar from './childComps/CartButtomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      navbar,
      cartlist,
      cartbuttombar,
      
    },
    computed: {
      //mapGetters辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。通过它也可以获取到state里面的状态。
      // 两种语法：数组，对象（可以自己命名）。
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
