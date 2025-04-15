import type { Plugin } from 'vue'
import { describe, it, expect } from 'vitest'
import {
  PxButton,
  PxButtonGroup,
  PxIcon,
  PxCard,
  PxText,
  PxCollapse,
  PxCollapseItem,
  PxAlert,
  PxAnimationFrame
} from './index'
import { map, get } from 'lodash-es'

const components = [
  PxButton,
  PxButtonGroup,
  PxIcon,
  PxCard,
  PxText,
  PxCollapse,
  PxCollapseItem,
  PxAlert,
  PxAnimationFrame
] as Plugin[]

describe('components/index.ts', () => {
  it.each(map(components, (c) => [get(c, 'name') ?? '', c]))(
    '%s should be exported',
    (_, component) => {
      expect(component).toBeDefined()
      expect(component.install).toBeDefined()
    }
  )
})
