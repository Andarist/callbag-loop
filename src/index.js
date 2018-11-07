export default function loop(stepper, seed) {
  return source => (start, sink) => {
    if (start !== 0) return

    source(0, (type, data) => {
      if (type !== 1) {
        sink(type, data)
        return
      }

      const result = stepper(seed, data)
      seed = result[0]
      sink(1, result[1])
    })
  }
}
