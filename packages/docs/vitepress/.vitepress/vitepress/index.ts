import ApiTyping from './components/globals/vp-api-typing.vue'
import ApiEnum from './components/globals/vp-api-enum.vue'
import IconList from './components/globals/icons.vue'
import bsz from './components/bsz.vue'
import type { Component } from 'vue'

export const globals: [string, Component][] = [
  ['ApiTyping', ApiTyping],
  ['ApiEnum', ApiEnum],
  ['IconList', IconList]
]

export default bsz
