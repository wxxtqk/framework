import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'

// 获取联动单位所有列表
export function linkageList (page, rows) {
  let data = {
    page,
    rows
  }
  data = qs.stringify(data)
  return fetch({
    // url: '$http/ods-resources-web/linkage/all',
    url: `${$http}/ods-backstage-web/select/linkage/list`,
    method: 'post',
    data
  })
}

// 新增联动单位
export function addLinkageunit (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/add/linkage?`,
    method: 'post',
    data
  })
}

// 删除某一个的联动单位
export function deleteLinkageunit (linkageId) {
  let data = {
    linkageId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/delete/linkage/`,
    method: 'post',
    data
  })
}
// 修改某一个的联动单位
export function editLinkageunit (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/edit/linkage`, // 修改联动单位数据信,
    method: 'post',
    data
  })
}
export function searchLinkageUnit (page, rows, linkageUnitName) {
  let data = {
    page,
    rows,
    linkageUnitName
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/select/linkage/list`,
    data,
    method: 'post'
  })
}
