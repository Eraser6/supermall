export default {
  addCart(context, payload) {
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })

      if (oldProduct) {
        context.commit('addCounter',oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        payload.check=true
        context.commit('addToCart',payload)
        resolve('添加了新的商品')

      }
    })
  }
}