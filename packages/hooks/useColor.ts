import { computed, type ComputedRef } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import type { ButtonProps, BadgeProps } from '@mmt817/pixel-ui'

function cssVar(name: string) {
  return `--px-${name}`
}

// 新增参数 `overrideColor`，可选
export function usePxButtonCustomStyle(
  props: ButtonProps,
  overrideColor?: ComputedRef<string | undefined>
) {
  const colorRef = computed(() => overrideColor?.value || props.color)

  return computed(() => {
    const styles: Record<string, string> = {}

    if (!colorRef.value) return styles

    let baseColor = colorRef.value

    const match = baseColor.match(/var\((--[^)]+)\)/)
    if (match) {
      baseColor = getComputedStyle(document.documentElement)
        .getPropertyValue(match[1])
        .trim()
    }

    const color = new TinyColor(baseColor)
    const bgShadow = color.clone().desaturate(12).darken(12).toHexString()

    const textColor = color.isDark()
      ? 'var(--px-color-white)'
      : 'var(--px-color-base)'

    if (props.plain) {
      Object.assign(styles, {
        [cssVar('plain-bg-color')]: color.tint(90).toString(),
        [cssVar('text-color')]: baseColor,
        [cssVar('plain-border-color')]: color.tint(50).toString(),

        [cssVar('hover-bg-color')]: baseColor,
        [cssVar('hover-text-color')]: textColor,

        [cssVar('plain-bg-shadow-color')]: bgShadow
      })

      if (props.disabled) {
        styles[cssVar('disabled-bg-color')] = color.tint(90).toString()
        styles[cssVar('disabled-text-color')] = color.tint(50).toString()
      }
    } else {
      const hoverBg = color.clone().desaturate(3).darken(3).toHexString()

      Object.assign(styles, {
        [cssVar('bg-color')]: baseColor,
        [cssVar('text-color')]: textColor,

        [cssVar('hover-bg-color')]: hoverBg,
        [cssVar('hover-text-color')]: textColor,

        [cssVar('bg-shadow-color')]: bgShadow
      })
    }

    if (props.disabled) {
      Object.assign(styles, {
        [cssVar('disabled-bg-color')]: color.tint(50).toString(),
        [cssVar('disabled-text-color')]: 'var(--px-color-white)'
      })
    }

    return styles
  })
}

export function usePxBadgeCustomStyle(props: BadgeProps) {
  const colorRef = computed(() => props.color)

  return computed(() => {
    const styles: Record<string, string> = {}

    if (!colorRef.value) return styles

    let baseColor = colorRef.value

    const match = baseColor.match(/var\((--[^)]+)\)/)
    if (match) {
      baseColor = getComputedStyle(document.documentElement)
        .getPropertyValue(match[1])
        .trim()
    }

    const color = new TinyColor(baseColor)
    const bgShadow = color.clone().desaturate(12).darken(12).toHexString()
    const textColor = color.isDark()
      ? 'var(--px-color-white)'
      : 'var(--px-color-base)'

    Object.assign(styles, {
      [cssVar('badge-text-color')]: textColor,
      [cssVar('custom-bg-color')]: baseColor,
      [cssVar('custom-bg-shadow-color')]: bgShadow
    })
    return styles
  })
}

export default {
  usePxBadgeCustomStyle,
  usePxButtonCustomStyle
}
