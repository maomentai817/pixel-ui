import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useOffset } from '../useOffset'

describe('useOffset', () => {
  it('should calculate topOffset and bottomOffset correctly', () => {
    const offset = 20
    const boxHeight = ref(100)
    const getLastBottomOffset = () => 30

    const { topOffset, bottomOffset } = useOffset({
      offset,
      boxHeight,
      getLastBottomOffset
    })

    expect(topOffset.value).toBe(50) // 20 + 30
    expect(bottomOffset.value).toBe(150) // 50 + 100
  })

  it('should update offsets when boxHeight changes', () => {
    const offset = 10
    const boxHeight = ref(50)
    const getLastBottomOffset = () => 40

    const { topOffset, bottomOffset } = useOffset({
      offset,
      boxHeight,
      getLastBottomOffset
    })

    expect(topOffset.value).toBe(50) // 10 + 40
    expect(bottomOffset.value).toBe(100) // 50 + 50

    // 更新 boxHeight
    boxHeight.value = 80
    expect(bottomOffset.value).toBe(130) // 50 + 80
  })

  it('should react to getLastBottomOffset changes if reactive', () => {
    const offset = 5
    const boxHeight = ref(20)
    const lastBottom = ref(10)

    const { topOffset, bottomOffset } = useOffset({
      offset,
      boxHeight,
      getLastBottomOffset: () => lastBottom.value
    })

    expect(topOffset.value).toBe(15)
    expect(bottomOffset.value).toBe(35)

    // 修改 lastBottom
    lastBottom.value = 25
    expect(topOffset.value).toBe(30)
    expect(bottomOffset.value).toBe(50)
  })
})
