class Character {
  x = 0
  y = 0
  size = 80
  isAttacker = false//  Variable to check if character is attacker
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  moveOntoBoard (board) {
    if (this.x < 0) this.x = 0
    if (this.x > board.xTiles) this.x = board.xTiles
    if (this.y < 0) this.y = 0
    if (this.y > board.yTiles) this.y = board.yTiles
  }
  static userFunctions (level) {
    let functions = {}
    let functionLevels = Object.keys(this.userFunctionsMap).sort()
    for (let fl in functionLevels) {
      if (this.userFunctionsMap.hasOwnProperty(fl)) {
        if (fl > level) return functions
        functions = {
          ...functions,
          ...this.userFunctionsMap[fl],
        }
      }
    }
    return functions
  }
  update ({ ticks, board, level, obstacles }) {
    let functions = this.constructor.userFunctions(level)
    for (let name in functions) {
      if (functions.hasOwnProperty(name)) {
        let fun = functions[name]
        let result = fun.execute({
          me: this,
          board: board,
          entities: null, // TODO
        })
        fun.actuate({
          me: this,
          board,
          ticks,
          result,
          obstacles,
        })
      }
    }
  }
}

export default Character
