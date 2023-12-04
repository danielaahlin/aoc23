const { readFile } = require('../fileparser')

const validGame = (totalRevealed) => totalRevealed.red <= 12 && totalRevealed.green <= 13 && totalRevealed.blue <= 14

const getTotalRevealed = (rawGameDataString) => {
  const totalRevealed = {
    red: 0,
    green: 0,
    blue: 0
  }

  // eslint-disable-next-line no-unused-vars
  const [_gameString, rawGameData] = rawGameDataString.split(':')
  const gameData = rawGameData.split(/[,;]/)

  gameData.forEach(item => {
    const [amountStr, color] = item.trim().split(' ')
    const amount = parseInt(amountStr)

    if(totalRevealed[color] < amount) {
      totalRevealed[color] = amount
    }
  })

  return totalRevealed
}

const problem1 = (indata) => {
  let sum = 0

  indata.forEach((dp, i) => {
    const totalRevealed = getTotalRevealed(dp)

    if(validGame(totalRevealed)){
      sum += i +1
    }
  })
  
  return sum
}

const problem2 = (indata) => {
  let sum = 0

  indata.forEach(dp => {
    const totalRevealed = getTotalRevealed(dp)

    const power = totalRevealed.red * totalRevealed.green * totalRevealed.blue
    sum += power
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