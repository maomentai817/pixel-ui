import type { Component } from 'vue'

export type TextType = 'primary' | 'success' | 'warning' | 'danger' | 'base'
export type TextAlign = 'left' | 'center' | 'right'

export interface TextProps {
  /**
   * @property size
   * @type number
   * @description 文本大小(px)
   * @default 16
   */
  size?: number
  /**
   * @property type
   * @type enum - primary | success | warning | danger | base
   * @description 文本类型
   * @default base
   */
  type?: TextType
  /**
   * @property color
   * @type string
   * @description 文本颜色
   * @default #212529
   */
  color?: string
  /**
   * @property bold
   * @type boolean
   * @description 是否启用粗体
   * @default false
   */
  bold?: boolean
  /**
   * @property align
   * @type enum - left | center | right
   * @description 对齐方式
   * @default left
   */
  align?: TextAlign
  /**
   * @property tag
   * @type {string | Component}
   * @description 自定义元素标签
   * @default span
   */
  tag?: string | Component
  /**
   * @property compact
   * @type boolean
   * @description 是否启用紧凑模式
   * @default false
   */
  compact?: boolean
}
