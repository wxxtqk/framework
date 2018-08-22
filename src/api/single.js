import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
// 设置用单点登录
export function setSingle (userId, state) {
  let data = {
    userId,
    state
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods-backstage-web/user/updata/sso`,
    method: 'post',
    data
  })
}
