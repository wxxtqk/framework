import { login, userInfo, fetchKey } from '@/api/login' // 登录
import { getToken, setToken, removeToken, setCookies, getCookies } from '@/utils/auth' // cookie的设置
import * as types from '../mutation-type'
const SUCCES_STATE = '200'
const user = {
  state: {
    token: getToken(),
    name: getCookies('name'),
    avatar: getCookies('avatar'),
    roles: [],
    aesKey: getCookies('aesKey')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    [types.SET_AESKEY](state, aesKey) {
      state.aesKey = aesKey
    }
  },
  actions: {
    // 用户登录
    Login ({commit}, userInfo) {
      const username = userInfo.name
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password).then((response) => {
          response = response.data
          if (response.state === SUCCES_STATE) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', username)
            setCookies('name', username)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 拉取用户的权限
    UserInfo ({commit, state}) {
      console.log(state.token)
      return new Promise((resolve, reject) => {
        userInfo(state.token).then((response) => {
          response = response.data
          if (response.state === SUCCES_STATE) {
            const data = response.data
            commit('SET_AVATAR', data.avatar)
            setCookies('avatar', data.avatar)
            commit('SET_ROLES', data.roles)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 前端退出登录
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
    // 设置加密需要的key
    SetAesKey({commit}) {
      return new Promise((resolve, reject) => {
        fetchKey().then((res) => {
          res = res.data
          if (res.state === SUCCES_STATE) {
            const _key = res.data
            commit('SET_AESKEY', _key)
            setCookies('aesKey', _key)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default user
