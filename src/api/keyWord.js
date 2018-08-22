import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 获取关键字列表
export function fetchKeyWord (page, rows) {
  let data = {
    page,
    rows
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/keyWord/select/list`,
    // url: `http://192.168.199.99:8083/keyWord/select/list`,
    method: 'post',
    data
  })
}
// 增加关键字
export function addWord (content) {
  let data = {
    content
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/keyWord/add`,
    method: 'post',
    data
  })
}
// 修改关键字
export function editWord (content, id) {
  let data = {
    content,
    id
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/keyWord/updata`,
    method: 'post',
    data
  })
}
// 修改关键字
export function deleteWord (id) {
  let data = {
    id
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/keyWord/delete`,
    method: 'post',
    data
  })
}
// 模糊查询
export function FuzzyQuery (page, rows, content) {
  let data = {
    page,
    rows,
    content
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/keyWord/select/list`,
    method: 'post',
    data
  })
}
