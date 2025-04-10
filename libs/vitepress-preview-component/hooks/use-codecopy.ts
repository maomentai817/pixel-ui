import { ref } from 'vue'

export const useCodeCopy = () => {
  const copyContent = ref('')
  const clickCopy = async (value: string) => {
    await navigator.clipboard.writeText(value)
    // TODO: 通知开发者复制成功
  }
  return {
    copyContent,
    clickCopy
  }
}
