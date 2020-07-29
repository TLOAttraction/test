<!--  -->
<template>
    <swiper>
      <!-- 根据信息内容，创建相应的标签进行展示，之后再添加样式 -->
      <swiperitem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiperitem>
    </swiper>
</template>

<script>
// 导入本地提前封装好的swiper轮播图组件，而且是对两个组件进行统一导入，多建一个index.js文件就是为了便于对两个组件统一导入，然后注册完后就可以使用了。但此处由于报错，所以没有使用
  import swiper from 'components/common/swiper/Swiper'
  import swiperitem from 'components/common/swiper/SwiperItem'

  export default {
    name:"",
    components:{
      swiper,
      swiperitem,
    },
    // 这里定义的属性用来接收父组件传入的数据，拿到数据后再到模板template里面展示出来。
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data () {
      return {
        // 记录状态
        isLoad: true
      }
    },
    // 为了不让HomeSwiper多次发出事件,
    // 可以使用isLoad的变量进行状态的记录.
    // 只监听轮播图里面一张图片加载完成就向父组件发射自定义事件,之后不再监听
    methods: {
      imgLoad() {
        if(this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = false
        }
      }
    }
  }
</script>

<style  scoped>

</style>
