/*
 * @Author: yaohongbin
 * @Date: 2021-11-29 17:07:17
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-28 16:08:06
 * @FilePath: \node-user-frontend\src\filters\index.js
 */

import _ from 'lodash'
/**
 * @description: 数字加分隔符
 * @param {Number | String} val
 * @param {Number} count
 * @param {String} sign
 * @return {String}
 */
export function numberSegmentation(val, count = 3, sign = ',') {
  if (!val) return ''
  const valString = String(val)
  const reg =
    valString.indexOf('.') > -1
      ? new RegExp(`\\B(?=(\\d{${count}})+\\.)`, 'g')
      : new RegExp(`\\B(?=(\\d{${count}})+$)`, 'g')
  return valString.replace(reg, sign)
}

/**
 * @description: 获取文本第一个字符
 * @param {Number | String} val
 * @return {String}
 */
export function firstTextChar(val) {
  return String(val) && String(val).charAt(0).toLocaleUpperCase() || ''
}

export function byte2Any(val, { unit = '', initUnit = 'B', autoUnit = false, maxLength = 4, hasUnit = false }) {
  const units = ['B', 'KB', 'MB', 'GB', 'Tb', 'PB']
  if (!_.isNumber(Number(val))) {
    new Error('illegal data format, should use Number')
    return
  }
  if (autoUnit) {
    let idx = units.findIndex(item => item === initUnit) || 0
    let value = val
    while (value > 10 * maxLength) {
      value = value / 1000
      idx += 1
    }
    if (hasUnit) return Math.round(val / Math.pow(1000, idx)) + units[idx]
    return Math.round(val / Math.pow(1000, idx))
  }
  const idx = units.findIndex(item => item === unit) || 0
  if (hasUnit) return Math.round(val / Math.pow(1000, idx)) + units[idx]
  return Math.round(val / Math.pow(1000, idx))
}

export function hiddenMiddleText(str, length = 0, startCount = 4, endCount) {
  if (!str) return ''
  const val = String(str)
  if (length === 0 || val.length > length) {
    return `${val.slice(0, startCount)}****${val.slice(-(endCount || startCount))}`
  }
  return val
}

export function interceptionText(value, count = 3) {
  if (!value) return ''
  return String(value).slice(0, count)
}
