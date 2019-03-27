import GameObject from '@/characters/game-object'

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
}
