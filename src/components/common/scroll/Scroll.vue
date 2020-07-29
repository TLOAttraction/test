<!-- 封装第三方滚动组件 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 导入已经安装好的better-scroll插件
  import bscroll from 'better-scroll'

  export default {
    name:"",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scroll: null,
      }
    },
    // this.$refs.wrapper这种代码不要写到生命周期函数created里面，因为created只是在组件创建完后回调的，此时template模板还没有挂载上去，所以created里面的this.$refs.wrapper拿不到template里面的元素。而生命周期函数mounted里面完成了template挂载，所以this.$refs.wrapper要写到生命周期函数mounted里面
    mounted() {
      // 1.创建bscroll对象，this.$refs.wrapper是把需要滚动功能的父元素传入，并让它管理。
      // 注意：传入的父元素内只能有一个直接子元素，但直接子元素内可以有多个子元素
      // $refs.wrapper，通过类名拿到对应的元素，但是相同的类名可能有多个，所以在前面加上$refs，$refs拿到的是当前组件内含有ref="wrapper"的元素，准确获取元素。
      // 后面{}里面可以添加其它参数，分别有不同的含义
      this.scroll = new bscroll(this.$refs.wrapper,{
        // <scroll>里面的元素除了button以外是不能监听点击事件的，有click: true,就可以监听了。</scroll>
        click: true,

        // 默认情况下bscroll是不可以实时的监听滚动位置
        // probe 侦测
        // 0,1都是不侦测实时的位置
        // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
        // 3: 只要是滚动, 都侦测.
        // 有些页面需要监听滚动，有些页面不需要，所以probeType直接给一个固定值不好,probeType的值应该动态获取,从使用它的父组件那里传入。传入0,1是不监听，传入2,3是监听。
        // probeType: 3,
        probeType: this.probeType,

        // 同样pullUpLoad给一个固定值不好，需要从父组件传入值来决定是否开启监听上拉事件
        pullUpLoad: this.pullUpLoad,

      })
      // 监听滚动的位置，只有在上面开启了才会监听
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) =>{
          // console.log(position);
          // 当监听滚动事件开启时，就通过自定义事件给父组件实时发送滚动位置position
          this.$emit('scroll',position)
        })
      }
      
      if(this.pullUpLoad){
        // 监听上拉事件，只有在上面开启了才会监听
        this.scroll.on('pullingUp',() =>{
          // console.log("上拉加载更多");
          // 当监听上拉事件开启时，监听到上拉事件就给父组件发射自定义事件。
          this.$emit('pullingUp')
          // 默认只监听一次上拉事件，this.scroll.finishPullUp就可以监听多次
          // this.scroll.finishPullUp()
        })
      }
    },
    methods: {
      // 让滚动跳到指定位置
      scrollTo(x, y, time=300) {
        // 前面的this.scroll，是先判断scroll是否有值，因为scroll是在生命周期函数mounted里面初始化的，有时候scroll的值为null时就通过它去调用方法，此时很有可能报错。
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 滚动刷新，并会从新计算可滚动区域的高度，但有时refresh会非常频繁, 此时需要进行防抖操作
      refresh() {
        // console.log('------');
        this.scroll && this.scroll.refresh()
      },


      // 默认只监听一次上拉事件，this.scroll.finishPullUp就可以监听多次
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style  scoped>

</style>
