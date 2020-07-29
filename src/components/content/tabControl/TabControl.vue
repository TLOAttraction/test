<!--  -->
<template>
<div class="tabc">
  <!-- 建议：组件里面展示的内容，如果只是文字不一样的时候，就不要使用插槽slot -->
  <div v-for="(item,index) in titles" class="tabitem" @click="tabclick(index)" :class="{active:index === currentindex}">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name:"",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        currentindex: 0
      }
    },
    methods: {
      tabclick(index){
        this.currentindex = index;
        
        // 发生点击时，向父组件发射自定义事件
        this.$emit("tabClick",index);
      }
    }
  }
</script>

<style  scoped>
  .tabc{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tabitem{
    flex: 1;
  }
  .tabitem span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
