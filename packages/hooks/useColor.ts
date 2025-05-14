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

    // 👇 后面逻辑全部改为使用 colorRef.value 而不是 props.color
    let baseColor = colorRef.value

    const match = baseColor.match(/var\((--[^)]+)\)/)
    if (match) {
      baseColor = getComputedStyle(document.documentElement)
        .getPropertyValue(match[1])
        .trim()
    }

    const color = new TinyColor(baseColor)
    const activeBg = color.clone().desaturate(12).darken(12).toHexString()

    const hoverBg = color.clone().desaturate(3).darken(3).toHexString()

    const textColor = color.isDark()
      ? 'var(--px-color-white)'
      : 'var(--px-color-base)'

    if (props.plain) {
      Object.assign(styles, {
        [cssVar('plain-bg-color')]: color
          .clone()
          .lighten(40)
          .desaturate(40)
          .toHexString(),
        [cssVar('text-color')]: baseColor,
        [cssVar('plain-text-color')]: textColor,

        [cssVar('hover-bg-color')]: baseColor,
        [cssVar('hover-text-color')]: '#ffffff',

        [cssVar('bg-shadow-color')]: activeBg,
        [cssVar('active-bg-color')]: activeBg
      })

      if (props.disabled) {
        styles[cssVar('disabled-bg-color')] = color
          .clone()
          .lighten(26)
          .desaturate(27)
          .toHexString()
        styles[cssVar('disabled-text-color')] = baseColor
      }
    } else {
      Object.assign(styles, {
        [cssVar('bg-color')]: baseColor,
        [cssVar('text-color')]: textColor,

        [cssVar('hover-bg-color')]: hoverBg,
        [cssVar('hover-text-color')]: textColor,

        [cssVar('bg-shadow-color')]: activeBg,
        [cssVar('active-bg-color')]: activeBg
      })
    }

    if (props.disabled) {
      Object.assign(styles, {
        [cssVar('disabled-bg-color')]: color
          .clone()
          .lighten(26)
          .desaturate(27)
          .toHexString(),
        [cssVar('disabled-text-color')]: baseColor
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

    Object.assign(styles, {
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
