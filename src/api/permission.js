import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 设置角色
export function setPermission (userInfoId, remark) {
  let data = {
    userInfoId,
    remark
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/user/updata/role`,
    method: 'post',
    data
  })
}
// 删除用户
export function deleteAccount (userInfoId) {
  let data = {
    userInfoId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/user/delete`,
    // url: 'http://192.168.199.110:8083/user/delete',
    method: 'post',
    data
  })
}
