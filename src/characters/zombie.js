import Character from '@/characters/character'
import { functionDefinition, callDefinition, enumDefinition, engine } from '@/utility/esper.js'
import moveActuator from '@/utility/actuators/move'
import Boulder from '@/characters/boulder'
import Log from '@/characters/log'
import WoodenTower from './wooden-tower'

export default class Zombie extends Character {
  constructor (x, y, size, initHealth) {
    super(x, y, 0.009 * size, 0.007 * size, initHealth)
    this.size = size
  }

  imageAnchor = {
    x: 0.5,
    y: 0.63,
  }

  getAsset (assets) {
    return assets[Zombie.assetPaths[0]]
  }

  static assetPaths = [
    'assets/zombie.svg',
  ]

  static avatar = 'assets/zombie.png'

  static userFunctionsMap = {
    0: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return Response.NORTH. Istället för NORTH kan man skriva ' +
          'EAST, WEST eller SOUTH',
        parameters: [],
        error: null,
        userCode: null,
        originalUserCode: () => '\treturn Response.NORTH',
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name)
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
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
        parameters: ['isInFrontOfRock'],
        error: null,
        userCode: '\tif isInFrontOfRock:\n' +
          '\t\treturn Response.NORTH\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => '\tif isInFrontOfRock:\n' +
          '\t\treturn Response.NORTH\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name, me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False')
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    2: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfLog:\n' +
          '\t\treturn Response.NORTH\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[1].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False'
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    3: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfLog or isInFrontOfRock:\n' +
          '\t\treturn Response.NORTH\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[2].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False'
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    4: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfLog:\n' +
          '\t\treturn Response.EAST\n' +
          '\telif isInFrontOfRock:\n' +
          '\t\treturn Response.WEST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[3].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False'
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    5: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfLog:\n' +
          '\t\treturn Response.EAST\n' +
          '\telif isInFrontOfRock:\n' +
          '\t\treturn Response.WEST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[4].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False'
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    10: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog', 'isInFrontOfTower'],
        error: null,
        userCode: '\tif isInFrontOfLog:\n' +
          '\t\treturn Response.EAST\n' +
          '\telif isInFrontOfRock:\n' +
          '\t\treturn Response.WEST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[5].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False',
            me.isInFrontOf(WoodenTower, obstacles) ? 'True' : 'False' // TODO: Should check Tower super class
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    11: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog', 'isInFrontOfTower'],
        error: null,
        userCode: '\tif isInFrontOfLog:\n' +
          '\t\treturn Response.EAST\n' +
          '\telif isInFrontOfRock:\n' +
          '\t\treturn Response.WEST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[10].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False',
            me.isInFrontOf(WoodenTower, obstacles) ? 'True' : 'False' // TODO: Should check Tower super class
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
    12: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få zombien att röra sig ända till slutet av fältet. För att säga åt zombien vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog', 'isInFrontOfTower'],
        error: null,
        userCode: '\tif isInFrontOfTower:\n' +
          '\t\treturn Response.EAST\n' +
          '\telif isInFrontOfRock:\n' +
          '\t\treturn Response.WEST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[11].move.userCode,
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
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(
            this.name,
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False',
            me.isInFrontOf(Log, obstacles) ? 'True' : 'False',
            me.isInFrontOf(WoodenTower, obstacles) ? 'True' : 'False' // TODO: Should check Tower super class
          )
          try {
            let result = engine.evalSync(code).native
            if (result == null) return 'stop'
            this.error = null
            return result
          } catch (e) {
            this.error = e
            throw e
          }
        },
      },
    },
  }
}
