/**
 * EyeDropper 支持的 open 方法参数
 */
export interface EyeDropperOpenOptions {
  /**
   * @property signal
   * @description 可选的 AbortSignal, 用于中止操作
   * @type AbortSignal
   * @default undefined
   */
  signal?: AbortSignal
}

/**
 * EyeDropper 初始化选项
 */
export interface UseEyeDropperOptions {
  /**
   * @property initialValue
   * @description 初始化选中的颜色值
   * @type string
   * @default ''
   */
  initialValue?: string
}

/**
 * EyeDropper open 方法返回值
 */
export interface EyeDropperResult {
  /**
   * @property sRGBHex
   * @description 返回的选中颜色值（十六进制）
   * @type string
   */
  sRGBHex: string
}

export interface EyeDropperProps {
  /**
   * @property initialValue
   * @description 选中的初始颜色值
   * @type string
   * @default ''
   */
  initialValue?: string
}

export interface EyeDropperEmits {
  /**
   * @property change
   * @description 当颜色值改变时触发
   */
  (_e: 'change', _newColor: string): void
}
export interface EyeDropperEvents {
  /**
   * @property change
   * @description 当颜色值改变时触发
   * @type Function - (newColor: string)=>void
   */
  (_e: 'change', _newColor: string): void
}

export interface EyeDropperInstance {
  /**
   * @property open
   * @description 调用原生 EyeDropper 打开取色器
   */
  open: (
    _options?: EyeDropperOpenOptions
  ) => Promise<EyeDropperResult | undefined>
  /**
   * @property sRGBHex
   * @description 当前选中的颜色值
   * @type string
   */
  sRGBHex: string
}

export interface EyeDropperExpose {
  /**
   * @property open
   * @description 打开 EyeDropper
   * @type Function - (options?: EyeDropperOpenOptions) => Promise<EyeDropperResult | undefined>
   */
  open: (
    _options?: EyeDropperOpenOptions
  ) => Promise<EyeDropperResult | undefined>
  /**
   * @property sRGBHex
   * @description 当前选中的颜色值
   * @type string
   */
  sRGBHex: string
}

export interface EyeDropperSlots {
  /**
   * @property default
   * @description 默认插槽, 暴露 open、sRGBHex 给使用者
   */
  default: () => string
}
