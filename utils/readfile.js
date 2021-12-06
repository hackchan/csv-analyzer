const { promises: fs } = require('fs')
const path = require('path')

function readFile(filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const ruta = path.resolve(__dirname, filename)
      const file = await fs.readFile(ruta, 'utf8')
      resolve(file)
    } catch (error) {
      reject(error)
    }
  })
}

function writeFile(filename, content) {
  return new Promise(async (resolve, reject) => {
    try {
      const ruta = path.resolve(__dirname, filename)
      const file = await fs.writeFile(ruta, content)
      resolve(file)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  readFile,
  writeFile
}
