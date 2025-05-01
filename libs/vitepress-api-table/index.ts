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

  let markdownTable = `## ${interfaceName}\n\n| Name | Description | Type | Default |\n| --- | --- | --- | --- |\n`

  const properties = parsePropertyComments(propertiesBlock)
  each(properties, (propertie: PropertyInfo) => {
    markdownTable += `| ${propertie.propertyName} | ${propertie.description} | \`${propertie.propertyType}\` | \`${propertie.defaultValue ?? '-'}\` |\n`
  })

  return markdownTable
}

// 解析注释和属性
function parsePropertyComments(propertyStr: string): PropertyInfo[] {
  const lines = propertyStr.split('\n')
  const properties: PropertyInfo[] = []

  let currentComment: Partial<PropertyInfo> = {}
  let parsingComment = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // 开始解析注释块
    if (line.startsWith('/**')) {
      parsingComment = true
      currentComment = {}
      continue
    }

    if (parsingComment) {
      const propertyMatch = line.match(/@property\s+([\w$]+)/)
      const typeMatch = line.match(/@type\s+(.*)/)
      const descMatch = line.match(/@description\s+(.*)/)
      const defaultMatch = line.match(/@default\s+(.*)/)

      if (propertyMatch) currentComment.propertyName = propertyMatch[1]
      if (typeMatch) currentComment.propertyType = typeMatch[1]
      if (descMatch) currentComment.description = descMatch[1]
      if (defaultMatch) currentComment.defaultValue = defaultMatch[1]

      // 注释块结束
      if (line.endsWith('*/')) {
        parsingComment = false
      }

      continue
    }

    // 匹配字段定义（确保有字段名）
    const fieldMatch = line.match(/^(\w+)\??:\s*([^;]+)/)
    if (fieldMatch && currentComment.propertyName === fieldMatch[1]) {
      if (!currentComment.propertyType) {
        currentComment.propertyType = fieldMatch[2].trim()
      }
      if (!currentComment.description) {
        currentComment.description = '-'
      }
      properties.push(currentComment as PropertyInfo)
      currentComment = {}
    }
  }

  return properties
}

export default apiTableMdPlugin
