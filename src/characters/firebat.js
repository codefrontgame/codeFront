import Character from '@/characters/character'
import moveActuator from '@/utility/actuators/move'
import { callDefinition, enumDefinition, functionDefinition, engine } from '@/utility/esper'
import Log from '@/characters/log'
import Boulder from './boulder'
import WoodenTower from './wooden-tower'

export default class FireBat extends Character {
  size//= 120

  static name = 'fielbat' // prototype.name has been buggy
  constructor (x, y, size, initHealth, flying) {
    super(x, y, 0.012 * size, 0.0048 * size, initHealth)
    this.size = size
    this.flying = flying
  }
  imageAnchor = {
    x: 0.5,
    y: 0.54,
  }

  flying = false

  getAsset (assets) {
    return assets[FireBat.assetPaths[0]]
  }

  move (dx, dy, obstacles, board) {
    this.x += dx
    this.y += dy

    // Check collision with obstacles
    let myHitBoxes = this.hitBoxes()
    let isColliding = obstacles.some((o) => {
      if (this.flying &&
        (o instanceof Boulder || o instanceof Log)) return false
      return o.hitBoxes().some(
        (hitBox) => myHitBoxes.some(
          (myHitBox) => myHitBox.collidesWith(hitBox)
        )
      )
    })

    // Make sure the character doesnt move outside the board
    if (
      this.x < 0 ||
      this.x > board.xTiles ||
      this.y < 0 ||
      this.y > board.yTiles
    ) isColliding = true

    // Revert movement if it resulted in collision
    if (isColliding) {
      this.x -= dx
      this.y -= dy
    }
  }

  airDraw (parameters) {
    super.draw(parameters)
  }

  draw ({ sketch, assets, board }) { }

  static assetPaths = [
    'assets/firebat.png',
  ]

  static avatar = 'assets/selector/firebat.png'
  static selectedAvatar = 'assets/selector/firebat-selected.png'

  static userFunctionsMap = {
    6: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få firebat:en att röra sig ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock'],
        error: null,
        userCode: '',
        originalUserCode: () => '',
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
            me.isInFrontOf(Boulder, obstacles) ? 'True' : 'False'
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
    7: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få firebat:en att röra sig ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfRock:\n' +
          '\t\treturn Response.EAST',
        originalUserCode: () => this.userFunctionsMap[6].move.userCode,
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
    8: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Få firebat:en att röra sig ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska röra sig åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '\tif isInFrontOfLog or isInFrontOfRock:\n' +
          '\t\treturn Response.EAST\n' +
          '\telse:\n' +
          '\t\treturn Response.NORTH\n',
        originalUserCode: () => this.userFunctionsMap[7].move.userCode,
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
    9: {
      move: {
        cn: 'Flyg',
        name: 'fly',
        description: 'Få firebat:en att flyga ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska flyga åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfRock', 'isInFrontOfLog'],
        error: null,
        userCode: '',
        originalUserCode: () => '',
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
        cn: 'Flyg',
        name: 'fly',
        description: 'Få firebat:en att flyga ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska flyga åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: [],
        error: null,
        userCode: '\treturn Response.NORTH',
        originalUserCode: () => this.userFunctionsMap[9].move.userCode,
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
    11: {
      move: {
        cn: 'Flyg',
        name: 'fly',
        description: 'Få firebat:en att flyga ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska flyga åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfTower'],
        error: null,
        userCode: '\treturn Response.NORTH',
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
            me.isInFrontOf(WoodenTower, obstacles) ? 'True' : 'False'
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
        cn: 'Flyg',
        name: 'fly',
        description: 'Få firebat:en att flyga ända till slutet av fältet. För att säga åt firebat:en vilket håll den ' +
          'ska flyga åt skriver man till exempel return response.north. istället för north kan man skriva ' +
          'east, west eller south',
        parameters: ['isInFrontOfTower'],
        error: null,
        userCode: '\treturn Response.NORTH',
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
            me.isInFrontOf(WoodenTower, obstacles) ? 'True' : 'False'
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
