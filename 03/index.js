const { readFile } = require('../fileparser')

const buildSchema = (data) => {
  const schema = {}

  data.forEach((row, i) => 
    schema[i] = row.split('')
  )

  return schema
}

const findNumbersAndIndices = (data, row) => {
  const matchedData = data.matchAll(/\d+/g)

  return Array.from(matchedData).map(item => ({
    number: parseInt(item[0]),
    row,
    startIndex: item.index,
    endIndex: item.index + item[0].length - 1
  }))
}

// value - {number: int, row: int, startIndex: int, endIndex: int}
const findAdjacenctIndices = (value, schema) => {
  const [minRow, maxRow] = [0, Object.keys(schema).length - 1]
  const [minCol, maxCol] = [0, schema[0].length - 1]

  const rows = [
    value.row - 1 < minRow ? null : value.row - 1,
    value.row + 1 > maxRow ? null : value.row + 1
  ].filter(r => r !== null)

  const adjacentIndices = rows.map(r => {
    const startIndicies = [
      value.startIndex > minCol ? {r: value.row, c: value.startIndex - 1} : null,
      value.endIndex < maxCol ? {r: value.row, c: value.endIndex + 1} : null
    ].filter(val => val !== null)

    const indices = [...startIndicies]
    for(let c = value.startIndex - 1; c <= value.endIndex + 1; c += 1){
      if(c >= minCol && c <= maxCol){
        indices.push({r, c})
      }
    }

    return indices
  }).flat()

  return adjacentIndices
}

const problem1 = (indata) => {
  const engineSchema = buildSchema(indata)

  const numberAndIndices = indata.map((item, i) => 
    findNumbersAndIndices(item, i)
  ).flat()

  let sum = 0
  numberAndIndices.forEach(item => {
    const adjacentIndices = findAdjacenctIndices(item, engineSchema)
    const adjacentSymbol = adjacentIndices.find(indexPair => 
      engineSchema[indexPair.r][indexPair.c] !== '.' && isNaN(parseInt(engineSchema[indexPair.r][indexPair.c]))
    )
    
    if(adjacentSymbol) {
      sum += item.number
    }
    
  })

  return sum
}

/**
 * Find all gears
 * For each gear, find all adjacent number to it
 * If exactly 2 numbers are adjacent: multiply and add to sum
 */
const problem2 = (indata) => {
  const numberAndIndices = indata.map((item, i) => 
    findNumbersAndIndices(item, i)
  ).flat()

  const gearIndices = indata.map((data, i) => {
    const matchedData = data.matchAll(/\*/g)

    return Array.from(matchedData).map(item => ({
      value: item[0],
      row: i,
      col: item.index
    }))
  }).flat()

  let sum = 0

  gearIndices.forEach(gearIndex => {
    const adjacentNumbers = numberAndIndices.map(value => {
      if(gearIndex.row >= value.row - 1 && gearIndex.row <= value.row + 1 && gearIndex.col >= value.startIndex - 1 && gearIndex.col <= value.endIndex + 1) {
        return value
      }
    }).filter(Boolean)

    if(adjacentNumbers.length == 2){
      sum += adjacentNumbers[0].number * adjacentNumbers[1].number 
    }
  })

  return sum

}

const main = () => {
  const path = './input.txt'
  const indata = readFile(path)
  
  console.log('Solution to problem 1: ', problem1(indata))
  console.log('----')
  console.log('Solution to problem 2: ', problem2(indata))
  
}
  
main()