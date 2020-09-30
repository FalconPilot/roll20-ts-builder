# Roll20 TS Builder

Installation
- With npm : `npm install roll20-ts-builder`
- With yarn : `yarn install roll20-ts-builder`

## This is still a work in progress and far from complete.

## Disclaimer

This is an unofficial project and is not endorsed or related in any way to Roll20's team or creators. I'm just a guy who enjoys tabletop gaming and statically typed programming languages, so...

I have nothing to do with Roll20 aside from being a very regular gamemaster/player on this platform. [Check them out right here](https://roll20.net/) if you don't know what it is, it's pretty cool if you like (or if you *would* like getting into) online tabletop gaming.

## What exactly is this ?

The thing is, I love Roll20, and I love that you can create your own character sheets using HTML, CSS or JS. But it's 2020 and I just love my more modern techs (Typescript, Styled-Components, React, etc...) - and therefore have a strong feeling of having to deal with legacy-flavored code when building character sheets.

So this is my take on resolving the matter (at least for me) : a TypeScript builder that can handle building HTML, CSS and JS worker scripts to make custom, compiled character sheets with modern techs.

It comes with a library exposing utilitary types and a CLI to build HTML/CSS files and embed JS worker scripts.

## Required dependancies

The library requires the following dependencies for an optimal usage :
- `react`
- `react-dom`
- `@emotion/react`
- `@emotion/styled`

## CLI usage

- `ts-roll20 --build [name] [htmlPath] [sheetPath] [workersPath] [distPath]`
- `ts-roll20 --preview [name] [htmlPath] [sheetPath] [workersPath] [distPath] [port]`
