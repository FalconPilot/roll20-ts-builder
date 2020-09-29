import path from 'path'
import fs from 'fs'
import babel = require('@babel/core')

export class HtmlPage {
  html: string
  styleSheet: string | null

  constructor (html: string, styleSheet: string | null = null) {
    this.html = html
    this.styleSheet = styleSheet
  }

  replaceTag (tag: string, content: string): HtmlPage {
    const regex: RegExp = new RegExp(`\{\{${tag}\}\}`)
    return new HtmlPage(this.html.replace(regex, content), this.styleSheet)
  }

  optionalReplaceTag (tag: string, content: string | null): HtmlPage {
    if (content === null) {
      return this
    }
    return this.replaceTag(tag, content)
  }
}

// GET Html Page and build CSS aside
export const getHtmlPage = (basis: string, sheet: string): HtmlPage => {
  const { default: _content }: any = require(path.resolve(__dirname, sheet, 'index.tsx'))

  if (typeof _content !== 'string') {
    throw new Error(`Could not load HTML from sheet location "${sheet}"`)
  }

  const styleTagsRegex: RegExp = /<style data-emotion-css="(?:.*?)>(?<classes>.*?)<\/style>/g

  const classes: string[] = []
  let matches: RegExpExecArray | null = [] as unknown as RegExpExecArray
  while (matches = styleTagsRegex.exec(_content)) {
    classes.push(matches[1].replace(/\.css-/g, '.sheet-css-'))
  }

  // Build CSS
  const styleSheet: string = `${sheet}.css`
  fs.writeFileSync(path.resolve(__dirname, 'build', styleSheet), classes.join('\n'))
  console.log(`> "${styleSheet}" built !`)
  const content: string = (
    _content
      .replace(styleTagsRegex, '')
      .replace(/class="css-(.*?)"/g, 'class="sheet-css-$1"')
  )

  // Embed JS
  const js: string | null = (
    babel.transformFileSync(path.resolve(__dirname, sheet, 'workers/index.ts'))?.code
  ) ?? null

  // Return bundled HTML
  return (
    new HtmlPage(basis, styleSheet)
      .replaceTag('CONTENT', content)
      .replaceTag('SHEET_NAME', sheet)
      .optionalReplaceTag('SCRIPTS', js)
  )
}
