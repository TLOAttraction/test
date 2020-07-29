import Vue from 'vue'
import VueRouter from 'vue-router'

// 4.导入已经创建好的子组件，采用路由懒加载的方式，用到谁就加载谁
const home =() =>import('views/home/Home')
const category = () => import('views/category/Category')
const cart = () => import('views/cart/Cart')
const profile = () => import('views/profile/Profile')
const detail = () => import('views/detail/Detail')

// 1.安装路由插件功能
Vue.use(VueRouter)

// 5.配置路由映射关系
const routes=[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    // 动态路由，跳到详情页
    path: '/detail/:iid',
    component: detail
  }
]

// 2.创建vue-router的实例对象
const router= new VueRouter({
  // 6.引入路由映射关系
  routes,
  // 浏览器地址采用history模式
  mode:'history',
})

// 3.导出router，在main.js里面导入并挂载
export default router