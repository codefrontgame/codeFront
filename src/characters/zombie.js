import Character from './character'
import esper from 'esper.js/dist/esper'
import { objectDefinition, functionDefinition, callDefinition } from '@/utility/esper.js'
import { displayCoordinates } from '@/utility/graphics'

class Zombie extends Character {
  shadowSize = 0.27 // Percentage sprite that only is shadow
  isAttacker = true
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
        description: 'Move the zombie',
        parameters: [],
        error: null,
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
        description: 'Move the zombie',
        parameters: ['willCollide'],
        error: null,
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
          let preFunctionLines = code.split('\n').length - 1
          code += functionDefinition(this.name, this.parameters, this.userCode)
          code += callDefinition(this.name, false) // Beräknade värdet på willCollide
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
