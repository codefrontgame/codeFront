import RectangularObstacle from './rectangular-obstacle'

export default class Boulder extends RectangularObstacle {
  imageAnchor = {
    x: 0.5,
    y: 1,
  }

  getAsset (assets) {
    return assets[Boulder.assetPaths[0]]
  }

  static assetPaths = [
    'assets/rock.svg',
  ]
}
