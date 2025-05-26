import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { withInstall } from '@pixel-ui/utils'
import { PxPixelIt, type PixelItInstance } from '.'
import Pixelit from './pixelit'

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

describe('PixelIt.vue', async () => {
  it('should render correctly', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          drawImage: vi.fn(),
          clearRect: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray()
          })),
          putImageData: vi.fn(),
          imageSmoothingEnabled: false
        }
      }
      return null
    }) as any

    // 实例挂载
    const wrapper = mount(PixelIt, {
      props: {
        src: '/images/image1_portrait.jpg',
        scale: 4,
        aspectRatio: 0.5
      }
    })
    await nextTick()
    const exposed = wrapper.vm as unknown as PixelItInstance

    await exposed.render()
  })

  it('should render correctly palette gray', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          drawImage: vi.fn(),
          clearRect: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray()
          })),
          putImageData: vi.fn(),
          imageSmoothingEnabled: false
        }
      }
      return null
    }) as any

    // 实例挂载
    const wrapper = mount(PixelIt, {
      props: {
        src: '/images/image1_portrait.jpg',
        scale: 4,
        aspectRatio: 0.5,
        palette: [
          [0, 0, 0],
          [255, 255, 255]
        ],
        grayscale: true
      }
    })
    await nextTick()
    const exposed = wrapper.vm as unknown as PixelItInstance

    await exposed.render()
  })

  it('should skip render when refs are missing', async () => {
    const wrapper = mount(PixelIt, {
      props: {
        src: '',
        scale: 4,
        aspectRatio: 1
      }
    })

    await nextTick()

    const exposed = wrapper.vm as unknown as PixelItInstance

    // 强制设置 canvasRef 或 originRef 为 null 模拟异常情况
    exposed.originRef.value = undefined
    exposed.canvasRef.value = undefined

    await wrapper.unmount()
    await nextTick()

    await exposed.render()
    exposed.getSize()
  })

  it('should new pixelit instance', async () => {
    // 保存原始的 getContext 方法以便恢复
    const originalGetContext = HTMLCanvasElement.prototype.getContext

    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          drawImage: vi.fn(),
          clearRect: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray([100, 150, 200, 255, 50, 75, 100, 255])
          })),
          putImageData: vi.fn(),
          imageSmoothingEnabled: false
        }
      }
      return null
    }) as any

    try {
      // 创建主 Canvas 并初始化 Pixelit
      const toCanvas = document.createElement('canvas')
      const img = document.createElement('img')
      img.src = 'test.gif'
      const pixelit = new Pixelit({
        from: img,
        to: toCanvas,
        scale: 4,
        aspectRatio: 0.5,
        palette: [
          [0, 0, 0],
          [255, 255, 255]
        ]
      })

      pixelit.draw()
      pixelit.pixelate()
      pixelit.convertGrayscale()
      pixelit.convertPalette()
    } finally {
      // 恢复原始 getContext 方法
      HTMLCanvasElement.prototype.getContext = originalGetContext
    }
  })

  it('should new pixelit instance with default config', async () => {
    // 保存原始的 getContext 方法以便恢复
    const originalGetContext = HTMLCanvasElement.prototype.getContext

    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          drawImage: vi.fn(),
          clearRect: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray([100, 150, 200, 255, 50, 75, 100, 255])
          })),
          putImageData: vi.fn(),
          imageSmoothingEnabled: false
        }
      }
      return null
    }) as any

    try {
      // 创建主 Canvas 并初始化 Pixelit
      const toCanvas = document.createElement('canvas')
      const img = document.createElement('img')
      img.src = 'test.gif'
      const pixelit = new Pixelit({
        from: img,
        to: toCanvas,
        aspectRatio: 0.5
      })

      pixelit.draw()
      pixelit.pixelate()
      pixelit.convertGrayscale()
      pixelit.convertPalette()
    } finally {
      // 恢复原始 getContext 方法
      HTMLCanvasElement.prototype.getContext = originalGetContext
    }
  })
})
