import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 设置用单点登录
export function chatHistory (userAccount) {
  let data = {
    userAccount
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/msg/select`,
    method: 'post',
    data
  })
}
