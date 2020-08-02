import {debounce} from 'common/utils'
import backtop from 'components/content/backTop/BackTop'

// 多个地方都用到防抖，所以混入到公共的地方
export const itemListenerMixin = {
  data() {
    return {
      itemimglistener: null
      }
  },

  mounted() {
    // 防抖优化
    const refresh = debounce(this.$refs.scroll.refresh,50)

    this.itemimglistener = () =>{
      refresh()
    }
    // 通过事件总线监听事件
    this.$bus.$on('itemImgLoad',this.itemimglistener)
    // console.log('我是混入中的内容');
  }
}

// 多个地方都用到回到顶部，所以混入到公共的地方
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    backtop,
  },
  methods: {
    // 当子组件backtop发生点击时，就执行backClick()方法，通过this.$refs.scroll拿到含有ref="scroll"的scroll子组件，并调用scroll子组件里面已经写好的scrollTo方法回到当前页面的顶部。
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenbacktop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}