export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) => {

      // 购物车添加商品时，先查找购物车中是否已经存在该商品,find方法会遍历cartList数组并把与payload的iid相等的item赋值给oldproduct
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 如果已经存在,就提交mutations里的addCount方法来添加数量
      if(oldproduct) {
        context.commit('addCount',oldproduct)
        resolve('当前的商品数量+1')
      }
      // 如果不存在,就提交mutations里的addToCart方法来添加该商品,同时给该商品添加一个count属性，用于记录数量，payload指向模型对象，所以可以添加属性。
      else {
        payload.count = 1
        context.commit('addToCart',payload)
        resolve('商品添加成功')
      }
    })  
  }
}