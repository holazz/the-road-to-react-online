import { extname } from 'node:path'

import type MarkdownIt from 'markdown-it'

const langAliasMap = {
  javascript: 'js',
  typescript: 'ts',
  text: 'bash',
}

const getLang = (title: string, lang: string) => {
  const invalidTypeReg = /svg/
  const type = extname(title).replace(/^\.(.+)$/, '$1')
  return invalidTypeReg.test(type) || title === 'Code Playground'
    ? langAliasMap[lang] || lang
    : type || 'bash'
}

export const codeBlockPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    let needHighlight = false
    let flagLineCount = 0
    const highlightLines: number[] = []
    const lines = token.content.split('\n')
    token.content = lines
      .filter((line, index) => {
        if (lines[index - 1]?.trim() === '# leanpub-start-insert') {
          needHighlight = true
          flagLineCount++
        }
        if (line?.trim() === '# leanpub-end-insert') {
          needHighlight = false
          flagLineCount++
        }
        if (needHighlight) {
          highlightLines.push(index - flagLineCount + 1)
        }
        return !['# leanpub-start-insert', '# leanpub-end-insert'].includes(
          line?.trim()
        )
      })
      .join('\n')

    token.attrs = [[highlightLines.join(','), '']]

    const metaToken = tokens[idx - 2]
    const [, title, lang] = metaToken.content
      .trim()
      .match(/^{title="(.*)",lang="(.*)"}$/)!

    token.info = getLang(title, lang)

    const rawCode = fence(...args)

    return `<p><strong>${title}</strong></p>${rawCode}`
  }
}
