<!--  -->
<template>
  <div class="goodsitem" @click="itemclick">
    <img :src="gitem.show.img" alt="" @load="imgLoad">
    <div class="goodsinfo">
      <p>{{gitem.title}}</p>
      <span class="price">{{gitem.price}}</span>
      <span class="collect">{{gitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:"",
    props: {
      gitem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data () {
      return {

      }
    },
    methods: {
      //  解决首页中可滚动区域的问题
      // Better-Scroll在决定有多少区域可以滚动时, 是根据它里面的scrollerHeight属性决定的。scrollerHeight属性值是根据Better-Scroll的content中的子组件的高度，但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的，所以计算出来的高度是错误的(1300+)，后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新.所以滚动出现了问题。

      // 如何解决该问题
      // 首先应该在GoodsListItem.vue里面监听图片的加载，之后再调用Scroll.vue里面的refresh方法来实时更新滚动区域的高度。但是又有一个问题，子组件GoodsListItem与子组件Scroll如何通信呢？非父子组件之间又该如何通信呢？这里是通过事件总线的方式实现的。

      // 通过在img元素里面写上@load="imgLoad"，表示图片一旦加载完成便会调用imgLoad方法。相当于是加载完一张图片后就发射一次事件
      // 之后通过Vue.prototype.$bus = new Vue(),表示在vue的原型上定义事件总线$bus，通过事件总线便可将GoodsListItem.vue中的事件传入到Home.vue中。

      imgLoad() {
        // 通过事件总线发送事件
        this.$bus.$emit('itemImgLoad')
      },

      itemclick() {
        // 动态路由跳转，后面可以拼接参数params，跳转到详情页
        this.$router.push('/detail/' + this.gitem.iid)
      },

    }
  }
</script>

<style  scoped>
  .goodsitem{
    width: 48%;
    position: relative;
    padding-bottom: 40px;
  }
  .goodsitem img{
    width: 100%;
  }
  .goodsinfo{
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .goodsinfo p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodsinfo .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodsinfo .collect{
    position: relative;
  }
  .goodsinfo .collect::before{
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
