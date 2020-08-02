import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // console.log('toast',Vue);
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.通过$mount,将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是上面挂载的div元素，通过toast.$el将div元素添加到body里面,此时才可以在页面中显示
  document.body.appendChild(toast.$el)

  // 5.最后将toast组件对象添加到vue原型上面
  Vue.prototype.$toast = toast;
}

export default obj