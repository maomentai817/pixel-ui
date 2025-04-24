import { describe, test, it, expect, vi, beforeEach } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { mount } from '@vue/test-utils'
import { PxTooltip } from '.'

import Tooltip from './Tooltip.vue'

describe('Tooltip/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxTooltip.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxTooltip).toBe(Tooltip)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Tooltip component', () => {
    const enhancedTooltip = withInstall(Tooltip)
    expect(enhancedTooltip).toBe(PxTooltip)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedTooltip = withInstall(Tooltip)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedTooltip).toHaveProperty('install')
  })
})
