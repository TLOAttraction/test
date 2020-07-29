<template>
<!-- home.vue里面只需要记录该页面最主要的逻辑代码，把该页面里的所有子组件集成在一起，相当于是一个大管家。也就是说把home里面要显示的内容再划分并封装成几个子组件，让子组件决定内容到底如何显示，而在home里面只需要对子组件进行导入，然后注册再使用 ，并在子组件需要传入数据的时候，给它传入数据，在需要监听子组件的自定义事件时，进行监听并执行相应的方法，这样每个页面的逻辑就非常清晰，而且易于管理-->
  <div id="home">
    <!-- 实现子组件顶部导航栏的展示 -->
    <!-- slot="center"，用该div替换name="center"的插槽，又因为Navbar组件在home页面要设置具体样式，此时在使用该组件时给它一个新的类名，到时浏览器渲染时，这个新的类名会自动加到Navbar组件的template模板下面的div元素里面 -->
    <navbar class="homenav"><div slot="center">购物街</div></navbar>

    <tabcontrol :titles="['流行','新款','精选']" class="tabc" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tabcontrol>

    <!-- 中间内容需要用到滚动功能，所以放到scroll里面管理 -->
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp = "loadMore">

      <!-- 实现子组件轮播图的展示 -->
      <!-- 首先，通过网络请求从服务器请求数据并保存下来。使用从home.js传入的getHomeMultiData网络请求方法发送网络请求, 
      home.js里面封装了首页所有的网络请求方法，不同的方法对应不同的子组件，有些方法需要传入参数，有些不要参数-->
      <!-- 这里的:banners="banners" 是父组件在使用子组件的同时，给子组件传入网络请求到的数据，子组件拿到数据后再进行展示，banners前面需要加":",如果不加":"，则表示传过去的是一个字符串-->
      <homeswiper :banners="banners" @swiperImgLoad="swiperImgLoad"></homeswiper>

      <!-- 实现子组件推荐信息的展示 -->
      <!-- recommends前面需要加":",如果不加":"，则表示传过去的是一个字符串 -->
      <recommendview :recommends="recommends"></recommendview>

      <!-- 实现子组件流行信息的展示 -->
      <featureview></featureview>

      <!-- 实现子组件控制栏信息的展示 -->
      <!-- titles前面需要加":",如果不加":"，则表示传过去的是一个字符串，加":"传入的是一个数组 -->
      <!-- 在首页需要单独设置一些样式时，这里是设置吸顶样式，就需要再给它一个类名 ，如果在子组件里添加该样式，到时候所有用到该组件的地方都会有吸顶样式，而吸顶样式只有首页需要，其他地方不需要，所以不要在子组件里添加该样式-->
      <!-- 建议：组件里面展示的内容，如果只是文字不一样的时候，就不要使用插槽slot -->
      <!-- @tabClick="tabClick"监听子组件发射的自定义事件，然后执行对应的方法 -->
      <tabcontrol :titles="['流行','新款','精选']" ref="tabControl2" @tabClick="tabClick"></tabcontrol>

      <!-- 实现子组件商品信息的展示 -->
      <goodslist :goods="showGoods"></goodslist>

    </scroll>
    <!-- 实现子组件回到顶部功能-->
    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听 -->
    <!-- v-show:决定该组件或元素是否渲染显示出来 -->
    <backtop @click.native="backClick" v-show="isShowBackTop"></backtop>
  </div>
</template>

<script>
  // 导入的东西最好也做一个区分
  // 导入子组件，并对其进行注册，之后就可以使用了
  import homeswiper from './childComponents/HomeSwiper'
  import recommendview from './childComponents/RecommendView'
  import featureview from './childComponents/FeatureView'

  // 导入公共组件，并对其进行注册，之后就可以使用了
  import navbar from 'components/common/navbar/Navbar';
  import tabcontrol from 'components/content/tabControl/TabControl'
  import goodslist from 'components/content/goods/GoodsList'
  import scroll from 'components/common/scroll/Scroll'
  import backtop from 'components/content/backTop/BackTop'

  // 导入网络请求的方法，便于进行网络请求
  import {getHomeMultiData, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'

  export default {
    name: "Home",

    // 注册子组件
    components:{
      homeswiper,
      recommendview,
      featureview,
      navbar,
      tabcontrol,
      goodslist,
      scroll,
      backtop,

    },
    data() {
      return {
        // 定义属性用于保存请求到的数据
        banners: [],
        recommends: [],
        // 设计数据结构模型，对数据进行分类保存，这三类数据在开始的时候都要请求一部分(一页)下来并保存在本地，具体展示哪一类，是根据点击来切换的。这三类数据在服务器里面是按照页码划分的，所以一开始请求只请求第一页的数据，之后再根据下拉事件请求剩余页码的数据
        goods: {
          // pop，news，sell是三个key，它们分别对应三个数据对象，可以通过key决定具体展示哪一类数据，数据对象里面的page用来记录服务器里的数据请求到第几页，而list[]里面放的是该类型请求到的所有数据，开始只有一页数据，后续根据事件又不断请求，然后通过push方法往list[]里面添加，添加完后再修改page的值。
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffSetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    computed: {
      // showGoods()方法又根据currentType的值动态决定给子组件GoodsList传入的要展示的数据
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    destroyed() {
      console.log('home destroyed');
    },
    
    // 如何让Home保持原来的状态
    // 1.让Home不要随意销毁掉，通过<keep-alive>
    // 2.让Home中的内容保持原来的位置

    // 路由跳回时，调用scroll里的方法并把离开时保存的位置传入，让滚动条回到离开时位置
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      
      // 注意: 最好回来时, 进行一次refresh()
      this.$refs.scroll.refresh()
    },

    // 路由跳出时，保存一个离开时的滚动位置saveY
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    // 生命周期函数created()，在组件创建完之后回调，一般在created里面只写方法调用的逻辑，具体的方法实现写在methods里面
    created(){
      // 1.请求多个数据
      // this.表示如果有同名方法，会优先调用本地的
      this.getHomeMultiData()

      //2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },

    mounted() {

      // template模板挂载完后，通过事件总线监听GoodsListItem.vue发出的itemImgLoad事件，监听到了一次itemImgLoad事件就表示一张图片加载完了，之后就调用scroll组件里面的refresh方法，刷新滚动。
      // 优化性能，调用防抖函数
      const refresh = debounce(this.$refs.scroll.refresh,50)
      // 通过事件总线监听事件
      this.$bus.$on('itemImgLoad',() =>{
        // this.$refs.scroll.refresh();
        // console.log('------');
        refresh()
      })
      // 这里获取的offsetTop值也是错误的，因为图片还没有加载完，图片的高度没有包括进去
      // console.log(this.$refs.tabControl2.$el.offsetTop);
    },

    methods: {
      
      /**
       * 事件监听相关的方法
       */
      // TabControl点击切换商品
      //当子组件TabControl里面发生点击时，TabControl会给home发射一个自定义事件，并把参数index传过来，home监听到就执行tabClick(index)方法,该方法是根据传入的index来决定currentType的值。而currentType的值一旦确定showGoods()传递给子组件GoodsList的数据就确定了。进而就实现了根据子组件TabControl里面点击切换商品。
      tabClick(index) {
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 由于tabcontrol组件使用了两次，为了使它们在点击后的效果保持同步，在这里拿到点击时传入的index把自己和对方的currentindex都进行修改，这样就保持同步了。

        this.$refs.tabControl1.currentindex = index;
        this.$refs.tabControl2.currentindex = index;
      },

      // 当子组件backtop发生点击时，就执行backClick()方法，通过this.$refs.scroll拿到含有ref="scroll"的scroll子组件，并调用scroll子组件里面已经写好的scrollTo方法回到当前页面的顶部。
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      // 当滚动区域发生滚动时，Scroll子组件监听到后给父组件home发送自定义事件并把position作为参数传入，父组件监听到自定义事件后调用contentScroll方法，通过(-position + y) > 1000决定属性isShowBackTop是true还是false，进而决定子组件backtop是否显示。
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.实现tabControl吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffSetTop
      },
      // 监听到上拉事件，根据当前类型currentType，调用网络请求方法getHomeGoods(type)继续请求下一页数据
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      //  如何实现tabControl的吸顶效果
      //方案一： 使用一次tabcontrol组件，通过监听滚动位置达到某个值时，动态改变预先定义好的属性的值，从而给tabcontrol组件动态添加一个类，类里面包含对应样式，滚动位置达到某个值时让其固定。但是未能实现，而且报了两个错误，这与better-scroll内部的实现原理有关，better-scroll里面是通过改变transform：translate()的值实现滚动的。

      // 方案二：在Home里面使用两次tabcontrol组件，分别设置不同的ref值用于区分。首先必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取tabcontrol的offsetTop属性值(指 obj 距离上方或上层控件的位置)，组件没有offsetTop属性但是里面的元素有offsetTop属性，通过tabcontrol.$el.offsetTop便可获取。但是, 如果直接在mounted中获取tabControl的offsetTop,由于图片加载较慢，图片还没加载完就获取到的offsetTop值是不正确。所以先要监听HomeSwiper中的图片加载，加载完成后发出事件, 再在Home.vue中获取正确的值，此时获取的是包含ref="tabControl2"的tabcontrol组件的offsetTop值。然后到之前已经写好的contentScroll方法(监听到滚动后调用的方法)，拿到实时滚动值position和offsetTop属性值进行比较，当滚动值position大于offsetTop属性值时就让包含ref="tabControl1"的tabcontrol组件进行显示，而此时包含ref="tabControl2"的tabcontrol组件已经滚动到顶部并被遮挡了，从而实现了tabControl的吸顶效果。
      swiperImgLoad(){
        // console.log('-----');
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffSetTop);
      },



      /**
       * 封装网络请求相关的方法
       */
      // 拿到数据后会返回一个promise对象，表示成功，之后调用.then方法，所以可以在then方法里面获取并保存数据
      // 请求顶部多条数据
      getHomeMultiData() {
        getHomeMultiData().then(res =>{
          // console.log(res);
          this.banners=res.data.data.banner.list;
          this.recommends=res.data.data.recommend.list;
        })
      },

      // 请求商品数据
      getHomeGoods(type){
        // 数据对象里面的page初始值为0，而服务器里面的page是从1开始，在网络请求时page是作为参数的，并且这里的一次网络请求就只能拿到一页数据，所以page要加1才能拿到第一页数据，所以在方法里面要做一个转换。
        const page=this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
        //  网络请求之后，要将请求到的数据放到预先定义好的三类数据对象的list数组里面，按照type传入的key值分类，谁发送网络请求，就push到谁里面。而"...res.data.list"相当于是把请求到的list数组里面的数据，解析并拿出来，然后push到本地的数据对象的list数组里面。
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list)

        // 使用数组遍历的方法,将请求到的数据push到本地的数据对象的list数组里面。
        // for(let n of res.data.list){
        //   this.goods[type].list.push(n)
        // }

        //  数据请求下来并保存到本地后，数据对象里面的page要加1，之后的每次网络请求完成后都要加1，因为这里的一次网络请求只能拿到一页数据，下一次网络请求是在上一次网络请求的基础上继续请求的。
        this.goods[type].page += 1

        // 默认只监听一次上拉事件,如果想要监听多次就调用子组件scroll里面的finishPullUp()方法
        this.$refs.scroll.finishPullUp()
        }) 
      }

      // 如果想打印看看拿到的数据，最好不要在这里打印，因为上面是异步操作，你很可能还没拿到数据就执行打印输出了，此时拿到的极有可能是null或者undefined
      // console.log(this.banners);
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .homenav{
    background-color: var(--color-tint);
    color:#fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3; */
  }

  /* .tabc{ */
    /* sticky属性：在达到top值之前sticky相当于static，在达到top值之后sticky相当于fixed。 */
    /* position: sticky;
    top: 44px;
    z-index: 3; */
  /* } */

  .tabc{
    position: relative;
    z-index: 3;
  }

  /* 滚动区域样式 */
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }


</style>
