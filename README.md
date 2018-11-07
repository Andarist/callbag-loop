# callbag-loop

Callbag operator that accumulates results using a feedback loop that emits one value and feeds back another to be used in the next iteration.

It allows you to maintain and update a “state” (a.k.a. feedback, a.k.a. seed for the next iteration) while emitting a different value. In contrast, [scan](https://github.com/staltz/callbag-scan) feeds back and produces the same value.

Inspired by [most.js's loop](https://mostcore.readthedocs.io/en/latest/api.html#loop).

## Example

```js
import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import loop from 'callbag-loop'
import pipe from 'callbag-pipe'

const add = (a, b) => a + b
const average = values => values.reduce(add, 0) / values.length

pipe(
  fromIter([10, 20, 60, 20, 5, 150, 3, 80]),
  loop((seed, value) => {
    seed.push(value)
    seed = seed.slice(-4)
    return [seed, average(seed)]
  }, []),
  forEach(avg => {
    // will log 10, 15, 30, 27.5, 26.25, 58.75, 44.5, 59.5
    console.log(avg)
  }),
)
```
