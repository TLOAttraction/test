<!--  -->
<template>
  <div class="recommend">
    <!-- 根据信息内容，创建相应的标签进行展示，之后再添加样式 -->
      <div v-for="item in recommends" class="rcitem">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    name:"",
    props:{
      recommends: {
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
  .recommend{
    display: flex;
    width: 100%;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .rcitem{
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .recommend img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
