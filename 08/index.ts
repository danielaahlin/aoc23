import fs from 'fs'

type NodeStructure = {
  L: string
  R: string
}

type Instruction = 'L' | 'R'

const buildNetwork = (data: string[]) => {
  const nodeNetwork: { [key: string]: NodeStructure } = {}

  data.forEach((value) => {
    const values = value.match(/\w+/g)

    if (values) {
      nodeNetwork[values[0]] = {
        L: values[1],
        R: values[2],
      }
    }
  })

  return nodeNetwork
}

const networkSearch = (
  startNode: string,
  endNodeRegex: RegExp,
  instructions: Instruction[],
  nodeNetwork: {
    [key: string]: NodeStructure
  }
) => {
  let currentNode = startNode
  let step = 0

  while (!currentNode.match(endNodeRegex)) {
    const index: number = step % instructions.length
    const instruction: Instruction = instructions[index]
    const nodeConnections: NodeStructure = nodeNetwork[currentNode]

    currentNode = nodeConnections[instruction]

    step += 1
  }

  return step
}

const gcd = (x: number, y: number): number => {
  if (Math.min(x, y) === 0) {
    return Math.max(x, y)
  }

  return gcd(Math.max(x, y) % Math.min(x, y), Math.min(x, y))
}
const lcm = (x: number, y: number) => {
  return (x * y) / gcd(x, y)
}

const problem1 = (data: string[]) => {
  const instructions = data[0].split('') as Instruction[]

  const nodeNetwork = buildNetwork(data.slice(2))

  return networkSearch('AAA', /ZZZ/g, instructions, nodeNetwork)
}

const problem2 = (data: string[]) => {
  const instructions = data[0].split('') as Instruction[]

  const nodeNetwork = buildNetwork(data.slice(2))
  const startNodes = Object.keys(nodeNetwork).filter((key) =>
    key.match(/[\S]{2}A/g)
  )

  const shortestPaths = startNodes.map((node) =>
    networkSearch(node, /[\S]{2}Z/g, instructions, nodeNetwork)
  )

  return shortestPaths.reduce((acc, current) => lcm(acc, current))
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
