import HitBox from '../utility/hitbox'

class Character {
  x = 0
  y = 0
  size = 80
  isAttacker = false//  Variable to check if character is attacker
  constructor (x, y) {
    this.x = x
    this.y = y
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
          obstacles: obstacles,
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
  move (dx, dy, obstacles, board) {
    let myHitBoxes = this.hitBoxes()
    let isColliding = obstacles.some(
      (o) => o.hitBoxes().some(
        (hitBox) => myHitBoxes.some(
          (myHitBox) => myHitBox.collidesWith(hitBox)
        )
      )
    )
    if (!isColliding) {
      this.x += dx
      this.y += dy
    }
    this.moveOntoBoard(board)
  }
  moveOntoBoard (board) {
    if (this.x < 0) this.x = 0
    if (this.x > board.xTiles) this.x = board.xTiles
    if (this.y < 0) this.y = 0
    if (this.y > board.yTiles) this.y = board.yTiles
  }
  willCollide (obstacles) {
    let offset = 1
    return obstacles.some(
      (o) => o.hitBoxes().some(
        (h1) => this.hitBoxes().some((h2) => {
          let offseth1 = new HitBox(h1.x1 - offset, h1.x2 + offset, h1.y1 - offset, h1.y2 + offset)
          if (offseth1.collidesWith(h2)) {
            return true
          }
          return false
        })
      )
    )
  }
}

export default Character
