import fs from 'fs'

const transpose = (array: string[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]))
}

const expandUniverse = (data: string[][], expandFactor: number) => {
  const expandedRows = transpose(
    data.flatMap((row) =>
      row.includes('#')
        ? [row]
        : Array.from({ length: expandFactor }).map(() => row)
    )
  )

  const expandedFull = expandedRows.flatMap((col) =>
    col.includes('#')
      ? [col]
      : Array.from({ length: expandFactor }).map(() => col)
  )

  return transpose(expandedFull)
}

const findGalaxies = (universe: string[][]) => {
  return universe.flatMap((row, rowIndex) => {
    const colIndices = row
      .map((colValue, index) => (colValue === '#' ? index : null))
      .filter((value) => value !== null)

    return colIndices.map((colIndex) => ({
      row: rowIndex,
      col: colIndex as number,
    }))
  })
}

const getShortestPaths = (galaxies: { row: number; col: number }[]) => {
  let sum = 0

  galaxies.forEach((galaxy, i, galaxyArray) => {
    sum += galaxyArray
      .slice(i + 1)
      .reduce(
        (acc, current) =>
          acc +
          (Math.abs(galaxy.row - current.row) +
            Math.abs(galaxy.col - current.col)),
        0
      )
  })

  return sum
}

const problem1 = (data: string[]) => {
  const expanded = expandUniverse(
    data.map((value) => value.split('')),
    2
  )
  const galaxies = findGalaxies(expanded)

  return getShortestPaths(galaxies)
}

const problem2 = (data: string[]) => {
  const splitData = data.map((value) => value.split(''))

  const expandedRows = splitData
    .map((row, index) => (!row.includes('#') ? index : null))
    .filter((value) => value !== null) as number[]
  const expandedCols = transpose(splitData)
    .map((col, index) => (!col.includes('#') ? index : null))
    .filter((value) => value !== null) as number[]

  const expandFactor = 1000000 - 1

  const galaxies = findGalaxies(splitData)
  const expandedGalaxies = galaxies.map((galaxy) => {
    const row =
      galaxy.row +
      expandedRows.filter((r) => r < galaxy.row).length * expandFactor
    const col =
      galaxy.col +
      expandedCols.filter((r) => r < galaxy.col).length * expandFactor

    return { row, col }
  })

  return getShortestPaths(expandedGalaxies)
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
