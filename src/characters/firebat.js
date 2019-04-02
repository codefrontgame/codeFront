import Character from '@/characters/character'
import esper from 'esper.js/dist/esper'
import { objectDefinition, functionDefinition, callDefinition } from '@/utility/esper.js'
import moveActuator from '@/utility/actuators/move'

export default class FireBat extends Character {
  imageAnchor = {
    x: 0.5,
    y: 0.73,
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
          let code = objectDefinition('response', {
            north: 'north',
            south: 'south',
            west: 'west',
            east: 'east',
            stop: 'stop',
            rotate: 'rotate',
          })
          let preFunctionLines = code.split('\n').length - 1
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name)
          try {
            let result = esper.eval(code)
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            e.lineNumber -= preFunctionLines
            this.error = e
            throw e
          }
        },
      },
    },
  }
}
