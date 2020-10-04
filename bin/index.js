#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const tsNode = require('ts-node')
const { ncp } = require('ncp')

const [ _1, _2, method, baseDir ] = process.argv

const basePath = path.resolve(process.cwd(), baseDir)

const config = require(path.resolve(basePath, 'roll20.config.json'))

/*
**  Helping
*/

class HtmlPage {
  constructor (html, styleSheet = null) {
    this.html = html
    this.styleSheet = styleSheet
  }

  replaceTag (tag, content) {
    const regex = new RegExp(`\{\{${tag}\}\}`)
    return new HtmlPage(this.html.replace(regex, content), this.styleSheet)
  }

  optionalReplaceTag (tag, content) {
    if (content === null) {
      return this
    }
    return this.replaceTag(tag, content)
  }
}

// GET Html Page and build CSS aside
const getHtmlPage = basis => {
  const { default: _content } = require(path.resolve(basePath, config.sheetPath))

  if (typeof _content !== 'string') {
    throw new Error(`Could not load HTML from sheet location "${config.sheetPath}"`)
  }

  const styleTagsRegex = /<style data-emotion(?:-css)?="(?:.*?)>(?<classes>.*?)<\/style>/g

  const _classes = []
  let matches = []
  while (matches = styleTagsRegex.exec(_content)) {
    _classes.push(matches[1].replace(/\.css-/g, '.sheet-css-'))
  }

  const classes = Array.from(new Set(_classes))

  // Build CSS
  const styleSheet = `${config.name}.css`
  fs.writeFileSync(path.resolve(basePath, config.distPath, styleSheet), classes.join('\n'))
  console.log(`> "${styleSheet}" built !`)
  const content = (
    _content
      .replace(styleTagsRegex, '')
      .replace(/class="css-(.*?)"/g, 'class="sheet-css-$1"')
  )

  // Embed JS
  const js = (
    babel.transformFileSync(path.resolve(basePath, config.workersPath)).code
  ) || null

  // Return bundled HTML
  return (
    new HtmlPage(basis, styleSheet)
      .replaceTag('CONTENT', content)
      .replaceTag('SHEET_NAME', config.name)
      .optionalReplaceTag('SCRIPTS', js)
  )
}

/*
**  Scripting
*/

const usageGuide =
`\nUsage :
  - ts-roll20 --init
  - ts-roll20 --build [baseDir]
  - ts-roll20 --preview [baseDir]
`

const registerTsNode = () => {
  tsNode.register({
    typeCheck: true,
    transpileOnly: true
  })
  console.log('> ts-node registered')
}

const generateHash = () => {
  const chars = '123456789'
  const slug = []
  for (let idx = 0; idx < 8; idx++) {
    slug.push(chars[Math.floor(Math.random() * chars.length)])
  }
  return slug.join('')
}

switch (method) {
  // Build HTML, CSS and JS
  case '--build': {
    registerTsNode()

    const basis = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8')
    const MainPage = getHtmlPage(basis)

    fs.writeFileSync(path.resolve(basePath, config.distPath, `${config.name}.html`), MainPage.html)
    console.log(`> "${config.name}.html" built !`)
    break
  }

  // Start preview dev server
  case '--preview': {
    registerTsNode()

    const basis = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8')
    const MainPage = getHtmlPage(basis)

    http.createServer((req, res) => {
      if (req.url === '/style') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        if (MainPage.styleSheet !== null) {
          res.write(fs.readFileSync(path.resolve(basePath, config.distPath, MainPage.styleSheet), 'utf-8'))
        }
        res.end()
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(MainPage.html)
        res.end()
      }
    }).listen(port)
    break
  }

  case '--init': {
    const hash = generateHash()
    const slug = `project-${hash}`
    ncp(path.resolve(__dirname, 'template'), path.resolve(slug), err => {
      if (err) {
        throw (err)
      }
      console.log(`> Project template ${slug} has been initialized !`)
    })
    break
  }

  // Unknown command
  default: {
    console.log(usageGuide)
    break
  }
}
