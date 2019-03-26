import HitBox from '../utility/hitbox'

class Character {
  // Position of the character. Indicates where the character touches the ground
  x = 0
  y = 0
  health = 100
  size = 80
  isAttacker = false //  Variable to check if character is attacker
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  /**
   * Returns the current set of userFunctions given the current level
   * @param level The current level
   */
  static userFunctions (level) {
    let functions = {}

    // Find levels that introduce new functions
    let functionLevels = Object.keys(this.userFunctionsMap).sort()

    for (let fl in functionLevels) {
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
  takeDamage(attack) {
    this.health -= attack.dmg
  }
}

export default Character
