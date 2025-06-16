import { describe, it, expect } from 'vitest'
import { rAF } from '@pixel-ui/utils'
import { Loading } from './service'

describe.skip('Loading component', () => {
  it('should creat Loading instance', () => {
    const instance = Loading()
    expect(instance).toBeTruthy()
  })

  it('should render mask', async () => {
    Loading()
    await rAF()
    expect(document.querySelector('.px-loading__mask')).toBeTruthy()
  })

  it('should close Loading and remove it from DOM', async () => {
    const instance = Loading()

    await rAF()
    expect(document.querySelector('.px-loading')).toBeTruthy()
    instance.close()
    await rAF()

    expect(document.querySelector('.px-loading')).toBeFalsy()
  })
})
