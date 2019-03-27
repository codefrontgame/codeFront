import Entity from './entity'

export default class WoodenTower extends Entity {
  imageAnchor = {
    x: 0.5,
    y: 0.6,
  }

  isAttacker = false

  /**
   * The range from the Wooden Tower within which other entities takes damage.
   * @type {number}
   */
  damageRange = 4

  attackDamage = 10

  update ({ ticks, board, level, obstacles, entities }) {
    let dist = (x1, y1, x2, y2) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }
    entities.forEach((e) => {
      if (e === this) return
      if (dist(e.x, e.y, this.x, this.y) <= this.damageRange) {
        e.takeDamage({ dmg: this.attackDamage * ticks })
      }
    })
  }

  getAsset (assets) {
    return assets[WoodenTower.assetPaths[0]]
  }

  static assetPaths = [
    'assets/wooden-tower.svg',
  ]
}
