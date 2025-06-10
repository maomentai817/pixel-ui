export const animationFrameTypes = ['loop', 'once'] as const
export type AnimationFrameType = (typeof animationFrameTypes)[number]

export interface AnimationFrameStage {
  start: number
  end: number
  type: AnimationFrameType
}

export interface AnimationFrameProps {
  /**
   * @property src
   * @type string
   * @description 图片地址
   * @default -
   */
  src: string
  /**
   * @property stages
   * @type Object - AnimationFrameStage[]
   * @description 动画帧控制器
   * @default []
   */
  stages: AnimationFrameStage[]
  /**
   * @property loop
   * @type boolean
   * @description 是否启用循环播放
   * @default false
   */
  loop?: boolean
  /**
   * @property width
   * @type number
   * @description 图片宽度
   * @default 320
   */
  width?: number
  /**
   * @property height
   * @type number
   * @description 图片高度
   * @default 320
   */
  height?: number
}

export interface AnimationFrameEmits {
  /**
   * @property click
   * @description 内置点击事件,跳转下一阶段
   */
  (_e: 'click'): void
}

export interface AnimationFrameEvents {
  /**
   * @property click
   * @description 内置点击事件,跳转下一阶段
   * @type Function - ()=>void
   */
  (_e: 'click'): void
}
