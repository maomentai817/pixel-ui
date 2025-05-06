import { describe, expect, it, vi } from 'vitest'

import { addUnit } from '../style'

describe('style', () => {
  it('addUnit should add unit to number value', () => {
    expect(addUnit(10)).toBe('10px')
  })

  it('addUnit should add unit to string value', () => {
    expect(addUnit('10')).toBe('10px')
  })

  it('addUnit should not add unit to string value with unit', () => {
    expect(addUnit('10px')).toBe('10px')
  })

  it('addUnit should not add unit to string value with unit', () => {
    expect(addUnit('10%')).toBe('10%')
  })

  // 空值
  it('addUnit should not add unit to empty value', () => {
    expect(addUnit('')).toBe('')
  })

  // 非法输入
  it('addUnit should not add unit to illegal value', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    addUnit(true as any)
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [PxUIError: [utils/style]: binding value must be a string or number],
        ],
      ]
    `)
  })
})
