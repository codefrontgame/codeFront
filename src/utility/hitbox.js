
export default class HitBox {
  constructor (x1, x2, y1, y2) {
    this.x1 = x1 < x2 ? x1 : x2
    this.x2 = x1 < x2 ? x2 : x1

    this.y1 = y1 < y2 ? y1 : y2
    this.y2 = y1 < y2 ? y2 : y1
  }
  collidesWith (hitbox) {
    let xCollision = this.constructor.linesCollide(this.x1, this.x2, hitbox.x1, hitbox.x2)
    let yCollision = this.constructor.linesCollide(this.y1, this.y2, hitbox.y1, hitbox.y2)
    return xCollision && yCollision
  }
  static linesCollide (a1, a2, b1, b2) {
    return a1 <= b2 && b1 <= a2
  }
}
