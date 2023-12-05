import fs from 'fs'

type MapTypes =
  | 'seed-to-soil'
  | 'soil-to-fertilizer'
  | 'fertilizer-to-water'
  | 'water-to-light'
  | 'light-to-temperature'
  | 'temperature-to-humidity'
  | 'humidity-to-location'

type Mapper = {
  srcStart: number
  srcEnd: number
  destStart: number
}

const mapBuilder = (data: string[], type: MapTypes) => {
  const startIndex = data.findIndex((value) => value.includes(type))
  const endIndex =
    data.slice(startIndex).findIndex((value) => value === '') + startIndex
  const map: Mapper[] = []

  for (let i = startIndex + 1; i < endIndex; i += 1) {
    const [destRangeStart, srcRangeStart, rangeLength] = data[i]
      .split(' ')
      .map((value) => parseInt(value))

    map.push({
      srcStart: srcRangeStart,
      srcEnd: srcRangeStart + rangeLength - 1,
      destStart: destRangeStart,
    })
  }

  return map
}

const findLocation = (value: number, maps: Mapper[][], index: number): any => {
  const stop = index >= maps.length - 1

  const valueInRange = maps[index].find(
    (map) => value >= map.srcStart && value <= map.srcEnd
  )

  if (valueInRange) {
    const val = value - valueInRange.srcStart + valueInRange.destStart

    return stop ? val : findLocation(val, maps, index + 1)
  }

  return stop ? value : findLocation(value, maps, index + 1)
}

const getMaps = (data: string[]) => {
  const seedToSoilMap = mapBuilder(data, 'seed-to-soil')
  const soilToFertilizerMap = mapBuilder(data, 'soil-to-fertilizer')
  const fertilizerToWaterMap = mapBuilder(data, 'fertilizer-to-water')
  const waterToLightMap = mapBuilder(data, 'water-to-light')
  const lightToTemperatureMap = mapBuilder(data, 'light-to-temperature')
  const temperatureToHumidityMap = mapBuilder(data, 'temperature-to-humidity')
  const humidityToLocationMap = mapBuilder(data, 'humidity-to-location')

  return [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  ]
}

const problem1 = (data: string[]) => {
  const seeds = data[0].match(/\d+/g)?.map((value) => parseInt(value))
  const maps = getMaps(data)

  const locations = seeds
    ?.map((seed) => findLocation(seed, maps, 0))
    .sort((a, b) => (a < b ? -1 : 1))

  return locations?.[0]
}

const problem2 = (data: string[]) => {
  const maps = getMaps(data)

  let location = Infinity

  const start = new Date().getTime()

  data[0].match(/\d+/g)?.forEach((value, i, array) => {
    if (i % 2 === 0) {
      const startNumber = parseInt(value)
      const range = parseInt(array[i + 1])

      for (let i = 0; i < range; i += 1) {
        const tmpLocation = findLocation(startNumber + i, maps, 0)

        if (tmpLocation < location) {
          location = tmpLocation
        }
      }
    }
  })

  const elapsed = new Date().getTime() - start
  console.log('Elapsed time: ', elapsed)

  return location
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
