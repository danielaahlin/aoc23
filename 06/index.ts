import fs from 'fs'

type Races = {
  times: number[]
  distances: number[]
}

const getLowestHoldTime = (time: number, distance: number) => {
  let speed = 0

  for (let t = 0; t < time; t += 1) {
    speed = t
    const remainingTime = time - t

    if (speed * remainingTime > distance) {
      return t
    }
  }

  return 0
}

const problem1 = (data: string[]) => {
  const races: Races = {
    times: [],
    distances: [],
  }

  data.forEach((dp, i) => {
    const values = dp.match(/\d+/g)?.map((value) => parseInt(value)) as number[]

    races[i === 0 ? 'times' : 'distances'] = values
  })

  let product = 1

  const nbrRaces = races.times.length
  for (let i = 0; i < nbrRaces; i += 1) {
    const time = races.times[i]
    const distance = races.distances[i]

    const lowestHoldTime = getLowestHoldTime(time, distance)

    const nbrWaysToWin = lowestHoldTime * 2 + 1

    product *= nbrWaysToWin
  }

  return product
}

const problem2 = (data: string[]) => {
  const races: Races = {
    times: [],
    distances: [],
  }

  data.forEach((dp, i) => {
    const values = dp.match(/\d+/g)?.reduce((acc, current) => acc + current)

    races[i === 0 ? 'times' : 'distances'] = [parseInt(values as string)]
  })

  const holdTime = getLowestHoldTime(races.times[0], races.distances[0])

  return races.times[0] - holdTime * 2 + 1
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
