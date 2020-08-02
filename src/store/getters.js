export default {
  cartLength(state) {
    // 返回商品列表的长度
    return state.cartList.length
  },
  cartList(state) {
    // 返回商品列表
    return state.cartList
  }
}