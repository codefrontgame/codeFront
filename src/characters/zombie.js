import Character from './character'
import esper from 'esper.js/dist/esper'
import { objectDefinition, functionDefinition, callDefinition } from '@/utility/esper.js'
import { displayCoordinates } from '@/utility/graphics'

class Zombie extends Character {
  update ({ ticks, board }) {
    // make the entity follow the border of the playing field
    let result = Zombie.userFunctions.move.execute({
      me: this,
      board: board,
      entities: null, // TODO
    })
    let change = 1 * ticks
    switch (result) {
      case 'rotate':
        if (this.x <= 0 && this.y >= board.yTiles) {
          this.x += change
        } else if (this.x <= 0) {
          this.y += change
        } else if (this.y >= board.yTiles && this.x >= board.xTiles) {
          this.y -= change
        } else if (this.y >= board.yTiles) {
          this.x += change
        } else if (this.y <= 0 && this.x >= board.xTiles) {
          this.x -= change
        } else if (this.x >= board.xTiles) {
          this.y -= change
        } else if (this.y <= 0) {
          this.x -= change
        }
        break
      case 'north':
        this.y += change
        break
      case 'west':
        this.x -= change
        break
      case 'south':
        this.y -= change
        break
      case 'east':
        this.x += change
        break
    }

    this.moveOntoBoard(board)
  }
  draw ({ sketch, assets, board }) {
    let img = assets['zombie']
    let coordinates = displayCoordinates(sketch, board, this.x, this.y)

    let changeFactor = this.size * coordinates.perspective / img.width
    sketch.image(img, coordinates.x - (this.size * coordinates.perspective / 2), coordinates.y - (img.height * changeFactor), img.width * changeFactor, img.height * changeFactor)
  }
  static userFunctions = {
    move: {
      cn: 'Move',
      name: 'move',
      description: 'Move the zombie',
      parameters: ['x', 'y'],
      userCode: '\tif (y < 7) {\n' +
        '\t  return response.north;\n' +
        '\t} else {\n' +
        '\t  return response.east;\n' +
        '\t}',
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
        code += callDefinition(this.name, me.x, me.y)
        let result = esper.eval(code)
        if (result == null) return 'stop'
        return result
      },
    },
  }
}

export default Zombie
