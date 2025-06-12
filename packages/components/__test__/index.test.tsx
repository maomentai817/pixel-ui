import type { Plugin } from 'vue'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  registerPaintWorklets,
  PxButton,
  PxButtonGroup,
  PxIcon,
  PxCard,
  PxText,
  PxCollapse,
  PxCollapseItem,
  PxAlert,
  PxAnimationFrame,
  PxBadge,
  PxProgress,
  PxTooltip,
  PxPopconfirm,
  PxDropdown,
  PxDropdownItem,
  PxImage,
  PxPixelIt,
  PxTag,
  PxConfigProvider,
  PxInput,
  PxOverlay
} from '..'
import { map, get } from 'lodash-es'

const components = [
  PxButton,
  PxButtonGroup,
  PxIcon,
  PxCard,
  PxText,
  PxCollapse,
  PxCollapseItem,
  PxAlert,
  PxAnimationFrame,
  PxBadge,
  PxProgress,
  PxTooltip,
  PxPopconfirm,
  PxDropdown,
  PxDropdownItem,
  PxImage,
  PxPixelIt,
  PxTag,
  PxConfigProvider,
  PxInput,
  PxOverlay
] as Plugin[]

describe('components/index.ts', () => {
  it.each(map(components, (c) => [get(c, 'name') ?? '', c]))(
    '%s should be exported',
    (_, component) => {
      expect(component).toBeDefined()
      expect(component.install).toBeDefined()
    }
  )
})

describe('registerPaintWorklets', () => {
  const originalCSS = (globalThis as any).CSS

  afterEach(() => {
    ;(globalThis as any).CSS = originalCSS
    vi.restoreAllMocks()
  })

  it('should register the Paint Worklet pixelpanel when supported', async () => {
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn()
      }
    }
    await registerPaintWorklets()
    expect((globalThis as any).CSS.paintWorklet.addModule).toHaveBeenCalledWith(
      expect.stringContaining('/worklets/dist/pixelbox.worklet.js')
    )
  })

  it('should warn if CSS Houdini Paint Worklet is not supported', async () => {
    console.warn = vi.fn()

    globalThis.CSS = {} as any

    await registerPaintWorklets()
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        '[Pixel UI] CSS Houdini Paint Worklet API is not supported in this browser.'
      )
    )
  })

  it('should log an error if loading the Paint Worklet fails', async () => {
    const error = new Error('Mock addModule error')
    console.error = vi.fn()
    ;(globalThis as any).CSS = {
      paintWorklet: {
        addModule: vi.fn(() => {
          throw error
        })
      }
    }
    await registerPaintWorklets()

    expect(console.warn).toHaveBeenCalledWith(
      '[Pixel UI] Error loading paintWorklet: ',
      error
    )
  })
})
