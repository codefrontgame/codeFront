import Character from './character'
import { functionDefinition, callDefinition, enumDefinition, engine } from '@/utility/esper.js'
import moveActuator from '@/utility/actuators/move'

export default class Zombie extends Character {
  imageAnchor = {
    x: 0.5,
    y: 0.73,
  }

  getAsset (assets) {
    return assets[Zombie.assetPaths[0]]
  }

  static assetPaths = [
    'assets/test.svg',
  ]

  static avatar = 'assets/zombie.png'

  static userFunctionsMap = {
    0: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. Istället för north kan man skriva ' +
          'east, west eller south',
        parameters: [],
        error: null,
        userCode: '\treturn Response.NORTH',
        originalUserCode: '\treturn Response.NORTH',
        actuate: moveActuator,
        execute ({ me, entities, board }) {
          let code = enumDefinition('Response', {
            NORTH: 'north',
            SOUTH: 'south',
            WEST: 'west',
            EAST: 'east',
            STOP: 'stop',
            ROTATE: 'rotate',
          })
          let preFunctionLines = code.split('\n').length - 1
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name)
          try {
            let result = engine.evalSync(code).native
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
    1: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['willCollide'],
        error: null,
        userCode: '\tif (willCollide):\n' +
          '\t\treturn Response.NORTH\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: '\tif (willCollide) {\n' +
          '\t\treturn Response.NORTH;\n' +
          '\t} else {\n' +
          '\t\treturn Response.NORTH;\n' +
          '\t}',
        actuate: moveActuator,
        execute ({ me, entities, board, obstacles }) {
          let code = enumDefinition('Response', {
            NORTH: 'north',
            SOUTH: 'south',
            WEST: 'west',
            EAST: 'east',
            STOP: 'stop',
            ROTATE: 'rotate',
          })
          let preFunctionLines = code.split('\n').length - 1
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name, me.willCollide(obstacles) ? 'True' : 'False')
          try {
            let result = engine.evalSync(code).native
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
