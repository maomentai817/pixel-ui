import { describe, it, expect } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxPixelIt } from '.'

import PixelIt from './PixelIt.vue'

describe('PixelIt/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxPixelIt.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxPixelIt).toBe(PixelIt)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance PixelIt component', () => {
    const enhancedPixelIt = withInstall(PixelIt)
    expect(enhancedPixelIt).toBe(PxPixelIt)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedPixelIt = withInstall(PixelIt)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedPixelIt).toHaveProperty('install')
  })
})
