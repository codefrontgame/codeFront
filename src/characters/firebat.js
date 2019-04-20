import Character from '@/characters/character'
import moveActuator from '@/utility/actuators/move'

export default class FireBat extends Character {
  size//= 120

  constructor (x, y, size, initHealth) {
    super(x, y, 0.012 * size, 0.0048 * size, initHealth)
    this.size = size
  }
  imageAnchor = {
    x: 0.5,
    y: 0.54,
  }

  isAttacker = true

  getAsset (assets) {
    return assets[FireBat.assetPaths[0]]
  }

  static assetPaths = [
    'assets/firebat.png',
  ]

  static avatar = 'assets/firebat.png'

  static userFunctionsMap = {
    0: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få firebat:en att röra sig ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: [],
        error: null,
        userCode: '\t  return response.north;',
        originalUserCode: '\t  return response.north;',
        actuate: moveActuator,
        execute ({ me, entities, board }) {
          return 'stop'
        },
      },
    },
  }

  groundDraw ({ sketch, assets, board }) {
    super.groundDraw({ sketch, assets, board })
    /* this.hitBoxes().forEach((hitbox) => {
      drawHitbox(sketch, board, hitbox)
    })
    */
  }
}
