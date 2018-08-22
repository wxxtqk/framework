import fetchNoToken from '@/utils/fetch-no-token'
import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
import aesStr from '@/utils/aes'
import store from '@/store'
// 验证用户,并获取token
export function login (username, password) {
  username = aesStr(store.getters.aesKey, username)
  password = aesStr(store.getters.aesKey, password)
  let data = {
    userAccount: username,
    userPassword: password
  }
  data = qs.stringify(data)
  return fetchNoToken({
    url: `${$http}/ods_manager_web/login/backstageLogin`,
    method: 'post',
    data
  })
}
// 获取用户的权限
export function userInfo (token) {
  let data = {
    token
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/login/pcGetUserInfoByToKen`,
    method: 'post',
    data
  })
}
// 获取加密的需要的key值
export function fetchKey () {
  return fetchNoToken({
    url: `${$http}/ods_manager_web/security/getKey`,
    method: 'post'
  })
}
