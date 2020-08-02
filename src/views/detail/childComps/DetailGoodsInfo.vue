<!--  -->
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" v-lazy="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name:"",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data () {
      return {
        counter: 0,
        imglength: 0,
      }
    },
    // 由于图片数据是从父组件传入的，通过watch方法监听detailInfo对象的变化，然后获取里面图片的数量。
    watch: {
      detailInfo() {
        this.imglength = this.detailInfo.detailImage[0].list.length
      }
    },
    methods: {
      // 解决下面图片滚动卡顿问题，原因：图片还没加载完就已经计算好了滚动区域的高度。此时的滚动高度是错误的
      // 首先监听下面所有的图片都加载完成，然后发射自定义事件让detail调用scroll里的refresh方法，刷新一下详情页面。
      imgLoad() {
        // 判断，每加载完一张图片counter都加一，直到所有的图片都加载完后才会向父组件发射一次自定义事件，父组件监听到该事件后调用scroll里的refresh方法进行刷新。
        if(++this.counter === this.imglength){
          this.$emit('imgLoad');
        }
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
