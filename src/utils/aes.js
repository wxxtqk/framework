/* global CryptoJS:true */
export default function aesStr(key, str) {
  console.log(key)
  console.log('转前', str)
  let _key = CryptoJS.enc.Utf8.parse(key)
  let newstr = CryptoJS.AES.encrypt(str, _key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  console.log('转前', newstr.toString())
  return newstr.toString()
}
