import path from 'path'
import fs from 'fs'
import http from 'http'
import yargs from 'yargs'

import { HtmlPage, getHtmlPage } from '$utils/scripts'

const sheet: unknown = yargs.argv?.sheet
const port: unknown = yargs.argv?.port

if (typeof sheet !== 'string') {
  throw new Error('No valid sheet was passed using --sheet argument')
}

if (typeof port !== 'number') {
  throw new Error('No valid port was passed using the --port argument')
}

const basis: string = fs.readFileSync(path.resolve(__dirname, 'preview.html'), 'utf-8')

const MainPage: HtmlPage = getHtmlPage(basis, sheet)

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
  if (req.url === '/style') {
    res.writeHead(200, { 'Content-Type': 'text/css' })
    if (MainPage.styleSheet !== null) {
      res.write(fs.readFileSync(path.resolve(__dirname, 'build', MainPage.styleSheet), 'utf-8'))
    }
    res.end()
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(MainPage.html)
    res.end()
  }
}).listen(port)
