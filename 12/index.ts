import fs from 'fs'

const generate = (
  toFill: number,
  permutations: string[],
  pattern: string[],
  unknowns: number[],
  cache: { [key: string]: any }
): any => {
  if (cache[pattern.join('')]) {
    return cache[pattern.join('')]
  }

  if (toFill === 0 && pattern.includes('?')) {
    const newPattern = pattern.slice(0)
    newPattern[pattern.findIndex((value) => value === '?')] = '.'

    return (cache[pattern.join('')] = generate(
      0,
      permutations,
      newPattern,
      unknowns,
      cache
    ))
  } else if (toFill === 0) {
    if (!permutations.includes(pattern.join(''))) {
      permutations.push(pattern.join(''))
    }

    return (cache[pattern.join('')] = pattern.join(''))
  } else {
    unknowns.forEach((u, i) => {
      const newPattern = pattern.slice(0)
      newPattern[u] = '#'

      const newUnknowns = Array.from(unknowns)
      newUnknowns.splice(i, 1)

      return (cache[pattern.join('')] = generate(
        toFill - 1,
        permutations,
        newPattern,
        newUnknowns,
        cache
      ))
    })
  }
}

const problem1 = (data: string[]) => {
  const permutations = data.map((value, i) => {
    const splittedString = value.split(' ')

    const pattern = splittedString[0].split('')
    const conditions = splittedString[1].split(',').map((v) => parseInt(v))
    const permutations: string[] = []

    const nbrConditions = conditions.reduce((acc, current) => acc + current, 0)

    const amountKnown = pattern.reduce(
      (acc, current) => (current === '#' ? acc + 1 : acc),
      0
    )
    const unknowns = pattern
      .map((value, i) => (value === '?' ? i : null))
      .filter((value) => value !== null) as number[]

    const regex = new RegExp(
      conditions.reduce(
        (acc, value, i) =>
          acc + `\#{${value}}${i === conditions.length - 1 ? '' : '(.{1,}?)'}`,
        ''
      ),
      'g'
    )

    const cache = {}
    generate(
      nbrConditions - amountKnown,
      permutations,
      pattern,
      unknowns,
      cache
    )

    console.log(i + 1)

    return permutations.filter((p) => p.match(regex))
  })

  return permutations.reduce((acc, current) => acc + current.length, 0)
}

const problem2 = (data: string[]) => {
  const permutations = data.map((value, i) => {
    const splittedString = value.split(' ')

    const originalPattern = splittedString[0]
    const pattern = Array.from({ length: 5 }).flatMap((_v, i) =>
      i < 4 ? [...originalPattern.split(''), '?'] : originalPattern.split('')
    )

    const conditions = Array.from({ length: 5 }).flatMap(() =>
      splittedString[1].split(',').map((v) => parseInt(v))
    )

    const permutations: string[] = []

    const nbrConditions = conditions.reduce((acc, current) => acc + current, 0)

    const amountKnown = pattern.reduce(
      (acc, current) => (current === '#' ? acc + 1 : acc),
      0
    )
    const unknowns = pattern
      .map((value, i) => (value === '?' ? i : null))
      .filter((value) => value !== null) as number[]

    const regex = new RegExp(
      conditions.reduce(
        (acc, value, i) =>
          acc + `\#{${value}}${i === conditions.length - 1 ? '' : '(.{1,}?)'}`,
        ''
      ),
      'g'
    )

    const cache = {}
    generate(
      nbrConditions - amountKnown,
      permutations,
      pattern,
      unknowns,
      cache
    )

    console.log(i + 1)

    return permutations.filter((p) => p.match(regex))
  })

  return permutations.reduce((acc, current) => acc + current.length, 0)
}

const main = () => {
  const data = fs.readFileSync('./test.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  // console.log('Solution to problem 2: ', problem2(data))
}

main()
