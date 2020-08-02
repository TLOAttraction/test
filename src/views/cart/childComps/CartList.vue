<!--  -->
<template>
  <div class="cart-list">
    <scroll class="Content" ref="scroll">
      <cartlistitem v-for="(item, index) in cartList" :key="index" :itemInfo="item"></cartlistitem>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/Scroll'

  import {mapGetters} from 'vuex'

  import cartlistitem from './CartListItem'

  export default {
    name:"",
    components: {
      scroll,
      cartlistitem,

    },
    computed: {
      // 将 store 中的 getter 映射到局部计算属性,
      // 这里是通过它获取到state里面的cartList购物车列表
      ...mapGetters(['cartList'])
    },
    data () {
      return {

      }
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style  scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .Content{
    height: 100%;
    overflow: hidden;
  }
</style>
