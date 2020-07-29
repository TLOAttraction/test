<!--  -->
<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="titleitem" @click="itemclick(index)" :class="{active: index === currentIndex}">{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>

  import navbar from 'components/common/navbar/Navbar'

  export default {
    name:"",
    components: {
      navbar,

    },
    data () {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0,

      }
    },
    methods: {
      itemclick(index) {
        this.currentIndex = index;
      },
      backclick() {
        this.$router.back()
      },
    }
  }
</script>

<style  scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .titleitem{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
