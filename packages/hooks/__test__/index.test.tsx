import { describe, expect, it } from 'vitest'
import { useClickOutside, useEventListener, useId } from '../index'

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
})
