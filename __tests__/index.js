import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import pipe from 'callbag-pipe'

import loop from '../src'

const add = (a, b) => a + b
const average = values => values.reduce(add, 0) / values.length

test('works', () => {
  const actual = []

  pipe(
    fromIter([10, 20, 60, 20, 5, 150, 3, 80]),
    loop((seed, value) => {
      seed.push(value)
      seed = seed.slice(-4)
      return [seed, average(seed)]
    }, []),
    forEach(data => {
      actual.push(data)
    }),
  )

  expect(actual).toEqual([10, 15, 30, 27.5, 26.25, 58.75, 44.5, 59.5])
})
