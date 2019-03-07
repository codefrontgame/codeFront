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
}

export default Character
