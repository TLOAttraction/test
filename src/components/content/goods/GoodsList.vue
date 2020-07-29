<!--  -->
<template>
  <div class="goods">
    <goodsitem v-for="item in goods" :gitem="item"></goodsitem>
  </div>
</template>

<script>
  import goodsitem from './GoodsListItem'

  export default {
    name:"",
    components:{
      goodsitem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    },
  }
</script>

<style  scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    justify-content: space-evenly;
  }
</style>
