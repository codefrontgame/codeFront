import RectangularObstacle from './rectangular-obstacle'

export default class Log extends RectangularObstacle {
  imageAnchor = {
    x: 0.5,
    y: 1,
  }

  getAsset (assets) {
    return assets[Log.assetPaths[0]]
  }

  static assetPaths = [
    'assets/log.svg',
  ]
}
