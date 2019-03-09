import HitBox from '@/utility/hitbox'

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
  hitBoxes () {
    return [
      new HitBox(
        this.x - this.width / 2,
        this.x + this.width / 2,
        this.y - this.depth / 2,
        this.y + this.depth / 2,
      ),
    ]
  }
}

export default Obstacle
