import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
const service = axios.create({
  baseUrl: process.env.BASE_API,
  timeout: 15000
})
// 给axios添加header，在header中添加token
// 添加一个请求拦截器
service.interceptors.request.use(config => {
  // 后期根据token做处理
  if (store.getters.token) {
    config.headers['token'] = store.getters.token // 让每个请求携带自定义token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
// 添加一个返回拦截器
service.interceptors.response.use(res => {
  let code = res.headers.code
  if (code === '200') {
    return res
  } else {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
    return Promise.reject(new Error('后台返回格式不对'))
  }
}, error => {
  console.log('返回拦截器错误嘛')
  Message({
    message: '访问出错',
    type: 'error',
    duration: 5 * 1000
  })
  Promise.reject(error)
})
export default service
