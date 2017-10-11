export class Tree {
  setProperties (data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key]
    })
  }
}
