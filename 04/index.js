const { readFile } = require('../fileparser')

const getNumberOfWins = (numbers, winningNumbers) => {
  const numberOfWins = numbers.reduce((acc, crnt) => {
    if(winningNumbers.includes(crnt)) {
      winningNumbers.splice(winningNumbers.indexOf(crnt), 1)
      return acc + 1
    }
  
    return acc
  }, 0)

  return numberOfWins
}

const problem1 = (indata) => {
  let sum = 0

  indata.forEach(data => {
    const allNumbers = data.split(':')[1].split('|')
    const numbers = allNumbers[0].match(/\d+/g)
    const winningNumbers = allNumbers[1].match(/\d+/g)
    
    const numberOfWins = getNumberOfWins(numbers, winningNumbers)

    if(numberOfWins > 0) {
      sum += Math.pow(2, numberOfWins - 1)
    }
  })

  return sum
}

const problem2 = (indata) => {
  const totalAmountOfCards = {}
  indata.forEach((_, i) => totalAmountOfCards[i] = 1)

  indata.forEach((data, index) => {
    const allNumbers = data.split(':')[1].split('|')
    const numbers = allNumbers[0].match(/\d+/g)
    const winningNumbers = allNumbers[1].match(/\d+/g)
      
    const numberOfWins = getNumberOfWins(numbers, winningNumbers)

    // Apply win
    for(let i = index + 1; i < index + numberOfWins + 1; i += 1) {
      if(i < indata.length) {
        totalAmountOfCards[i] += totalAmountOfCards[index]
      }
    }
  })
  
  return Object.values(totalAmountOfCards).reduce((acc, current) => acc + current, 0)
} 

const main = () => {
  const path = './input.txt'
  const indata = readFile(path)
    
  console.log('Solution to problem 1: ', problem1(indata))
  console.log('----')
  console.log('Solution to problem 2: ', problem2(indata))
    
}
    
main()