<!--  -->
<template>
  <div id="detail">
    <detailnavbar class="detailnav"></detailnavbar>
    <scroll class="content" ref="scroll">
      <detailswiper :topimg="topImg"></detailswiper>
      <detailbaseinfo :goods="goods"></detailbaseinfo>
      <detailshopinfo :shop="shop"></detailshopinfo>
      <detailgoodsinfo :detailInfo="detailInfo" @imgLoad="imgload"></detailgoodsinfo>
      <detailparamsinfo :paramInfo="paramsInfo"></detailparamsinfo>
    </scroll>
  </div>
</template>

<script>

  import detailnavbar from './childComps/DetailNavbar'
  import detailswiper from './childComps/DetailSwiper'
  import detailbaseinfo from './childComps/DetailBaseInfo'
  import detailshopinfo from './childComps/DetailShopInfo'
  import detailgoodsinfo from './childComps/DetailGoodsInfo'
  import detailparamsinfo from './childComps/DetailParamsInfo'

  import {getDetail,goodsDetail,shop,goodsParam} from 'network/detail'

  import scroll from 'components/common/scroll/Scroll'

  export default {
    name:"detail",
    components: {
      detailnavbar,
      detailswiper,
      detailbaseinfo,
      detailshopinfo,
      scroll,
      detailgoodsinfo,
      detailparamsinfo,

    },
    data () {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},

      }
    },
    activated() {
      // this.iid = this.$route.params.iid
    },

    created() {
      // 1.通过this.$route可以获取处于活跃状态的路由里的参数iid,并对其进行保存
      this.iid = this.$route.params.iid

      // 2.根据iid调用已经封装好的网络请求方法，请求详情数据，但是请求到的数据过于复杂，所以要对这些复杂的数据进行抽离整合,整合成一个对象，然后子组件获取数据时面向这个数据对象。把详情页数据一次都请求下来，然后根据子组件，把数据分成几大部分保存，如果子组件需要的数据过于复杂，就对其进行整合，整合成一个数据对象。
      getDetail(this.iid).then(res =>{
        const data = res.data.result;
        // a.获取顶部的图片轮播数据
        console.log(res);
        this.topImg = data.itemInfo.topImages;

        // b.获取商品售卖信息
        this.goods = new goodsDetail(data.itemInfo,data.columns,data.shopInfo.services)

        // c.创建店铺信息的对象
        this.shop = new shop(data.shopInfo)

        // d.保存商品的详情数据,复杂信息需要整合，单一信息不要
        this.detailInfo = data.detailInfo;

        // e.获取商品参数的信息
        this.paramsInfo = new goodsParam(data.itemParams.info,data.itemParams.rule)

      })
    },

    methods: {
      imgload() {
        this.$refs.scroll.refresh();
      }
    }

    // 通过keep-alive可以使得在路由离开时，组件不被销毁，再次路由回来时，就不会再创建组件，created()也只会调用一次。可是详情页希望每次路由回来时都创建，路由离开时都销毁 ，只需要在keep-alive后面加上exclude="detail"(不包括)，这里的detail是组件的name属性值为detail的组件。
    // destroyed() {
    //   console.log('detail destroyed');
    // },
  }
</script>

<style  scoped>
  #detail{
    position: relative;
    z-index: 3;
    background-color: #fff;
    height: 100vh;

  }
  .detailnav{
    position: relative;
    z-index: 4;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
