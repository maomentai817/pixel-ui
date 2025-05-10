import { each, isFunction, cloneDeep, assign } from 'lodash-es'
import { watchEffect, useSlots, getCurrentInstance, type VNode } from 'vue'

// 递归遍历节点, 执行回调
const _dfs = (nodes: VNode[], cb: (_node: VNode) => void) =>
  each(nodes, (node) => {
    isFunction(cb) && cb(node)
    node.children && _dfs(node.children as VNode[], cb)
  })

export const useDisabledStyle = () => {
  const nodePropsMap = new Map()

  const instance = getCurrentInstance()
  const children = useSlots()?.default?.()

  watchEffect(() => {
    // 恢复节点样式
    if (!instance?.props.disabled) {
      _dfs(children ?? [], (node) => {
        if (!nodePropsMap.has(node)) return
        node.props = nodePropsMap.get(node)
      })
      return
    }
    // disabled 状态, 深度遍历所有子节点, 设置禁用
    _dfs(children ?? [], (node) => {
      if (!node?.props) return

      nodePropsMap.set(node, cloneDeep(node.props))
      node.props = assign(node?.props, {
        style: {
          cursor: 'not-allowed',
          color: 'var(--px-color-info)'
        }
      })
    })
  })
}

export default useDisabledStyle
