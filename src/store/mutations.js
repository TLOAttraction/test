export default {
  addCount(state, payload) {
    payload.count++
  },

  addToCart(state,payload) {
    // payload也指向模型对象，所以可以给模型对象添加checked属性
    // 商品在添加到cartList里面之前，添加checked属性，默认被选中
    payload.checked = true
    state.cartList.push(payload)
  }
}