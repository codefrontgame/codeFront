class Obstacle {
    x = 0
    y = 0
    size = 80
    width = 1
    depth = 1
    constructor (x, y, width, depth) {
      this.x = x
      this.y = y
      this.width = width
      this.depth = depth
    }
    moveOntoBoard (board) {
      if (this.x < 0) this.x = 0
      if (this.x > board.xTiles) this.x = board.xTiles
      if (this.y < 0) this.y = 0
      if (this.y > board.yTiles) this.y = board.yTiles
    }
    isInside (x, y) {
      if (this.x <= x && x <= (this.x + this.width) && this.y <= y && y <= (this.y + this.depth)) {
        return true
      } else {
        return false
      }
    }
}

export default Obstacle
