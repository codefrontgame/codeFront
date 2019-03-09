import Character from './character'
import esper from 'esper.js/dist/esper'
import { objectDefinition, functionDefinition, callDefinition } from '@/utility/esper.js'
import { displayCoordinates } from '@/utility/graphics'

class Zombie extends Character {
  isAttacker = true
  update ({ ticks, board, level, obstacles }) {
    let result = Zombie.userFunctions(level).move.execute({
      me: this,
      board: board,
      entities: null, // TODO
    })
    Zombie.userFunctions(level)['move'].actuate({ me: this, board, ticks, result, obstacles })
  }
  draw ({ sketch, assets, board }) {
    let img = assets['zombie']
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    let changeFactor = this.size * coordinates.perspective / img.width
    sketch.image(img, coordinates.x - (this.size * coordinates.perspective / 2), coordinates.y - (img.height * changeFactor), img.width * changeFactor, img.height * changeFactor)
  }
  static image = 'assets/zombie.png'
  static userFunctionsMap = {
    0: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Move the zombie',
        parameters: [],
        userCode: '\t  return response.north;',
        actuate ({ me, board, ticks, result }) {
          // make the entity follow the border of the playing field
          let change = 1 * ticks
          switch (result) {
            case 'rotate':
              if (me.x <= 0 && me.y >= board.yTiles) {
                me.x += change
              } else if (me.x <= 0) {
                me.y += change
              } else if (me.y >= board.yTiles && me.x >= board.xTiles) {
                me.y -= change
              } else if (me.y >= board.yTiles) {
                me.x += change
              } else if (me.y <= 0 && me.x >= board.xTiles) {
                me.x -= change
              } else if (me.x >= board.xTiles) {
                me.y -= change
              } else if (me.y <= 0) {
                me.x -= change
              }
              break
            case 'north':
              me.y += change
              break
            case 'west':
              me.x -= change
              break
            case 'south':
              me.y -= change
              break
            case 'east':
              me.x += change
              break
          }

          me.moveOntoBoard(board)
        },
        execute ({ me, entities, board }) {
          let code = objectDefinition('response', {
            north: 'north',
            south: 'south',
            west: 'west',
            east: 'east',
            stop: 'stop',
            rotate: 'rotate',
          })
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name)
          let result = esper.eval(code)
          if (result == null) return 'stop'
          return result
        },
      },
    },
    1: {
      move: {
        cn: 'Gå',
        name: 'move',
        description: 'Move the zombie',
        parameters: ['willCollide'],
        userCode: '\t  return response.north;',
        actuate ({ me, board, ticks, result, obstacles }) {
          // make the entity follow the border of the playing field
          let change = 1 * ticks
          let isColliding = false
          switch (result) {
            case 'rotate':
              if (me.x <= 0 && me.y >= board.yTiles) {
                me.x += change
              } else if (me.x <= 0) {
                me.y += change
              } else if (me.y >= board.yTiles && me.x >= board.xTiles) {
                me.y -= change
              } else if (me.y >= board.yTiles) {
                me.x += change
              } else if (me.y <= 0 && me.x >= board.xTiles) {
                me.x -= change
              } else if (me.x >= board.xTiles) {
                me.y -= change
              } else if (me.y <= 0) {
                me.x -= change
              }
              break
            case 'north':
              for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i]
                if (obs.isInside(me.x, me.y + change)) {
                  isColliding = true
                }
              }
              break
            case 'west':
              for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i]
                if (obs.isInside(me.x - change, me.y)) {
                  isColliding = true
                }
              }
              break
            case 'south':
              for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i]
                if (obs.isInside(me.x, me.y - change)) {
                  isColliding = true
                }
              }
              break
            case 'east':
              for (let i = 0; i < obstacles.length; i++) {
                let obs = obstacles[i]
                if (obs.isInside(me.x + change, me.y)) {
                  isColliding = true
                }
              }
              break
          }
          if (!isColliding) {
            Zombie.move(result, me, change)
          }
          me.moveOntoBoard(board)
        },
        execute ({ me, entities, board }) {
          let code = objectDefinition('response', {
            north: 'north',
            south: 'south',
            west: 'west',
            east: 'east',
            stop: 'stop',
            rotate: 'rotate',
          })
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name, false) // Beräknade värdet på willCollide
          let result = esper.eval(code)
          if (result == null) return 'stop'
          return result
        },
      },
    },
  }
  static userFunctions (level) {
    let functions = {}
    let functionLevels = Object.keys(this.userFunctionsMap).sort()
    for (let fl in functionLevels) {
      if (this.userFunctionsMap.hasOwnProperty(fl)) {
        if (fl > level) return functions
        functions = {
          ...functions,
          ...this.userFunctionsMap[fl],
        }
      }
    }
    return functions
  }
  static move (direction, me, change) {
    switch (direction) {
      case 'north':
        me.y += change
        break
      case 'west':
        me.x -= change
        break
      case 'south':
        me.y -= change
        break
      case 'east':
        me.x += change
        break
    }
  }
}

export default Zombie
