const path = require('path')

module.exports = {
  name: 'YOUR_NAME_HERE',
  previewPort: 3639,
  sheetPath: path.resolve(__dirname, 'sheet', 'index.tsx'),
  distPath: path.resolve(__dirname, 'dist'),
  workersPath: path.resolve(__dirname, 'workers', 'index.ts')
}
