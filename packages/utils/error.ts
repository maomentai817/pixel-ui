import { isString } from 'lodash-es'

class PxUIError extends Error {
  constructor(message: string | Error) {
    super(isString(message) ? message : message.message)
    this.name = 'PxUIError'
  }
}
const createPxUIError = (scope: string, msg: string) => { 
  return new PxUIError(`[${scope}]: ${msg}`)
}
export const throwError = (scope: string, msg: string) => { 
  throw createPxUIError(scope, msg)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) { 
  if (process.env.NODE_ENV !== 'production') { 
    const err = isString(scope) ? createPxUIError(scope, msg!) : scope
    console.warn(err)
  }
}