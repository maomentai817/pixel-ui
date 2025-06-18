import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import anchor from 'markdown-it-anchor'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

import type { RenderRule } from 'markdown-it/lib/renderer'

const apiCategories = [
  'Props',
  'Events',
  'Slots',
  'Expose',
  'Directives'
] as const
type ApiCategory = (typeof apiCategories)[number]

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
      render: (p) => {
        const match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/)
        if (match) {
          return match[0] // 原始 HTML 保留
        }

        // 处理普通类型
        return `\`${p.propertyType.replace(/\|/g, '\\|')}\``
      }
    },
    { header: 'Default', render: (p) => p.defaultValue || '-' }
  ],
  Events: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description },
    {
      header: 'Type',
      render: (p) => {
        const match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/)
        if (match) {
          return match[0]
        }

        return `\`${p.propertyType.replace(/\|/g, '\\|')}\``
      }
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
      render: (p) => {
        const match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/)
        if (match) {
          return match[0] // 原始 HTML 保留
        }

        // 处理普通类型
        return `\`${p.propertyType.replace(/\|/g, '\\|')}\``
      }
    }
  ],
  Directives: [
    { header: 'Name', render: (p) => p.propertyName },
    { header: 'Description', render: (p) => p.description },
    {
      header: 'Type',
      render: (p) => {
        const match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/)
        if (match) {
          return match[0]
        }

        return `\`${p.propertyType.replace(/\|/g, '\\|')}\``
      }
    }
  ]
}

interface PropertyInfo {
  propertyName: string
  propertyType: string
  description: string
  defaultValue?: string
}
// markdown-it-anchor 自定义 slug 去重规则, 仿照 vitepress 处理结果
const usedSlugs = new Map<string, number>()

const slugifyWithDedup = (s: string) => {
  const base = s
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s+/g, '-')

  const count = usedSlugs.get(base) || 0
  usedSlugs.set(base, count + 1)

  return count === 0 ? base : `${base}-${count}`
}
const mdit = new MarkdownIt({
  html: true
})
mdit.use(anchor, {
  level: [1, 2, 3, 4, 5, 6],
  slugify: slugifyWithDedup,
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

  // 分类收集接口 (Props/Slots/Emits/Expose), 新增 Directives
  const apiCategories = {
    Props: [] as PropertyInfo[],
    Slots: [] as PropertyInfo[],
    Events: [] as PropertyInfo[],
    Expose: [] as PropertyInfo[],
    Directives: [] as PropertyInfo[]
  }

  // 匹配所有接口并分类
  const interfaceRegex =
    /export\s+interface\s+(\w+)\s*{((?:[^{}]*|{(?:[^{}]*|{[^{}]*})*})*)}/gm
  let match: RegExpExecArray | null
  while ((match = interfaceRegex.exec(content)) !== null) {
    const [, interfaceName, interfaceBody] = match
    const properties = parsePropertyComments(interfaceBody)

    // 根据接口后缀分类 (支持 ButtonProps/ButtonEvents/ButtonSlots 等格式)
    if (interfaceName.endsWith('Props')) {
      apiCategories.Props.push(...properties)
    } else if (interfaceName.endsWith('Events')) {
      apiCategories.Events.push(...properties)
    } else if (interfaceName.endsWith('Slots')) {
      apiCategories.Slots.push(...properties)
    } else if (interfaceName.endsWith('Expose')) {
      apiCategories.Expose.push(...properties)
    } else if (interfaceName.endsWith('Directives')) {
      apiCategories.Directives.push(...properties)
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
  if (apiCategories.Directives.length > 0) {
    markdown += `### Directives\n\n${generateCategoryTable('Directives', apiCategories.Directives)}\n\n`
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

    // 基本类型 / enum / Function / Object 识别, 类型识别增强, {} 定义为基础类型
    const typeMatch = prop.match(/@type\s+({[^}]+}|(\w+)(?:\s*-\s*([^\n]+))?)/)

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
      // 处理 {type} 格式
      if (typeMatch[1].startsWith('{')) {
        const typeContent = typeMatch[1]
          .replace(/^{(.*)}$/, '$1') // 去除大括号
          .replace(/\s*\n\s*/g, ' ') // 处理换行
          .trim()

        propInfo.propertyType = `\`${typeContent}\``
      }
      // 处理 type - details 格式
      else {
        const typeKind = typeMatch[2].toLowerCase()
        const typeDetails = typeMatch[3]?.trim() || ''

        // 处理特殊类型
        if (['enum', 'function', 'object'].includes(typeKind)) {
          const safeDetails = typeDetails
            .replace(/\|/g, '&#124;')
            .replace(/\\\|/g, '|')
          propInfo.propertyType = `<api-typing type="${typeKind}" details="${safeDetails}" />`
        } else {
          propInfo.propertyType = `\`${typeKind}\``
        }
      }
    }

    if (propInfo.propertyName) {
      properties.push(propInfo)
    }
  }

  return properties
}

export default apiTableMdPlugin
