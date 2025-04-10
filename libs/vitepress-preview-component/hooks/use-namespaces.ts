/**
 * 钩子函数使用
 * const ns = useNameSpace();
 * ns.b() => block
 * ns.e(element) => block__element
 * ns.m(modifier) => block--modifier
 * ns.bem(element,modifier) => block__element--modifier
 */

interface UseNameSpaceReturn {
  b: () => string
  e: (element: string) => string
  m: (modifier: string) => string
  bem: (_block?: string, element?: string, modifier?: string) => string
}

const defaultPrefix = 'vitepress-demo-preview'

const generateName = (prefix: string, block?: string, element?: string, modifier?: string) => {
  let defaultName = block === '' ? `${prefix}` : `${prefix}-${block}`
  if (element) defaultName += `__${element}`
  if (modifier) defaultName += `--${modifier}`
  return defaultName
}

export const useNameSpace = (block: string = ''): UseNameSpaceReturn => {
  const b = () => generateName(defaultPrefix, block)
  const e = (element: string = '') => generateName(defaultPrefix, block, element)
  const m = (modifier: string = '') => generateName(defaultPrefix, block, '', modifier)
  const bem = (_block?: string, element?: string, modifier?: string) =>
    generateName(defaultPrefix, _block, element, modifier)

  return {
    b,
    e,
    m,
    bem
  }
}
