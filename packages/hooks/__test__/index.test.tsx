import { describe, expect, it } from 'vitest'
import {
  useClickOutside,
  useEventListener,
  useId,
  useDisabledStyle,
  useLocale,
  usePxButtonCustomStyle,
  usePxBadgeCustomStyle
} from '../index'

describe('utils/index', () => {
  it('useClickOutside should be exported', () => {
    expect(useClickOutside).toBeDefined()
  })

  it('useEventListener should be exported', () => {
    expect(useEventListener).toBeDefined()
  })

  it('useId should be exported', () => {
    expect(useId).toBeDefined()
  })

  it('useDisabledStyle should be exported', () => {
    expect(useDisabledStyle).toBeDefined()
  })

  it('useLocale should be exported', () => {
    expect(useLocale).toBeDefined()
  })

  it('usePxButtonCustomStyle should be exported', () => {
    expect(usePxButtonCustomStyle).toBeDefined()
  })

  it('usePxBadgeCustomStyle should be exported', () => {
    expect(usePxBadgeCustomStyle).toBeDefined()
  })
})
