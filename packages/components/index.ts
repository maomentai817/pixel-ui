// components/index.ts

export * from './Button'
export * from './Icon'
export * from './Card'
export * from './Text'
export * from './Collapse'
export * from './Alert'
export * from './AnimationFrame'
export * from './Badge'
export * from './Progress'
export * from './Tooltip'
export * from './Popconfirm'
export * from './Dropdown'
export * from './Image'
export * from './PixelIt'
export * from './Tag'
export * from './ConfigProvider'
export * from './Message'
export * from './Notification'
export * from './Input'
export * from './Overlay'
export * from './MessageBox'
export * from './Loading'
export * from './Switch'
export * from './EyeDropper'

// 注册所有 paintworklet
import pixelboardWorkletURL from './worklets/dist/pixelboard.worklet.js?url'
import pixelboxWorkletURL from './worklets/dist/pixelbox.worklet.js?url'
import pixelboxOrnamentWorkletURL from './worklets/dist/pixelboxOrnament.worklet.js?url'
import pixelboxStampWorkletURL from './worklets/dist/pixelboxStamp.worklet.js?url'
import pixelcontentWorkletURL from './worklets/dist/pixelcontent.worklet.js?url'
import pixelpanelWorkletURL from './worklets/dist/pixelpanel.worklet.js?url'
import pixelstripeWorkletURL from './worklets/dist/pixelstripe.worklet.js?url'
import pixelgridBasicWorkletURL from './worklets/dist/pixelgridBasic.worklet.js?url'
import pixelgridPreset1WorkletURL from './worklets/dist/pixelgridPreset1.worklet.js?url'
import pixeldotWorkletURL from './worklets/dist/pixeldot.worklet.js?url'

export function registerPaintWorklets() {
  if (typeof CSS !== 'undefined' && 'paintWorklet' in CSS) {
    try {
      ;(CSS as any).paintWorklet.addModule(pixelboardWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelboxWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelboxOrnamentWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelboxStampWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelcontentWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelpanelWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelstripeWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelgridBasicWorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixelgridPreset1WorkletURL)
      ;(CSS as any).paintWorklet.addModule(pixeldotWorkletURL)
    } catch (err) {
      console.warn('[Pixel UI] Error loading paintWorklet: ', err)
    }
  } else {
    console.warn(
      '[Pixel UI] CSS Houdini Paint Worklet API is not supported in this browser.'
    )
  }
}
