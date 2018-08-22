// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import store from './store'
import * as filters from './filters'
import * as msgs from './utils/message'
import './permission'
import './icon/iconfont.css'

// import 'element-ui/lib/theme-default/index.css'
import './element-variables.scss'
import './style/index.styl' // 为了坚决兼容ie的问题
Vue.use(Element)
Vue.config.productionTip = false

// 设置全局的过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 设置全局的函数
Object.keys(msgs).forEach(key => {
  Vue.prototype[key] = msgs[key]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
