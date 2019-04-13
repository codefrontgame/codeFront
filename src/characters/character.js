import Entity from '@/characters/entity'

/**
 * A Character is a player controlled entity that exists on the game board. All
 * Characters are therefore attackers and have User Functions. They also have an
 * avatar that is used to represent the Character in the character selection
 * part of the program.
 */
export default class Character extends Entity {
  /**
   * All Characters are controlled by the player and are therefore attackers.
   * @type {boolean}
   */
  isAttacker = true

  /**
   * Returns the current set of userFunctions given the current level
   * @param level The current level
   */
  static userFunctions (level) {
    let functions = {}

    // Find levels that introduce new functions
    let functionLevels = Object.keys(this.userFunctionsMap)
      .sort(function (a, b) { return a - b })
    for (let fl of functionLevels) {
      if (this.userFunctionsMap.hasOwnProperty(fl)) {
        if (fl > level) break // Exit loop when we have added current level
        // Redefine the function object, overwriting the previous keys with the new ones
        functions = {
          ...functions,
          ...this.userFunctionsMap[fl],
        }
      }
    }
    return functions
  }
  /**
   * Behavioural update method of the character. Runs all user functions
   * @param ticks How much time that has passed since last update
   * @param board A game board defining boundaries for movement
   * @param level The current level
   * @param obstacles Obstacles on the board
   */
  update ({ ticks, board, level, obstacles }) {
    // Grab all user functions for this level
    let functions = this.constructor.userFunctions(level)
    for (let name in functions) {
      if (functions.hasOwnProperty(name)) {
        let fun = functions[name]

        // Get the result of the user function
        let result = fun.execute({
          me: this,
          board: board,
          entities: null, // TODO
          obstacles: obstacles,
        })

        // Take action according to the result
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

  /**
   * Utility function to move a character
   * Will prevent character from moving into an obstacle or leaving the game board
   * @param dx Distance to move
   * @param dy Distance to move
   * @param obstacles Obstacles where we can not move
   * @param board A game board defining boundaries for movement
   */
  move (dx, dy, obstacles, board) {
    this.x += dx
    this.y += dy

    // Check collision with obstacles
    let myHitBoxes = this.hitBoxes()
    let isColliding = obstacles.some(
      (o) => o.hitBoxes().some(
        (hitBox) => myHitBoxes.some(
          (myHitBox) => myHitBox.collidesWith(hitBox)
        )
      )
    )

    // Make sure the character doesnt move outside the board
    if (
      this.x < 0 ||
      this.x > board.xTiles ||
      this.y < 0 ||
      this.y > board.yTiles
    ) isColliding = true

    // Revert movement if it resulted in collision
    if (isColliding) {
      this.x -= dx
      this.y -= dy
    }
  }

  /**
   * The path to the image that is used to represent the character in the
   * character selector.
   */
  avatar
}
