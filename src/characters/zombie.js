import Character from './character'
import esper from 'esper.js/dist/esper'
import 'esper.js/plugins/lang-python'
import { objectDefinition, functionDefinition, callDefinition, enumDefinition } from '@/utility/esper.js'
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
          let code = 'from enum import Enum\n'
          code += enumDefinition('response', {
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
          console.log(code)
          try {
            esper.plugin('lang-python')
            let engine = esper({
              language: 'python',
            })
            let result = engine.load(code)
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
        userCode: '\tif (willCollide) {\n' +
          '\t\treturn response.north;\n' +
          '\t} else {\n' +
          '\t\treturn response.north;\n' +
          '\t}',
        originalUserCode: '\tif (willCollide) {\n' +
          '\t\treturn response.north;\n' +
          '\t} else {\n' +
          '\t\treturn response.north;\n' +
          '\t}',
        actuate: moveActuator,
        execute ({ me, entities, board, obstacles }) {
          let code = objectDefinition('response', {
            north: 'north',
            south: 'south',
            west: 'west',
            east: 'east',
            stop: 'stop',
            rotate: 'rotate',
          })
          let willCollide = me.willCollide(obstacles)
          let preFunctionLines = code.split('\n').length - 1
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name, willCollide)
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
