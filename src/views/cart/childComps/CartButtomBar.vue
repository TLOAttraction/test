<!--  -->
<template>
  <div class="bottom-bar">
    <div class="bbleft">     
      <checkbutton class="bbleftc" :isChecked="isselectall" @click.native="checkclick"></checkbutton>
      <span>全选</span>
    </div>
    <div class="bbcenter">
      合计：{{totalPrice}}
    </div>
    <div class="bbright" @click="calcclick">
      去结算({{checklength}})
    </div>
  </div>
</template>

<script>

  import checkbutton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name:"",
    components: {
      checkbutton
    },
    computed: {
      // 将 store 中的 getter 映射到局部计算属性,
      // 这里是通过它获取到state里面的cartList购物车列表
      ...mapGetters(['cartList', 'cartLength']),

      // 对购物车里的商品进行过滤，过滤后的商品在一个新的数组里面，被选中的商品才计算总价格，reduce对新数组中所有内容进行汇总。toFixed(2)总价格保留两位小数。
      totalPrice() {
       return '￥' + this.cartList.filter(item => {
         return item.checked
       }).reduce((prevalue, item) => {
         return prevalue + item.price * item.count
       },0).toFixed(2)
      },
      // 获取要结算的商品数量，item.checked为true
      checklength() {
        return this.cartList.filter(item => item.checked).length
      },
      // 判断购物车商品是否被全选,没有全选就返回false，全选就返回true
      isselectall() {
        // 没有商品返回false
        if(this.cartList.length === 0) return false
        else return !this.cartList.find(item => item.checked === false)
      },
    },
    data () {
      return {
        
      }
    },
    methods: {
      checkclick() {
        // 如果全部选中,就取反全部不选中
        if(this.isselectall){
          this.cartList.forEach(item => item.checked = false)
        }
        // 如果部分选中或者全部不选中，就全部选中
        else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcclick() {
        let noselect = true
        // 每次点击时都会查找cartList里面是否有被选中的商品，如果没有就打印输出
        if(this.cartList.find(item => item.checked === true)){
          noselect = false;
        } 
        if(noselect) {
          this.$toast.show('请选择购买的商品', 1000)
        }
      }
    }
  }
</script>

<style  scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eaeaea;
    text-align: center;
  }
  .bbleft{
    display: flex;
    width: 70px;
    align-items: center;
    padding-left: 5px;
  }
  .bbleftc{
    width: 20px;
    height: 20px;
    /* margin-right: 5px; */
  }
  .bbleft span{
    flex: 1;
  }
  .bbcenter{
    flex: 1;
    line-height: 40px;
  }
  .bbright{
    width: 90px;
    background-color: #f00;
    color: #fff;  
    line-height: 40px;
  }
</style>
