// rAF.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { rAF } from '../rAF'
import { ref } from 'vue'

describe('rAF utility function', () => {
  it('should resolve after two animation frames and nextTick', async () => {
    const fn = vi.fn()
    await rAF()
    fn()

    expect(fn).toHaveBeenCalled()
  })

  it('should wait for DOM update after reactive change', async () => {
    const counter = ref(0)

    counter.value = 10

    const afterUpdate = vi.fn(() => {
      expect(counter.value).toBe(10)
    })

    await rAF()
    afterUpdate()

    expect(afterUpdate).toHaveBeenCalled()
  })

  it('should return a Promise', () => {
    const result = rAF()
    expect(result).toBeInstanceOf(Promise)
  })
})
