import { describe, it, expect, beforeEach } from 'vitest'
import { useZIndex, zIndex } from '../useZIndex'

describe('useZIndex', () => {
  beforeEach(() => {
    zIndex.value = 0
  })

  it('should return default initial value and computed zIndex', () => {
    const { initialValue, currentZIndex } = useZIndex()
    expect(initialValue.value).toBe(2000)
    expect(currentZIndex.value).toBe(2000)
  })

  it('should support custom initial value', () => {
    const { initialValue, currentZIndex } = useZIndex(3000)
    expect(initialValue.value).toBe(3000)
    expect(currentZIndex.value).toBe(3000)
  })

  it('should increase zIndex globally with nextZIndex()', () => {
    const inst1 = useZIndex(1000)
    const inst2 = useZIndex(1000)

    expect(inst1.currentZIndex.value).toBe(1000)
    expect(inst2.currentZIndex.value).toBe(1000)

    const next1 = inst1.nextZIndex()
    expect(next1).toBe(1001)

    const next2 = inst2.nextZIndex()
    expect(next2).toBe(1002)

    expect(inst1.currentZIndex.value).toBe(1002)
    expect(inst2.currentZIndex.value).toBe(1002)
  })

  it('should keep increasing even across instances', () => {
    const a = useZIndex(2000)
    a.nextZIndex() // -> 2001
    a.nextZIndex() // -> 2002

    const b = useZIndex(0)
    expect(b.currentZIndex.value).toBe(2) // zIndex = 2, initVal = 0
    expect(b.nextZIndex()).toBe(3)
  })
})
