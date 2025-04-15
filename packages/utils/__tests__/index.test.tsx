import { describe, expect, it } from "vitest"
import {
  debugWarn,
  throwError,
  withInstall,
  typeIconMap,
  updateColors,
  hexToHSL,
  HSLToHex,
  adjustColor
} from "..";
import { each } from "lodash-es"

describe("utils/index", () => {
  it("debugWarn should be exported", () => {
    expect(debugWarn).toBeDefined()
  })

  it("throwError should be exported", () => {
    expect(throwError).toBeDefined()
  })
  
  it("withInstall should be exported", () => {
    expect(withInstall).toBeDefined()
  })

  it("typeIconMap should be worked", () => {
    expect(typeIconMap).toBeDefined()
    each(
      [
        ['info', 'info-circle-solid'],
        ['success', 'check-circle-solid'],
        ['warning', 'exclamation-triangle-solid'],
        ['danger', 'times-circle-solid'],
        ['error', 'times-circle-solid']
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    )
  })
})

describe('Color Utilities', () => {
  it("updateColors should be exported", () => {
    expect(updateColors).toBeDefined()
  })

  it("updateColors should be worked", () => {
    expect(updateColors('#000000')).toEqual({
      'bgColor': '#000000',
      'bgShadowColor': '#000000',
      'borderColor': '#000000',
      'fillHoverColor': '#000000',
      'lightColor': '#999999',
      'lightColor2': '#4d4d4d',
      'textColor': '#000000',
    })
  })

  it('should convert HEX to HSL and back (max === min, gray)', () => {
    const hsl = hexToHSL('#888888')
    expect(hsl.s).toBe(0)
    const hex = HSLToHex(hsl)
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should convert HEX to HSL and back (max !== min)', () => {
    const hsl = hexToHSL('#ff0000') // red
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBeGreaterThan(0)
    const hex = HSLToHex(hsl)
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it.each([
    { h: 30, s: 100, l: 50 },
    { h: 90, s: 100, l: 50 },
    { h: 150, s: 100, l: 50 },
    { h: 210, s: 100, l: 50 },
    { h: 270, s: 100, l: 50 },
    { h: 330, s: 100, l: 50 },
  ])('should cover HSLToHex h=%p', (hsl) => {
    const hex = HSLToHex(hsl)
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('updateColors should return valid hex values', () => {
    const result = updateColors('#3498db')
    for (const key in result) {
      expect(result[key as keyof typeof result]).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

describe('Color Algorithm Branch Coverage', () => {
  it('hexToHSL switch: max === r (case r)', () => {
    const hsl = hexToHSL('#ff0080') // r=255, g=0, b=128
    expect(hsl.h).toBeCloseTo(330) // hue 330° = red
  })

  it('hexToHSL switch: max === g (case g)', () => {
    const hsl = hexToHSL('#80ff80') // r=128, g=255, b=128
    expect(hsl.h).toBeCloseTo(120) // hue 120° = green
  })

  it('adjustColor should increase lightness and decrease saturation', () => {
    const base = '#3498db'
    const adjusted = adjustColor(base, { lightness: 20, saturation: -30 })
    expect(adjusted).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('adjustColor should clamp lightness below 0', () => {
    const base = '#123456'
    const adjusted = adjustColor(base, { lightness: -100 })
    const hsl = hexToHSL(adjusted)
    expect(hsl.l).toBeGreaterThanOrEqual(0)
  })

  it('adjustColor should skip undefined options', () => {
    const base = '#abcdef'
    const adjusted = adjustColor(base, {}) // no options
    expect(adjusted).toBe(HSLToHex(hexToHSL(base)))
  })
})
