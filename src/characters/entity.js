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
    this.showHealth({ sketch, assets, board })
  }

  /**
   * Displays the health of the entity on top of the entity.
   * @param sketch p5js sketch object
   * @param assets the list of assets loaded into the canvas
   * @param board the game board definition
   */
  showHealth ({ sketch, assets, board }) {
    let img = this.getAsset(assets)
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    // Scaling for the image
    let changeFactor = this.size * coordinates.perspective / img.width

    sketch.textAlign(sketch.CENTER, sketch.BOTTOM)
    sketch.textSize(30)
    sketch.strokeWeight(0)
    sketch.stroke(0)

    sketch.text(
      Math.round(this.health),
      coordinates.x,
      coordinates.y - (img.height * changeFactor * this.imageAnchor.y)
    )
  }

  /**
   * Checks whether the character will collide with a list of obstacles
   * in the near future.
   * @param {Array} obstacles: the list of obstacles to check collision with
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
   * Checks whether the character is in front of a obstacle of type obstacleType.
   * @param {Array} obstacles: the list of obstacles to check collision with
   * @param {prototype} obstacleType: the type of obstacle to check
   * @returns {boolean} the character will collide in the near future
   */
  isInFrontOf (obstacleType, obstacles) {
    let offset = 0.1
    return obstacles.some(
      (o) => o.hitBoxes().some((h1) => {
        if (!(o instanceof obstacleType)) return false
        return this.hitBoxes().some((h2) => {
          let h1WithOffset = new HitBox(h1.x1, h1.x2, h1.y1 - offset, h1.y2)
          return h1WithOffset.collidesWith(h2)
        })
      })
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
