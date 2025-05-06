import { isNumber, isString } from 'lodash-es'
import { debugWarn } from './error'

const SCOPE = 'utils/style' as const

// 检测是否为字符串数字
const isStringNumber = (val: string): boolean => {
  if (!isString(val)) return false
  return !Number.isNaN(Number(val))
}

export const addUnit = (val?: string | number, defaultUnit = 'px') => {
  if (!val) return ''
  if (isNumber(val) || isStringNumber(val)) return `${val}${defaultUnit}`
  if (isString(val)) return val
  debugWarn(SCOPE, `binding value must be a string or number`)
}
