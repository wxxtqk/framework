import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/view/login'
import home from '@/view/home'
const _import = require('./_import_' + process.env.NODE_ENV)
// 如果是在开发模式下关闭懒加载，在生产版本中实现懒加载
Vue.use(Router)
// 设置静态路由
// hidden: if hidden is true,not show in sidebar
// noDropdown: if noDropdown is true, there is no submenu
export const stateRoute = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: _import('login')
  }, {
    path: '/',
    name: '主页',
    redirect: '/dashboard',
    component: home,
    children: [{path: 'dashboard', component: _import('dashboard/index')}]
  }
]
export default new Router({
  routes: stateRoute
})
// 设置动态路由
export const asyncRoute = [
  {
    path: '/water',
    name: '水源管理',
    component: home,
    children: [
      {
        path: 'index', component: _import('water/index')
      }
    ]
  }, {
    path: '/file',
    name: '重点单位',
    component: home,
    children: [
      {
        path: 'index', component: _import('filemanage/index')
      }
    ]
  }, {
    path: '/linkageunit',
    name: '联动单位',
    component: home,
    children: [
      {
        path: 'index', component: _import('linkageunit/index')
      }
    ]
  }, {
    path: '/account',
    name: '用户管理',
    noDropdown: true,
    component: home,
    children: [
      {
        path: 'index', component: _import('account/index'), name: '用户列表'
      }, {
        path: 'group', component: _import('account/group'), name: '分组列表'
      }
    ]
  }, {
    path: '/Jurisdiction',
    name: '权限管理',
    noDropdown: true,
    component: home,
    children: [
      {
        path: 'index', component: _import('Jurisdiction/index'), name: '权限管理'
      },
      {
        path: 'role', component: _import('Jurisdiction/role'), name: '角色管理'
      }
    ]
  },
  {
    path: '/single',
    name: '单点登录',
    component: home,
    children: [
      {
        path: 'index', component: _import('singleOne/index')
      }
    ]
  },
  {
    path: '/keyWord',
    name: '关键字管理',
    component: home,
    children: [
      {
        path: 'index', component: _import('keyWord/index')
      }
    ]
  },
  {
    path: '/history',
    name: '历史消息查询',
    component: home,
    children: [
      {
        path: 'index', component: _import('chatHistory/index')
      }
    ]
  }, {
    path: '/log',
    name: '日志管理',
    component: home,
    children: [
      {
        path: 'index', component: _import('log/index')
      }
    ]
  }
]
