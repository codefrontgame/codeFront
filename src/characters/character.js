class Character {
  x = 0
  y = 0
  size = 80
  isAttacker = false
  originalX = 0
  originalY = 0
  constructor (x, y, isAttacker) {
    this.x = x
    this.y = y
    this.isAttacker = isAttacker
    this.originalX = x
    this.originalY = y
  }
  moveOntoBoard (board) {
    if (this.x < 0) this.x = 0
    if (this.x > board.xTiles) this.x = board.xTiles
    if (this.y < 0) this.y = 0
    if (this.y > board.yTiles) this.y = board.yTiles
  }
  resetPos () {
    this.x = this.originalX
    this.y = this.originalY
  }
}

export default Character
