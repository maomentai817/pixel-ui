import { ref } from 'vue'

export const useCodeFold = () => {
  const isCodeFold = ref(true)
  const setCodeFold = (value: boolean) => {
    isCodeFold.value = value
  }
  return {
    isCodeFold,
    setCodeFold
  }
}
