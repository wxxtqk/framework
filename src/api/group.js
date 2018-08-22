import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 获取所有群
export function fetchRoom (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/group/select/list`,
    method: 'post',
    data
  })
}
// 新增群
export function addRoom (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/group/add`,
    method: 'post',
    data
  })
}
// 获取群成员
export function fetchMember (roomid) {
  roomid = qs.stringify(roomid)
  return fetch({
    url: `${$http}/ods_manager_web/group/select/list/friends`,
    method: 'post',
    data: roomid
  })
}
// 解散群
export function dissolution (roomid) {
  roomid = qs.stringify(roomid)
  return fetch({
    url: `${$http}/ods_manager_web/group/delete`,
    method: 'post',
    data: roomid
  })
}
// 新增群用户
export function pushMember (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/group/add/friends`,
    method: 'post',
    data
  })
}
// 把用户从群里面移除
export function removeUser (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/group/delete/friends`,
    method: 'post',
    data
  })
}
// 分组列表模糊查询
export function searchGroupName (page, rows, imGroupName) {
  let data = {page, rows, imGroupName}
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/group/select/list`,
    method: 'post',
    data
  })
}
