import fetch from '@/utils/fetch'
import qs from 'qs'
import {$http} from '@/utils/config'
export function fectchList (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unit/getList`,
    method: 'post',
    data
  })
}
/**
 * 获取事故单位的图传类型
 */
export function fetchType () {
  return fetch({
    url: `${$http}/ods_manager_web/systemParameter/listDefaultUnitDrawing`,
    method: 'post'
  })
}
/**
 * 获取事故单位下不同类型的文件
 * @param {string} unitId 事故单位id
 * @param {string} unitDrawingType 文件类型id
 */
export function fetchSource (unitId, unitDrawingType) {
  let data = {
    unitId,
    unitDrawingType
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unitDrawing/listByTypeBackstage`,
    method: 'post',
    data
  })
}
/**
 * 获取事故单位下不同类型的文件
 */
export function modfiyImgName (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unitDrawing/updatePhotoName`,
    method: 'post',
    data
  })
}
/**
 * 删除事故单位的图片
 */
export function deleteFile (unitDrawingLogicId) {
  let data = {
    unitDrawingLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unitDrawing/singleDelete`,
    method: 'post',
    data
  })
}
/**
 * 新增事故单位
 */
export function addUnit (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unit/insertSelective`,
    method: 'post',
    data
  })
}
/**
 * 修改事故单位
 */
export function editUnit (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unit/updateByPrimaryKeySelective`,
    method: 'post',
    data
  })
}
/**
 * 删除事故单位
 */
export function deleteUnit (logicalId) {
  let data = {
    logicalId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${$http}/ods_manager_web/unit/deleteByPrimaryKey`,
    method: 'post',
    data
  })
}
