import { describe, it, expect } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxEyeDropper } from '.'

import EyeDropper from './EyeDropper.vue'

describe('EyeDropper/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxEyeDropper.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxEyeDropper).toBe(EyeDropper)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance EyeDropper component', () => {
    const enhancedEyeDropper = withInstall(EyeDropper)
    expect(enhancedEyeDropper).toBe(PxEyeDropper)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedEyeDropper = withInstall(EyeDropper)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedEyeDropper).toHaveProperty('install')
  })
})
