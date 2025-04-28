import { describe, expect, it } from 'vitest'
import { useClickOutside, useEventListener } from '..'

describe('utils/index', () => {
  it('useClickOutside should be exported', () => {
    expect(useClickOutside).toBeDefined()
  })

  it('useEventListener should be exported', () => {
    expect(useEventListener).toBeDefined()
  })
})
