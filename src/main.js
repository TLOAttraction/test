import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/index.js'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 通过在vue原型上定义$bus，使其在每个 Vue 的实例中可用。
Vue.prototype.$bus = new Vue()

// 安装toast
Vue.use(toast)

//解决移动端300ms延迟问题
FastClick.attach(document.body)

// 使用图片懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  // 挂载router路由对象
  router,
  // 挂载vuex对象
  store,
}).$mount('#app')
