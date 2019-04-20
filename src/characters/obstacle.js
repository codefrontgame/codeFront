import GameObject from '@/characters/game-object'
import { drawHitbox } from '../utility/graphics'

/**
 * An obstacle is a GameObject that has a hitbox and therefore
 * occupies a space on the GameBoard.
 */
export default class Obstacle extends GameObject {
  /**
   * The hitboxes used to describe the Object
   * @returns {Array} of hitboxes
   */
  hitBoxes () {
    throw new Error('hitBoxes() not implemented')
  }

  groundDraw ({ sketch, assets, board }) {
    super.groundDraw({ sketch, assets, board })
    if (process.env.VUE_APP_SHOW_HITBOXES === 'true') {
      this.hitBoxes().forEach((hitbox) => drawHitbox(sketch, board, hitbox))
    }
  }
}
