import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { computed } from 'vue'
import { usePxBadgeCustomStyle, usePxButtonCustomStyle } from '../useColor'

describe('usePxButtonCustomStyle', () => {
  const defaultProps = {
    color: '#209cee',
    plain: false,
    dark: false,
    disabled: false
  }

  const getResult = (props: any, overrideColor?: string) => {
    const override = overrideColor ? computed(() => overrideColor) : undefined
    return usePxButtonCustomStyle(props, override).value
  }

  it('returns empty object if no color', () => {
    const styles = getResult({ ...defaultProps, color: undefined })
    expect(styles).toEqual({})
  })

  it('generates correct styles for solid button', () => {
    const styles = getResult(defaultProps)

    expect(styles['--px-bg-color']).toBe('#209cee')
    expect(styles['--px-hover-bg-color']).toBeDefined()
    expect(styles['--px-text-color']).toBe('var(--px-color-base)')
  })

  it('generates correct styles for plain button', () => {
    const styles = getResult({ ...defaultProps, plain: true })

    expect(styles['--px-plain-bg-color']).toBeDefined()
    expect(styles['--px-text-color']).toBe('#209cee')
    expect(styles['--px-hover-bg-color']).toBe('#209cee')
    expect(styles['--px-hover-text-color']).toBe('#ffffff')
    expect(styles['--px-bg-shadow-color']).toBeDefined()
  })

  it('generates correct styles for disabled plain button', () => {
    const styles = getResult({ ...defaultProps, plain: true, disabled: true })

    expect(styles['--px-disabled-bg-color']).toBe('#aad0e9') // ≈ lighten(26)+desaturate(27)
    expect(styles['--px-disabled-text-color']).toBe('#209cee')
  })

  it('generates correct styles for disabled solid button', () => {
    const styles = getResult({ ...defaultProps, plain: false, disabled: true })

    expect(styles['--px-disabled-bg-color']).toBe('#aad0e9')
    expect(styles['--px-disabled-text-color']).toBe('#209cee')
  })

  it('supports overrideColor', () => {
    const styles = getResult(defaultProps, '#e91e63')
    expect(styles['--px-bg-color']).toBe('#e91e63')
    expect(styles['--px-hover-bg-color']).not.toBe('#209cee')
  })

  describe('supports CSS var color', () => {
    const getComputedStyleMock = vi.fn()

    beforeEach(() => {
      vi.stubGlobal('getComputedStyle', getComputedStyleMock)
      getComputedStyleMock.mockReturnValue({
        getPropertyValue: (prop: string) => {
          if (prop === '--custom-color') return ' #42b983 '
          return ''
        }
      })
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('resolves CSS variable color', () => {
      const styles = getResult({
        ...defaultProps,
        color: 'var(--custom-color)'
      })
      expect(styles['--px-bg-color']).toBe('#42b983')
    })
  })
})

describe('usePxBadgeCustomStyle', () => {
  const defaultProps = {
    color: '#209cee'
  }

  const getResult = (props: any) => {
    return usePxBadgeCustomStyle(props).value
  }

  it('returns empty object if no color', () => {
    const emptyProps = {
      ...defaultProps,
      color: undefined
    }
    const styles = getResult({ ...emptyProps })
    expect(styles).toEqual({})
  })

  it('generates correct styles', () => {
    const styles = getResult(defaultProps)

    expect(styles['--px-custom-bg-color']).toBe('#209cee')
    expect(styles['--px-custom-bg-shadow-color']).toBe('#1b78b5')
  })

  describe('supports CSS var color', () => {
    const getComputedStyleMock = vi.fn()

    beforeEach(() => {
      vi.stubGlobal('getComputedStyle', getComputedStyleMock)
      getComputedStyleMock.mockReturnValue({
        getPropertyValue: (prop: string) => {
          if (prop === '--custom-color') return ' #42b983 '
          return ''
        }
      })
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('resolves CSS variable color', () => {
      const styles = getResult({
        ...defaultProps,
        color: 'var(--custom-color)'
      })
      expect(styles['--px-custom-bg-color']).toBe('#42b983')
    })
  })
})
