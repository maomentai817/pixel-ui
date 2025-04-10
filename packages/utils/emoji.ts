import emojiRegex from 'emoji-regex'

const regex = emojiRegex()

export function wrapEmojis(text: string): string {
  return text.replace(regex, match => `<span class="emoji-wrap">${match}</span>`)
}
