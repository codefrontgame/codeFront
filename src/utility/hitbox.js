/**
 * Class representing a hitBox
 */
export default class HitBox {
  /**
   * Constructor for square hitBox
   * @param x1 {number} x coordinate for corner 1
   * @param x2 {number} x coordinate for corner 2
   * @param y1 {number} y coordinate for corner 1
   * @param y2 {number} y coordinate for corner 2
   */
  constructor (x1, x2, y1, y2) {
    this.x1 = x1 < x2 ? x1 : x2
    this.x2 = x1 < x2 ? x2 : x1

    this.y1 = y1 < y2 ? y1 : y2
    this.y2 = y1 < y2 ? y2 : y1
  }

  /**
   * Test if this hitbox collides with another hitBox
   * @param hitbox {HitBox} other hitBox to test with
   * @return {boolean}
   */
  collidesWith (hitbox) {
    // return true if collision in both x and y
    let xCollision = this.constructor.linesCollide(this.x1, this.x2, hitbox.x1, hitbox.x2)
    let yCollision = this.constructor.linesCollide(this.y1, this.y2, hitbox.y1, hitbox.y2)
    return xCollision && yCollision
  }

  /**
   * Helper method to see if two lines collide
   * @param a1 point 1 of one-dimensional line a
   * @param a2 point 2 of one-dimensional line a
   * @param b1 point 1 of one-dimensional line b
   * @param b2 point 2 of one-dimensional line b
   * @return {boolean}
   */
  static linesCollide (a1, a2, b1, b2) {
    return a1 <= b2 && b1 <= a2
  }
}
