export type AnimationFrameType = 'loop' | 'once'

export interface AnimationFrameStage {
  start: number
  end: number
  type: AnimationFrameType
}

export interface AnimationFrameProps {
  /**
   * @property src
   * @description gif url
   * @default ""
   */
  src: string
  /**
   * @property stages
   * @description animation stages
   * @default []
   */
  stages: AnimationFrameStage[]
  /**
   * @property width
   * @description width
   */
  width?: number
  /**
   * @property height
   * @description height
   */
  height?: number
  /**
   * @property loop
   * @description loop
   * @default false
   */
  loop?: boolean
}
