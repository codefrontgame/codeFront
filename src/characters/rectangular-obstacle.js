import Obstacle from '@/characters/obstacle'
import HitBox from '@/utility/hitbox'

export default class RectangularObstacle extends Obstacle {
  /**
   * The width of the hitbox on the logical coordinate grid.
   * @type {number}
   */
  width

  /**
   * The depth of the hitbox on the logical coordinate grid.
   * @type {number}
   */
  depth

  constructor (x, y, width, depth) {
    super(x, y)
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
