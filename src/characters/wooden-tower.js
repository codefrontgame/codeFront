import Tower from './tower'

export default class WoodenTower extends Tower {
  size//= 200

  static name = 'wooden-tower' // prototype.name has been buggy
  constructor (x, y, size, initHealth) {
    super(x, y, 0.009 * size, 0.008 * size, initHealth)
    this.size = size
  }

  imageAnchor = {
    x: 0.60,
    y: 0.68,
  }

  /**
   * The range from the Wooden Tower within which other entities takes damage.
   * @type {number}
   */
  damageRange = 4

  /**
   * The damage made per second when dealing damage.
   * @type {number}
   */
  attackDamage = 10

  getAsset (assets) {
    return assets[WoodenTower.assetPaths[0]]
  }

  static assetPaths = [
    'assets/wooden-tower.svg',
  ]
}
