class Layer {
  constructor(name, type = 'group', parent = null){
    this.name = name,
    this.type = type
    this.parent = parent
  }

  // get name() {
  //   return this.name
  // }

  // get parent() {
  //   return this.parent
  // }
}

export default Layer