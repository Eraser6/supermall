import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 根据组件构造器，创建一个组件对象
  const toast = new toastContrustor()

  // 将组件对象挂载到某一元素上
  toast.$mount(document.createElement('div'))

  // 将子组件添加到元素中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
