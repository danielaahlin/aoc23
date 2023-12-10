import fs from 'fs'

const findSequences = (values: number[], sequences: number[][]): any => {
  const differences: number[] = values
    .slice(0, values.length - 1)
    .map((value, index) => values[index + 1] - value)

  const diffSum = differences.every((value) => value === 0)

  sequences.push(differences)

  if (!diffSum) {
    return findSequences(differences, sequences)
  }

  return differences
}

const problem1 = (data: string[]) => {
  const historyValues: number[][] = data.map(
    (values) => values.match(/-\d+|\d+/g)?.map((value) => parseInt(value))
  ) as number[][]

  const sequences = historyValues.map((values) => {
    const tmpSequences: number[][] = []
    findSequences(values, tmpSequences)

    return [values, ...tmpSequences]
  })

  const sequenceValues: number[] = sequences.map((sequence) =>
    sequence.reduceRight((acc, current) => acc + current[current.length - 1], 0)
  )

  return sequenceValues.reduce((acc, current) => acc + current, 0)
}

const problem2 = (data: string[]) => {
  const historyValues: number[][] = data.map(
    (values) => values.match(/-\d+|\d+/g)?.map((value) => parseInt(value))
  ) as number[][]

  const sequences = historyValues.map((values) => {
    const tmpSequences: number[][] = []
    findSequences(values, tmpSequences)

    return [values, ...tmpSequences]
  })

  const sequenceValues: number[] = sequences.map((sequence) =>
    sequence.reduceRight((acc, current) => current[0] - acc, 0)
  )

  return sequenceValues.reduce((acc, current) => acc + current, 0)
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
