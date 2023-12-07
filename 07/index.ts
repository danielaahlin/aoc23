import fs from 'fs'

type Hand = {
  hand: string
  bid: number
  handStrength: number
}

const CARD_STRENGTH: { [key: string]: number } = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
}

const CARD_STRENGTH_JOKER: { [key: string]: number } = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
}

// Five 6, four 5, house 4, three 3, two pair 2, pair 1, high card 0
const getHandStrength = (hand: string, joker: boolean = false) => {
  const handMapper: { [key: string]: number } = {}

  for (let i = 0; i < hand.length; i += 1) {
    const c = hand[i]
    handMapper[c] = handMapper[c] ? handMapper[c] + 1 : 1
  }

  let maxValue = 0
  let values: number[] = []

  if (joker && hand.includes('J')) {
    values = Object.keys(handMapper)
      .map((key) => (key !== 'J' ? handMapper[key] : null))
      .filter(Boolean) as number[]
    values.sort((a, b) => b - a)
    maxValue = values.length > 0 ? values[0] + handMapper['J'] : handMapper['J']
  } else {
    values = Object.values(handMapper).sort((a, b) => b - a)
    maxValue = values[0]
  }

  if (maxValue === 2) {
    // Values length === 3 indicates two pair
    return values.length === 3 ? 2 : 1
  } else if (maxValue === 3) {
    // Values length === 2 indicates full house
    return values.length === 2 ? 4 : 3
  }

  return maxValue > 3 ? maxValue + 1 : 0
}

const findStrongerHand = (aHand: Hand, bHand: Hand, joker: boolean) => {
  for (let i = 0; i < aHand.hand.length; i += 1) {
    const aHandStrength = joker
      ? CARD_STRENGTH_JOKER[aHand.hand[i]]
      : CARD_STRENGTH[aHand.hand[i]]
    const bHandStrength = joker
      ? CARD_STRENGTH_JOKER[bHand.hand[i]]
      : CARD_STRENGTH[bHand.hand[i]]

    if (aHandStrength !== bHandStrength) {
      return aHandStrength < bHandStrength ? -1 : 1
    }
  }

  return 0
}

const sortHands = (hands: Hand[], joker: boolean = false) => {
  return hands.sort((a, b) => {
    if (a.handStrength === b.handStrength) {
      return findStrongerHand(a, b, joker)
    }

    return a.handStrength - b.handStrength
  })
}

const problem1 = (data: string[], joker: boolean = false) => {
  const hands = data.map((value) => {
    const [hand, bid] = value.split(' ')
    const handStrength = getHandStrength(hand, joker)

    return {
      hand,
      bid: parseInt(bid),
      handStrength,
    }
  })

  const sortedHands = sortHands(hands, joker)

  return sortedHands.reduce(
    (acc, curr, index) => acc + curr.bid * (index + 1),
    0
  )
}

const problem2 = (data: string[]) => {
  return problem1(data, true)
}

const main = () => {
  const data = fs.readFileSync('./input.txt').toString().split('\n')

  console.log('Solution to problem 1: ', problem1(data))
  console.log('Solution to problem 2: ', problem2(data))
}

main()
