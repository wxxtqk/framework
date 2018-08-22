import Cookies from 'js-cookie'
const userToken = 'Aamin-Token'
export function getToken () {
  return Cookies.get(userToken)
}
export function setToken (token) {
  return Cookies.set(userToken, token)
}
export function removeToken () {
  return Cookies.remove(userToken)
}
export function setCookies(key, value) {
  return Cookies.set(key, value)
}
export function getCookies(key) {
  return Cookies.get(key)
}
export function removeCookies(key) {
  return Cookies.remove(key)
}
