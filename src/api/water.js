import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 获取水源列表
export function waterList (page, rows, condition) {
  let data = {
    page,
    rows,
    condition
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/select/water/list`,
    method: 'post',
    data
  })
}
// 获取水源类型
export function waterType () {
  return fetch({
    url: `${$http}/ods-backstage-web/select/fireWaterType`,
    method: 'get'
  })
}
// 新增水源
export function addWater (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/add/water`,
    // url: `http://192.168.199.96:8083/add/water`,
    // url: `${$http}/add/water`,
    method: 'post',
    data
  })
}
// 删除水源
export function deleteWater (...arr) {
  let data = {
    fireWaterId: arr[0],
    fireWaterTypeId: arr[1],
    fireWaterInfoId: arr[2]
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/delete/water`,
    // url: `http://192.168.199.89:8083/delete/water`,
    method: 'post',
    data
  })
}
// 修改水源信息中水源信息回显
export function editWater (fireWaterInfoId, fireWaterTypeId, fireWaterId) {
  let data = {
    fireWaterInfoId,
    fireWaterTypeId,
    fireWaterId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/select/water/details`,
    // url: `http://192.168.199.96:8083/select/water/details`,
    // url: `${$http}/select/water/details`,
    method: 'post',
    data
  })
}
// 修改水源信息上传接口
export function editInfo (info) {
  info = qs.stringify(info)
  return fetch({
    url: `${$http}/ods-backstage-web/edit/water`,
    // url: `http://192.168.199.96:8083/edit/water`,
    method: 'post',
    data: info
  })
}
