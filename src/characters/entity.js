import RectangularObstacle from './rectangular-obstacle'
import HitBox from '../utility/hitbox'
import { displayCoordinates } from '../utility/graphics'

/**
 * An Entity is a game object that can interact with it's surroundings
 * on the game board in addition to taking up space.
 */
export default class Entity extends RectangularObstacle {
  /**
   * The health of the character.
   * @type {number}
   */
  health

  /**
   * Variable to check if character is attacker
   * @type {boolean}
   */
  isAttacker

  constructor (x, y, width, depth, initHealth) {
    super(x, y, width, depth)
    this.health = initHealth
  }

  /**
   * Behavioural update method of the entity.
   * @param ticks How much time that has passed since last update
   * @param board A game board defining boundaries for movement
   * @param level The current level
   * @param obstacles Obstacles on the board
   */
  update ({ ticks, board, level, obstacles }) {
    throw new Error('\'update\' not implemented')
  }

  draw ({ sketch, assets, board }) {
    super.draw({ sketch, assets, board })
    let img = this.getAsset(assets)
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    // Scaling for the image
    let changeFactor = this.size * coordinates.perspective / img.width

    sketch.textAlign(sketch.CENTER, sketch.BOTTOM)
    sketch.textSize(30)

    sketch.text(Math.round(this.health), coordinates.x, coordinates.y - (img.height * changeFactor * this.imageAnchor.y))
  }

  /**
   * Checks whether the character will collide with a list of obstacles
   * in the near future.
   * @param {Array} obstacles: the list of obstacles to check collition with
   * @returns {boolean} the character will collide in the near future
   */
  willCollide (obstacles) {
    let offset = 0.1
    return obstacles.some(
      (o) => o.hitBoxes().some(
        (h1) => this.hitBoxes().some((h2) => {
          let offseth1 = new HitBox(h1.x1 - offset, h1.x2 + offset, h1.y1 - offset, h1.y2 + offset)
          return offseth1.collidesWith(h2)
        })
      )
    )
  }

  /**
   * Initiates a combat sequence
   * @param attack An attack object
   */
  takeDamage (attack) {
    this.health -= attack.dmg
  }
}
