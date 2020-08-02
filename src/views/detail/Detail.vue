<!--  -->
<template>
  <div id="detail">
    <detailnavbar class="detailnav" @navbarclick="navbarclick" ref="nav"></detailnavbar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll">
      <detailswiper :topimg="topImg"></detailswiper>
      <detailbaseinfo :goods="goods"></detailbaseinfo>
      <detailshopinfo :shop="shop"></detailshopinfo>
      <detailgoodsinfo :detailInfo="detailInfo" @imgLoad="imgload"></detailgoodsinfo>
      <detailparamsinfo :paramInfo="paramsInfo" ref="params"></detailparamsinfo>
      <detailcommentinfo :commentInfo="commentInfo" ref="comment"></detailcommentinfo>
      <goodslist :goods="recommendInfo" ref="recommend"></goodslist>
    </scroll>
    <backtop @click.native="backClick" v-show="isShowBackTop"></backtop>
    <detailbottombar @addToCart='addToCart'></detailbottombar>
    <!-- <toast :message="message" :isshow="isshow"></toast> -->
  </div>
</template>

<script>

  import detailnavbar from './childComps/DetailNavbar'
  import detailswiper from './childComps/DetailSwiper'
  import detailbaseinfo from './childComps/DetailBaseInfo'
  import detailshopinfo from './childComps/DetailShopInfo'
  import detailgoodsinfo from './childComps/DetailGoodsInfo'
  import detailparamsinfo from './childComps/DetailParamsInfo'
  import detailcommentinfo from './childComps/DetailCommentInfo'
  import detailbottombar from './childComps/Detailbottombar'

  import {getDetail,goodsDetail,shop,goodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import scroll from 'components/common/scroll/Scroll'
  import goodslist from 'components/content/goods/GoodsList'

  import {mapActions} from 'vuex'

  // import toast from 'components/common/toast/Toast'

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
      detailcommentinfo,
      goodslist,
      detailbottombar,
      // toast,

    },

    // 混入，将一些公共的代码混入到一起，然后可以在多个地方使用
    mixins: [itemListenerMixin, backTopMixin],

    data () {
      return {
        iid: null,
        topImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommendInfo: [],
        navtopY: [],
        currentIndex: 0,
        // message: '',
        // isshow: false,

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
        // console.log(res);
        const data = res.data.result;
        
        // a.获取顶部的图片轮播数据
        this.topImg = data.itemInfo.topImages;

        // b.获取商品售卖信息
        this.goods = new goodsDetail(data.itemInfo,data.columns,data.shopInfo.services)

        // c.创建店铺信息的对象
        this.shop = new shop(data.shopInfo)

        // d.保存商品的详情数据,复杂信息需要整合，单一信息不要
        this.detailInfo = data.detailInfo;

        // e.获取商品参数的信息
        this.paramsInfo = new goodsParam(data.itemParams.info,data.itemParams.rule)

        // f.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommendInfo = res.data.data.list
      })
    },
    destroyed() {
      console.log('detail destroyed');

      // 组件被销毁时,取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemimglistener)
    },
    // mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh,50)

    // this.itemimglistener = () =>{
    //   refresh()
      
    // }
    // // 通过事件总线监听事件
    // this.$bus.$on('itemImgLoad',this.itemimglistener)
    
    // },

    methods: {

      // 将 store 中的 actions 映射到局部methods里面。通过它也可以获取到actions里面的方法。
      ...mapActions(['addCart']),

      imgload() {
        this.$refs.scroll.refresh();

        this.navtopY.push(0);
        this.navtopY.push(this.$refs.params.$el.offsetTop)
        this.navtopY.push(this.$refs.comment.$el.offsetTop)
        this.navtopY.push(this.$refs.recommend.$el.offsetTop)
        this.navtopY.push(Number.MAX_VALUE)

        // console.log(this.navtopY);
        
      },
      // 实现标题和内容的联动效果
      // 点击标题，滚动到对应的主题

      // 拿到详情页导航栏被点击时的index，谁被点击就通过scroll里面的scrollTo跳转到谁对应的位置，但是scrollTo方法需要传入Y值，这里的Y值便是每一个子组件对应的offsetTop属性值，所以先要获取正确的offsetTop属性值。获取到正确的值后将它们按顺序保存在预先定义好的数组里面，然后就可以通过传入的index拿到需要滚动到指定位置的Y值
      // 但是正确的offsetTop属性值获取比较困难，不能在created里面，也不能在mounted里面，也不能在$nextTick里面，需要监听图片加载完成，并且刷新后才能真正获取到正确的offsetTop属性值
      navbarclick(index) {
        this.$refs.scroll.scrollTo(0,-this.navtopY[index]+44,200)
      },

      // 内容滚动，显示正确的标题
      // 在scroll里面开启监听滚动功能，当监听滚动事件开启时，就通过自定义事件给父组件实时发送滚动位置，实时获取到滚动位置后，判断位置值处于哪个值区间，这里的值区间是由上面的navtopY数组决定的，不同值区间对应不同的数组下标值，当position值刚好滚动到另一个区间时，就把下标值（此时的i值）记录下来，之后再将下标值返回给DetailNavbar组件里的currentIndex属性，从而修改导航栏。
      contentscroll(position) {
        // 1.判断BackTop是否显示
        this.listenbacktop(position)

        const positionY = -position.y + 44
        // console.log(positionY);

        let length =this.navtopY.length
        for(let i=0; i<length-1; i++){
          // 当position值刚好滚动到另一个区间时，三个条件才会成立
          // this.currentIndex !== i是防止this.currentIndex = i;频繁执行
          
          if(this.currentIndex !== i && (positionY >= this.navtopY[i] && positionY < this.navtopY[i+1])){
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },

      // 实现加入购物车功能
      // 首先监听Detailbottombar组件里'加入购物车'的点击,然后给父组件Detail发射自定义事件，父组件监听到后执行addToCart方法来获取购物车需要展示的信息，并通过this.$store.dispatch方式提交到store里的actions进行一些逻辑判断，再提交到mutations里执行相应的方法，最后商品是添加到state里面的cartList数组里面。之后可以在购物车页面（也可以在全局其它地方）通过this.$store.state.cartList拿到里面的商品进行展示。之所以提交到store里面是因为，购物车里的商品是由状态管理Vuex的对象store来管理的，详情页和购物车页面没有直接的关联，如果在详情页直接将商品添加到购物车页面，此时购物车组件有可能没有创建出来，所以在中间需要将该商品加到一个临时的并且属于全局的地方，此时使用Vuex最合适。
      addToCart() {
        // 获取购物车需要展示的信息,将这些信息封装到一个模型对象product里面
        const product = {}
        product.image = this.topImg[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 将商品添加到购物车里

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })

        this.addCart(product).then(res => {
          // console.log(res);
          // this.isshow = true;
          // this.message = res;

          // setTimeout(() => {
          //   this.isshow = false;
          //   this.message = '';
          // }, 1000);

          this.$toast.show(res, 1000)
        })
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
    background-color: #fff
  }
  .content{
    height: calc(100% - 44px - 52px);
    overflow: hidden;
  }
</style>
