/**
 * 颜色调整参数
 */
interface ColorAdjustOptions {
  lightness?: number;  // 亮度调整（正值增加，负值降低）
  saturation?: number; // 饱和度调整（正值增加，负值降低）
}

/**
 * HSL 颜色类型
 */
interface HSLColor {
  h: number; // 色相（0-360°）
  s: number; // 饱和度（0-100%）
  l: number; // 亮度（0-100%）
}

/**
 * HEX 转 HSL
 * @param hex HEX 颜色值
 * @returns HSL 颜色对象
 */
function hexToHSL(hex: string): HSLColor {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255

  let max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h = Math.round(h * 60)
  } else {
    s = 0
  }

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) }
}

/**
 * HSL 转 HEX
 * @param hsl HSL 颜色对象
 * @returns HEX 颜色值
 */
function HSLToHex(hsl: HSLColor): string {
  const { h, s, l } = hsl
  const sRatio = s / 100
  const lRatio = l / 100

  const c = (1 - Math.abs(2 * lRatio - 1)) * sRatio
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = lRatio - c / 2

  let r = 0, g = 0, b = 0

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return `#${[r, g, b].map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('')}`
}

/**
 * 调整颜色的亮度 & 饱和度
 * @param color HEX 颜色
 * @param options 调整参数
 * @returns 调整后的 HEX 颜色
 */
function adjustColor(color: string, options: ColorAdjustOptions): string {
  let hsl = hexToHSL(color)
  // 确保调整后的值在 0-100 范围内
  hsl.l = Math.max(0, Math.min(100, hsl.l + (options.lightness ?? 0)))
  hsl.s = Math.max(0, Math.min(100, hsl.s + (options.saturation ?? 0)))
  return HSLToHex(hsl)
}

/**
 * 根据主色动态生成一整套颜色
 * @param baseColor 主色 HEX
 * @param prefix 颜色变量前缀
 */
interface ColorSet {
  bgColor: string
  lightColor: string
  lightColor2: string
  bgShadowColor: string
  textColor: string
  fillHoverColor: string
  borderColor: string
}
export const updateColors = (baseColor: string): ColorSet => {
  const baseHSL = hexToHSL(baseColor)

  const isDarkBase = baseHSL.l < 50

  return {
    bgColor: baseColor,
    lightColor: adjustColor(baseColor, {
      lightness: isDarkBase ? 60 : 40,
      saturation: -50
    }),
    lightColor2: adjustColor(baseColor, {
      lightness: isDarkBase ? 30 : 20,
      saturation: -30
    }),
    bgShadowColor: adjustColor(baseColor, {
      lightness: -20,
      saturation: isDarkBase ? 20 : 10
    }),
    textColor: baseColor,
    fillHoverColor: adjustColor(baseColor, { lightness: -10 }),
    borderColor: adjustColor(baseColor, { lightness: -10 }),
  }
}
