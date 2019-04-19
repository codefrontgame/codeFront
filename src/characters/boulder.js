import RectangularObstacle from './rectangular-obstacle'
import { drawHitbox } from '../utility/graphics'

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

  groundDraw ({ sketch, assets, board }) {
    super.groundDraw({ sketch, assets, board })
    /* this.hitBoxes().forEach((hitbox) => {
      drawHitbox(sketch, board, hitbox)
    })
    */
  }
}
