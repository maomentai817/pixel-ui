import MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import container from 'markdown-it-container'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import { each } from 'lodash-es'

interface PropertyInfo {
  propertyName: string
  propertyType: string
  description: string
  defaultValue?: string
}

const mdit = new MarkdownIt()

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

  if (token.nesting === 1) {
    const fileContent = _readFile(filePath ?? '')
    // 正则表达式匹配接口名称
    const interfaceRegex = /export\s+interface\s+(\w+)/g

    // 执行匹配并存储所有接口名称
    let match: RegExpExecArray | null = null
    while ((match = interfaceRegex.exec(fileContent)) !== null) {
      result += mdit.render(
        generateMarkdownDocumentation(fileContent, match[1])
      )
    }
  }
  return result
}
const apiTableMdPlugin: MarkdownIt.PluginSimple = function (md) {
  md.use(container, 'api-table', { render })
}

function generateMarkdownDocumentation(content: string, interfaceName: string) {
  const regex = new RegExp(
    `export interface ${interfaceName} {([\\s\\S]*?)}`,
    'm'
  )
  const match = content.match(regex)

  if (!match) return 'No interface found'

  const propertiesBlock = match[1]

  let markdownTable = `### ${interfaceName}\n\n| Name | Description | Type | Default |\n| --- | --- | --- | --- |\n`

  const properties = parsePropertyComments(propertiesBlock)
  each(properties, (propertie: PropertyInfo) => {
    markdownTable += `| ${propertie.propertyName} | ${propertie.description} | \`${propertie.propertyType.replace(/\|/g, '\\|')}\` | ${propertie.defaultValue} |\n`
  })

  return markdownTable
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

    const nameMatch = prop.match(/@property\s+(\w+)/)
    const descMatch = prop.match(/@description\s+(.*)/)
    const defaultMatch = prop.match(/@default\s+(.*)/)

    // 支持 enum 类型声明
    const typeMatch =
      prop.match(/@type\s+enum\s*-\s*([^\n]*)/) ||
      prop.match(/@type\s+([^\n]*)/)

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
      propInfo.propertyType = typeMatch[1].trim()
    }

    if (propInfo.propertyName) {
      properties.push(propInfo)
    }
  }

  return properties
}

export default apiTableMdPlugin
