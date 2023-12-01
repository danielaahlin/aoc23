const fs = require('fs')

const readFile = (path, split = '\n') => {
  const file = fs.readFileSync(path).toString().split(split)

  return file
}

module.exports = { readFile }
