import fetch from '@/utils/fetch'
import qs from 'qs'
import { $http } from '@/utils/config'
import aesStr from '@/utils/aes'
import store from '@/store'
// 获取用户列表
export function accountList (page, rows) {
  let data = {
    page,
    rows
  }
  data = qs.stringify(data)
  return fetch({
    // url: 'http://192.168.199.99:8083/user/list',
    url: `${$http}/ods_manager_web/user/list`,
    method: 'post',
    data
  })
}
// 上传头像
export function uploadFile (data) {
  return fetch({
    url: `${$http}/ods_manager_web/image/head`,
    method: 'post',
    data: data
  })
}
// 获取增加用户需要的select选项
export function fetchSystem () {
  return fetch({
    url: `${$http}/ods_manager_web/systemParameter/listUserInit`,
    method: 'post'
  })
}
// 新增用户
export function addAccount (data) {
  // const {userAccount, userPassword} = data
  // let newUse = aesStr(store.getters.aesKey, userAccount)
  // let newPwd = aesStr(store.getters.aesKey, userPassword)
  // data.userAccount = newUse
  // data.userPassword = newPwd
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/user/add`,
    method: 'post',
    data
  })
}
// 查询用户好友列表
export function fetchFriends (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/friend/select/all`,
    method: 'post',
    data
  })
}
// 新增好友
export function appendFriend (info) {
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods_manager_web/friend/add`,
    method: 'post',
    data: info
  })
}
// 移除好友
export function deleteFriend (info) {
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods_manager_web/friend/delelt`,
    method: 'post',
    data: info
  })
}
// 获取用户信息以便修改
export function fetchUserinfo (info) {
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods_manager_web/user/getUser`,
    method: 'post',
    data: info
  })
}
// 修改用户信息
export function modifyInfo (info) {
  delete info.createBy
  delete info.createTime
  delete info.updateBy
  delete info.updateTime
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods_manager_web/user/modify`,
    // url: `http://192.168.199.89:8083/ods_manager_web/user/modify`,
    method: 'post',
    data: info
  })
}
// 修改用户密码
export function modifyPass (info) {
  let {pwd, userAccount} = info
  let newPwd = aesStr(store.getters.aesKey, pwd)
  let newAccount = aesStr(store.getters.aesKey, userAccount)
  info.pwd = newPwd
  info.userAccount = newAccount
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods_manager_web/user/update/pwd`,
    // url: `http://192.168.199.89:8083/ods_manager_web/user/update/pwd`,
    method: 'post',
    data: info
  })
}
// 删除用户
export function deleteAccount (userInfoId) {
  let data = {
    userInfoId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/user/delete`,
    // url: 'http://192.168.199.110:8083/user/delete',
    method: 'post',
    data
  })
}
// 搜索用户
export function searchAccount (page, rows, name) {
  let data = {
    page,
    rows,
    name
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/user/list`,
    // url: 'http://192.168.199.110:8083/user/delete',
    method: 'post',
    data
  })
}
