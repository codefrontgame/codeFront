import RectangularObstacle from './rectangular-obstacle'

export default class Log extends RectangularObstacle {
  size //= 100

  static name = 'log' // prototype.name has been buggy
  constructor (x, y, size) {
    super(x, y, 0.0115 * size, 0.008 * size)
    this.size = size
  }

  imageAnchor = {
    x: 0.485,
    y: 0.5,
  }

  getAsset (assets) {
    return assets[Log.assetPaths[0]]
  }

  static assetPaths = [
    'assets/log.svg',
  ]
}
