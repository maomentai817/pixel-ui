import type { MaybeRef } from 'vue'

export interface LoadingOptionsResolved {
  parent?: HTMLElement
  target?: HTMLElement
  fullscreen?: MaybeRef<boolean>
  lock?: MaybeRef<boolean>
  text?: MaybeRef<string>
  spinner?: MaybeRef<boolean | string>
  background?: MaybeRef<string>
  customClass?: string
  visible?: MaybeRef<boolean>
  beforeClose?(): boolean
  closed?(): void
}

export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    target: HTMLElement | string
    body: boolean
    zIndex?: number
    onAfterLeave(): void
  }
>

// api-table 文档展示用 props type
export interface LoadingProps {
  /**
   * @property target
   * @type {HTMLElement | string}
   * @description Loading 需要覆盖的 DOM 节点, 可传入一个 DOM 对象或字符串; 若传入字符串, 则会将其作为参数传入 `document.querySelector` 以获取到对应 DOM 节点
   * @default document.body
   */
  target?: HTMLElement | string
  /**
   * @property body
   * @type boolean
   * @description 同 `v-loading` 指令中的 `body` 修饰符
   * @default false
   */
  body?: boolean
  /**
   * @property fullscreen
   * @type boolean
   * @description 同 `v-loading` 指令中的 `fullscreen` 修饰符
   * @default true
   */
  fullscreen?: boolean
  /**
   * @property lock
   * @type boolean
   * @description 同 `v-loading` 指令中的 `lock` 修饰符
   * @default false
   */
  lock?: boolean
  /**
   * @property text
   * @type string
   * @description 显示在 Loading 图标下方的加载文案
   * @default -
   */
  text?: string
  /**
   * @property spinner
   * @type {boolean | string}
   * @description 自定义加载图标, 可传入 `false` 禁用默认图标
   * @default true
   */
  spinner?: boolean | string
  /**
   * @property background
   * @type string
   * @description Loading 遮罩的背景色
   * @default -
   */
  background?: string
  /**
   * @property customClass
   * @type string
   * @description Loading 自定义类名
   * @default -
   */
  customClass?: string
  /**
   * @property visible
   * @type boolean
   * @description 是否显示 Loading 遮罩层
   * @default false
   */
  visible?: boolean
  /**
   * @property beforeClose
   * @type Function - () => boolean
   * @description 关闭前的回调, 返回 `false` 将阻止关闭
   * @default -
   */
  beforeClose?(): boolean
  /**
   * @property closed
   * @type Function - () => void
   * @description Loading 关闭后的回调
   * @default -
   */
  closed?(): void
}
