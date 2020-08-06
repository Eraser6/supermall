import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus=new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
// 使用element-ui插件
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')