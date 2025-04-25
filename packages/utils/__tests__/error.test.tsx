import { describe, expect, it, vi } from 'vitest'

import { throwError, debugWarn, PxUIError } from '../error'

describe('error', () => {
  it('throwError should be worked', () => {
    expect(() => {
      throwError('scope', 'msg')
    }).toThrowError('[scope]: msg')
  })
  it('debugWarn should be worked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    debugWarn('scope', 'msg')
    debugWarn(new SyntaxError('custom error'))
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [PxUIError: [scope]: msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `)
  })
  it('PxUIError should extract message from Error object', () => {
    const originalError = new Error('original message')
    const pxError = new PxUIError(originalError)
    expect(pxError.message).toBe('original message')
    expect(pxError.name).toBe('PxUIError')
  })
})
