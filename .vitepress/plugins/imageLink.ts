import type MarkdownIt from 'markdown-it'

export const imageLinkPlugin = (md: MarkdownIt) => {
  const image = md.renderer.rules.image!
  md.renderer.rules.image = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    const url = token.attrGet('src')!
    token.attrSet('src', `/manuscript/${url}`)

    return image(...args)
  }
}
