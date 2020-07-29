<!--  -->
<template>
  <swiper class="detailswp">
    <swiperitem v-for="item in topimg">
      <img :src="item" alt="">
    </swiperitem>
  </swiper>
</template>

<script>

  import swiper from 'components/common/swiper/Swiper'
  import swiperitem from 'components/common/swiper/SwiperItem'

  export default {
    name:"",
    components: {
      swiper,
      swiperitem
    },
    props: {
      topimg: {
        type: Array,
        default() {
          return []
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
  .detailswp{
    height: 300px;
    overflow: hidden;
  }
  
</style>
