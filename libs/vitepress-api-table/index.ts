import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import anchor from 'markdown-it-anchor'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

import type { RenderRule } from 'markdown-it/lib/renderer'

type ApiCategory = 'Props' | 'Events' | 'Slots' | 'Expose'

interface ColumnConfig {
  header: string
  render: (_prop: PropertyInfo) => string
}

const categoryColumns: Record<ApiCategory, ColumnConfig[]> = {
  Props: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description },
    {
      header: 'Type',
      render: (p) => `\`${p.propertyType.replace(/\|/g, '\\|')}\``
    },
    { header: 'Default', render: (p) => p.defaultValue || '-' }
  ],
  Events: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description },
    {
      header: 'Type',
      render: (p) => `\`${p.propertyType}\``
    }
  ],
  Slots: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description }
  ],
  Expose: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description },
    {
      header: 'Type',
      render: (p) => `\`${p.propertyType.replace(/\|/g, '\\|')}\``
    }
  ]
}

interface PropertyInfo {
  propertyName: string
  propertyType: string
  description: string
  defaultValue?: string
}

const mdit = new MarkdownIt()
mdit.use(anchor, {
  level: [1, 2, 3, 4, 5, 6],
  permalink: anchor.permalink.ariaHidden({
    placement: 'before',
    class: 'header-anchor',
    symbol: '&#x200B;'
  })
})

const _readFile = (filename: string) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return readFileSync(
    resolve(__dirname, '../../../packages/' + filename)
  ).toString('utf8')
}

const render: RenderRule = function (tokens, idx) {
  const token = tokens[idx]
  const filePath = /src=([^\s]+)/.exec(token.info)?.[1]?.trim()
  let result = ''

  if (token.nesting === 1 && filePath) {
    const fileContent = _readFile(filePath)
    result += mdit.render(
      generateComponentDocumentation(fileContent, filePath) // 传入文件路径
    )
  }
  return result
}
const apiTableMdPlugin: MarkdownIt.PluginSimple = function (md) {
  md.use(container, 'api-table', { render })
}

// 生成分类表格的通用方法
function generateCategoryTable(
  category: ApiCategory,
  properties: PropertyInfo[]
) {
  const columns = categoryColumns[category]

  return `| ${columns.map((c) => c.header).join(' | ')} |
| ${columns.map(() => '---').join(' | ')} |
${properties
  .map((prop) => `| ${columns.map((col) => col.render(prop)).join(' | ')} |`)
  .join('\n')}`
}

function generateComponentDocumentation(content: string, filePath: string) {
  const matchComp = filePath.match(
    /components\/([^/]+)\/types(?:\.(\w+))?\.ts$/
  )

  const componentName = matchComp
    ? matchComp[2]
      ? matchComp[2][0].toUpperCase() + matchComp[2].slice(1)
      : matchComp[1][0].toUpperCase() + matchComp[1].slice(1)
    : 'UnknownComponent'

  // 分类收集接口（Props/Slots/Emits/Expose）
  const apiCategories = {
    Props: [] as PropertyInfo[],
    Slots: [] as PropertyInfo[],
    Events: [] as PropertyInfo[],
    Expose: [] as PropertyInfo[]
  }

  // 匹配所有接口并分类
  const interfaceRegex =
    /export\s+interface\s+(\w+)\s*{((?:[^{}]*|{(?:[^{}]*|{[^{}]*})*})*)}/gm
  let match: RegExpExecArray | null
  while ((match = interfaceRegex.exec(content)) !== null) {
    const [, interfaceName, interfaceBody] = match
    const properties = parsePropertyComments(interfaceBody)

    // 根据接口后缀分类 (支持 ButtonProps/ButtonEmits/ButtonSlots 等格式)
    if (interfaceName.endsWith('Props')) {
      apiCategories.Props.push(...properties)
    } else if (interfaceName.endsWith('Emits')) {
      apiCategories.Events.push(...properties)
    } else if (interfaceName.endsWith('Slots')) {
      apiCategories.Slots.push(...properties)
    } else if (interfaceName.endsWith('Instance')) {
      apiCategories.Expose.push(...properties)
    }
  }

  // 生成结构化文档
  let markdown = `## ${componentName} API\n\n`

  // 按类别渲染表格 (只在有内容时显示)
  if (apiCategories.Props.length > 0) {
    markdown += `### Props\n\n${generateCategoryTable('Props', apiCategories.Props)}\n\n`
  }
  if (apiCategories.Events.length > 0) {
    markdown += `### Events\n\n${generateCategoryTable('Events', apiCategories.Events)}\n\n`
  }
  if (apiCategories.Slots.length > 0) {
    markdown += `### Slots\n\n${generateCategoryTable('Slots', apiCategories.Slots)}\n\n`
  }
  if (apiCategories.Expose.length > 0) {
    markdown += `### Expose\n\n${generateCategoryTable('Expose', apiCategories.Expose)}\n\n`
  }

  return markdown
}

// 解析注释和属性
function parsePropertyComments(propertyStr: string): PropertyInfo[] {
  const props = propertyStr
    .split('/**')
    .map((p) => p.trim())
    .filter((p) => p.includes('@property'))

  const properties: PropertyInfo[] = []

  for (const prop of props) {
    const propInfo: PropertyInfo = {
      propertyName: '',
      propertyType: '',
      description: '',
      defaultValue: '-'
    }

    const nameMatch = prop.match(/@property\s+([\w:-]+)/)
    const descMatch = prop.match(/@description\s+(.*)/)
    const defaultMatch = prop.match(/@default\s+(.*)/)

    // 支持 enum 类型声明
    const typeMatch = prop.match(/@type\s+(enum\s*-\s*)?([^\n]+)/)

    if (nameMatch) {
      propInfo.propertyName = nameMatch[1].trim()
    }

    if (descMatch) {
      propInfo.description = descMatch[1].trim()
    }

    if (defaultMatch) {
      propInfo.defaultValue = defaultMatch[1].trim()
    }

    if (typeMatch) {
      const isEnum = !!typeMatch[1]
      let typeValue = typeMatch[2].trim()

      typeValue.startsWith('{') && (typeValue = typeValue.slice(1, -1))

      // 统一格式化枚举类型
      if (isEnum) {
        typeValue = typeValue
          .replace(/\s*\|\s*/g, ' | ') // 统一竖线间距
          .replace(/^enum\s*-\s*/i, '') // 移除残留enum标识
      }

      propInfo.propertyType = typeValue
    }

    if (propInfo.propertyName) {
      properties.push(propInfo)
    }
  }

  return properties
}

export default apiTableMdPlugin
