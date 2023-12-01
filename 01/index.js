const { readFile } = require('../fileparser')

const problem1 = (indata) => {
  const sum = indata.reduce((acc, currentValue) => {
    const digits = currentValue.split('').filter((value) => !isNaN(value))

    return acc + parseInt(digits[0] + digits[digits.length - 1])
  }, 0)

  return sum
}

const regexRecursion = (startValue, values) => {
  const match = startValue.match(/\d|one|two|three|four|five|six|seven|eight|nine/)

  if(!match) {
    return null
  }

  const value = match[0]
  const { index } = match

  values.push(value)

  if(!isNaN(value)) {
    return regexRecursion(startValue.slice(index + 1), values)
  }

  return regexRecursion(startValue.slice(index + value.length - 1), values)
}

const transformValue = (value, mapper) => {
  if(isNaN(value)) {
    return mapper[value]
  }

  return parseInt(value)
}

const problem2 = (indata) => {
  const letterMapper = {
    one: 1,
    two: 2, 
    three: 3,
    four: 4,
    five: 5,
    six: 6, 
    seven: 7,
    eight: 8,
    nine: 9
  }

  const sum = indata.reduce((acc, currentValue) => {
    const values = []
    regexRecursion(currentValue, values)

    return acc + parseInt(`${transformValue(values[0], letterMapper)}${transformValue(values[values.length - 1], letterMapper)}`)
  }, 0)

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
