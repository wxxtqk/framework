// 验证用户名
export function isValidUserName (str) {
  const userWrap = ['admin', 'test01']
  return userWrap.indexOf(str.trim()) >= 0
}
