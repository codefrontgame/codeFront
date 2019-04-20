import RectangularObstacle from './rectangular-obstacle'

export default class Boulder extends RectangularObstacle {
  size //= 100

  constructor (x, y, size) {
    super(x, y, 0.012 * size, 0.007 * size)
    this.size = size
  }
  imageAnchor = {
    x: 0.5,
    y: 0.78,
  }

  getAsset (assets) {
    return assets[Boulder.assetPaths[0]]
  }

  static assetPaths = [
    'assets/rock.svg',
  ]
}
