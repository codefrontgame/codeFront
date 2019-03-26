import Character from './character'
import esper from 'esper.js/dist/esper'
import { objectDefinition, functionDefinition, callDefinition } from '@/utility/esper.js'
import { displayCoordinates } from '@/utility/graphics'
import HitBox from '../utility/hitbox'
import moveActuator from '@/utility/actuators/move'

class Zombie extends Character {
  shadowSize = 0.27 // Percentage sprite that only is shadow
  isAttacker = true
  hitBoxes () {
    return [
      new HitBox(
        this.x - 0.20,
        this.x + 0.20,
        this.y - 0.10,
        this.y + 0.10,
      ),
    ]
  }
  draw ({ sketch, assets, board }) {
    let img = assets['zombie']
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    // Scaling for the image
    let changeFactor = this.size * coordinates.perspective / img.width

    let notShadow = (1 - this.shadowSize) // Percentage of sprite that's not shadow
    sketch.image(
      img,
      coordinates.x - (img.width * changeFactor / 2), // make sure the feet of the character touches the coordinate
      coordinates.y - (img.height * changeFactor * notShadow), // make sure the feet of the character touches the coordinate
      img.width * changeFactor,
      img.height * changeFactor
    )
  }
  static image = 'assets/zombie.png'
  static userFunctionsMap = {
    0: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
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

export default Zombie
