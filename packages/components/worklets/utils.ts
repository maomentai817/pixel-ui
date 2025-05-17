export const getInt = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseInt(props.get(name)?.toString() ?? `${fallback}`)
}

export const getFloat = (
  props: StylePropertyMap,
  name: string,
  fallback = 0
): number => {
  return parseFloat(props.get(name)?.toString() ?? `${fallback}`)
}
export const getStr = (
  props: StylePropertyMap,
  name: string,
  fallback = ''
): string => {
  return props.get(name)?.toString().trim() ?? fallback
}
