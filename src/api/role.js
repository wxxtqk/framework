import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 设置角色
export function fetchRoles () {
  return fetch({
    url: `${$http}/ods-backstage-web/dept/list`,
    method: 'post'
  })
}
export function addRole (deptName) {
  let data = {
    deptName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/dept/add/dept`,
    method: 'post',
    data
  })
}
export function deleteRole (deptId) {
  let data = {
    deptId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/dept/delet/dept`,
    method: 'post',
    data
  })
}
export function searchRole (page, rows, deptName) {
  let data = {page, rows, deptName}
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/dept/list`,
    method: 'post',
    data
  })
}
