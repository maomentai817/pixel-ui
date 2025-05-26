import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { withInstall } from '@pixel-ui/utils'
import { PxImage } from '.'
import { usePixelProcessor } from './usePixelProcessor'

import Image from './Image.vue'

describe('Image/index', () => {
  // 测试 withInstall 函数是否被正确应用
  it('should be exported with withInstall()', () => {
    expect(PxImage.install).toBeDefined()
  })

  // 测试组件是否被正确导出
  it('component should be exported', () => {
    expect(PxImage).toBe(Image)
  })

  // 可选: 测试 withInstall 是否增强了组件功能
  it('should enhance Image component', () => {
    const enhancedImage = withInstall(Image)
    expect(enhancedImage).toBe(PxImage)
  })

  // 可选: 如果 withInstall 函数有特定的行为或属性, 确保它们被正确应用
  it('should apply specific enhance', () => {
    const enhancedImage = withInstall(Image)
    // eg: withInstall 增加了一个特定的方法或属性
    expect(enhancedImage).toHaveProperty('install')
  })
})

describe('Image.vue', async () => {
  it('should render correctly', async () => {
    const wrapper = mount(Image, {
      props: {
        src: '/images/image1_portrait.jpg',
        blockSize: 4,
        scale: 0.5
      }
    })
    wrapper.vm.getSize()
  })

  it('should render correctly with default value', async () => {
    global.Image = class {
      onload!: () => void
      onerror!: () => void
      src = ''
      naturalWidth = 100
      naturalHeight = 200
      constructor() {
        setTimeout(() => this.onload?.(), 10) // 模拟成功加载
      }
    } as any

    const wrapper = mount(() => <Image src="12.png" />)
    wrapper.unmount()
  })

  it('should render correctly with empty value', async () => {
    global.Image = class {
      onload!: () => void
      onerror!: () => void
      src = ''
      naturalWidth = 100
      naturalHeight = 200
      constructor() {
        setTimeout(() => this.onload?.(), 10) // 模拟成功加载
      }
    } as any

    mount(() => <Image src="" blockSize="4" colorCount={null as any} />)
  })

  it('should new processor instance', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          strokeRect: vi.fn(),
          drawImage: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray()
          })),
          putImageData: vi.fn()
        }
      }
      return null
    }) as any

    const processor = usePixelProcessor()
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const options = {
      blockSize: 1,
      colorCount: 1,
      showGrid: true,
      cwidth: 100,
      cheight: 100,
      scale: 1
    }
    processor.processImage(canvas, img, options)
  })

  it('should new processor instance with default config', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          strokeRect: vi.fn(),
          drawImage: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray([10, 10, 10, 10, 10, 10, 10, 10])
          })),
          putImageData: vi.fn()
        }
      }
      return null
    }) as any

    const processor = usePixelProcessor()
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const options = {
      blockSize: 1,
      colorCount: 0,
      showGrid: true,
      cwidth: 0,
      cheight: 0,
      scale: 1
    }
    processor.processImage(canvas, img, options)
  })

  it('should new processor instance with large config', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          strokeRect: vi.fn(),
          drawImage: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray([
              255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 128, 128, 128, 255
            ])
          })),
          putImageData: vi.fn()
        }
      }
      return null
    }) as any

    const processor = usePixelProcessor()
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const options = {
      blockSize: 1,
      colorCount: 32,
      showGrid: false,
      cwidth: 0,
      cheight: 0,
      scale: 1
    }
    processor.processImage(canvas, img, options)
  })

  it('should new processor instance with alpha config', async () => {
    // 模拟所有 Canvas 的 getContext('2d') 返回有效上下文
    HTMLCanvasElement.prototype.getContext = vi.fn(function (
      contextType: string
    ) {
      if (contextType === '2d') {
        return {
          strokeRect: vi.fn(),
          drawImage: vi.fn(),
          getImageData: vi.fn(() => ({
            data: new Uint8ClampedArray([255, 255, 255, 255])
          })),
          putImageData: vi.fn()
        }
      }
      return null
    }) as any

    const processor = usePixelProcessor()
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const options = {
      blockSize: 2,
      colorCount: 2,
      showGrid: false,
      cwidth: 2,
      cheight: 2,
      scale: 1
    }
    processor.processImage(canvas, img, options)
  })
})
