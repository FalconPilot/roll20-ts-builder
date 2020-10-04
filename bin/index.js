#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const tsNode = require('ts-node')

const [ _1, _2, method, name, htmlPath, sheetPath, workersPath, distPath, port ] = process.argv

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
  const { default: _content } = require(path.resolve(sheetPath))

  if (typeof _content !== 'string') {
    throw new Error(`Could not load HTML from sheet location "${sheetPath}"`)
  }

  const styleTagsRegex = /<style data-emotion(?:-css)?="(?:.*?)>(?<classes>.*?)<\/style>/g

  const _classes = []
  let matches = []
  while (matches = styleTagsRegex.exec(_content)) {
    _classes.push(matches[1].replace(/\.css-/g, '.sheet-css-'))
  }

  const classes = Array.from(new Set(_classes))

  // Build CSS
  const styleSheet = `${name}.css`
  fs.writeFileSync(path.resolve(distPath, styleSheet), classes.join('\n'))
  console.log(`> "${styleSheet}" built !`)
  const content = (
    _content
      .replace(styleTagsRegex, '')
      .replace(/class="css-(.*?)"/g, 'class="sheet-css-$1"')
  )

  // Embed JS
  const js = (
    babel.transformFileSync(workersPath).code
  ) || null

  // Return bundled HTML
  return (
    new HtmlPage(basis, styleSheet)
      .replaceTag('CONTENT', content)
      .replaceTag('SHEET_NAME', name)
      .optionalReplaceTag('SCRIPTS', js)
  )
}

/*
**  Scripting
*/

const usageGuide =
`\nUsage :
  - ts-roll20 --build [name] [htmlPath] [sheetPath] [workersPath] [distPath]
  - ts-roll20 --preview [name] [htmlPath] [sheetPath] [workersPath] [distPath] [port]
`

const checkStringArg = key => arg => () => {
  if (typeof arg !== 'string') {
    throw new Error(`Argument [${key}] was not provided`)
  }
}

const checkNumberArg = key => arg => () => {
  if (isNaN(parseInt(arg, 10))) {
    throw new Error(`Argument [${key}] was not or not a number`)
  }
}

const checkName = checkStringArg('name')(htmlPath)
const checkHtmlPath = checkStringArg('htmlPath')(htmlPath)
const checkSheetPath = checkStringArg('sheetPath')(sheetPath)
const checkWorkersPath = checkStringArg('workersPath')(workersPath)
const checkDistPath = checkStringArg('distPath')(distPath)
const checkPort = checkNumberArg('port')(port)

const registerTsNode = () => {
  tsNode.register({
    typeCheck: true,
    transpileOnly: true
  })
  console.log('> ts-node registered')
}

switch (method) {
  // Build HTML, CSS and JS
  case '--build': {
    checkName()
    checkHtmlPath()
    checkSheetPath()
    checkWorkersPath()
    checkDistPath()
    registerTsNode()

    const basis = fs.readFileSync(path.resolve(htmlPath), 'utf-8')
    const MainPage = getHtmlPage(basis)

    fs.writeFileSync(path.resolve(distPath, `${name}.html`), MainPage.html)
    console.log(`> ${name}.html built !`)
    break
  }

  // Start preview dev server
  case '--preview': {
    checkName()
    checkHtmlPath()
    checkSheetPath()
    checkWorkersPath()
    checkDistPath()
    checkPort()
    registerTsNode()

    const basis = fs.readFileSync(path.resolve(htmlPath), 'utf-8')
    const MainPage = getHtmlPage(basis)

    http.createServer((req, res) => {
      if (req.url === '/style') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        if (MainPage.styleSheet !== null) {
          res.write(fs.readFileSync(path.resolve(distPath, MainPage.styleSheet), 'utf-8'))
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

  // Unknown command
  default: {
    console.log(usageGuide)
    break
  }
}
