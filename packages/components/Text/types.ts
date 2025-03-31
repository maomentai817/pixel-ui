import type { Component } from 'vue'

export type TextType = 'primary' | 'success' | 'warning' | 'danger' | 'base'
export type TextAlign = 'left' | 'center' | 'right'

export interface TextProps { 
  /**
   * @property size
   * @type px
   * @description 字体大小
   * @default "16"
   */
  size?: number;
  /**
   * @property type
   * @description 字体类型
   * @default "base"
   */
  type?: TextType;
  /**
   * @property color
   * @description 字体颜色
   * @default "#212529"
   */
  color?: string;
  /**
   * @property bold
   * @description 字体粗细
   */
  bold?: boolean;
  /**
   * @property align
   * @description 字体对齐方式
   */
  align?: TextAlign;
  /**
   * @property tag
   * @description 自定义元素标签
   */
  tag?: string | Component;
  /**
   * @property compact
   * @description 是否紧凑
   */
  compact?: boolean;
}