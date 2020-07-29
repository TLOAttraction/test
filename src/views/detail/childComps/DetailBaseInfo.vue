<!--  -->
<template>
  <!-- Object.keys(goods).length 通过获取goods里面的keys的length，来判读goods里面是否有值，进而决定是否显示-->
  <div v-if="Object.keys(goods).length !==0" class="baseinfo">
    <div class="infotitle">{{goods.title}}</div>

    <div class="infoprice">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>

    <div class="infoother">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="infoservice">
      <!-- v-for也可以遍历数字，并且是从1开始的而不是0 ，这里goods.services.length-1是因为上面展示了goods.services[]中的最后一个，这里就不再展示，所以减1。-->
      <span class="infoserviceitem" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name:"",
    props: {
      goods: {
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
  }
</script>

<style  scoped>
  .baseinfo{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .infotitle{
    color: #222
  }
  .infoprice{
    margin-top: 10px;
  }
  .infoprice .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .infoprice .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .infoprice .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -5px;
  }
  .infoother{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .infoservice{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .infoserviceitem img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .infoserviceitem span {
    font-size: 12px;
    color: #333;
  }
</style>
