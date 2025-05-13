import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { computed } from 'vue'
import usePxButtonCustomStyle from '../useColor'

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
    expect(styles['--px-active-bg-color']).toBeDefined()
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
