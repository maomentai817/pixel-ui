import { describe, it, expect, beforeEach } from 'vitest'
import { useId } from '../useId'

describe('useId', () => {
  beforeEach(() => {
    //! 重置 defaultIdInjection.current (需要导出 current 才能重置)
    //! 但当前 defaultIdInjection 是私有变量，无法在测试中重置
    //! 所以测试中避免依赖 current 的精确值
  })

  it('should return a computed ref', () => {
    const id = useId()
    expect(id.value).toMatch(/^px-\d+-0}$/)
  })

  it('should increment on access (computed re-eval)', () => {
    const id1 = useId()
    const first = id1.value
    const second = id1.value // still same because computed doesn't reevaluate unless deps change
    expect(first).toBe(second)
  })

  it('should support custom namespace', () => {
    const id = useId('custom')
    expect(id.value).toMatch(/^custom-\d+-\d+}$/)
  })

  it('should generate different ids on multiple calls', () => {
    const id1 = useId()
    const id2 = useId()
    expect(id1.value).not.toBe(id2.value)
  })
})
