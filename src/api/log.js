
import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 验证用户,并获取token
export function fetchLog (page, rows, name) {
  let data = {page, rows, name}
  data = qs.stringify(data)
  return fetch({
    // url: `https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/fetchLog`,
    url: `${$http}/ods-backstage-web/log/select`,
    method: 'post',
    data
  })
}
