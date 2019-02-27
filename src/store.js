import Vue from 'vue'
import Vuex from 'vuex'
import esper from 'esper.js/dist/esper'

Vue.use(Vuex)

class Character {
  x = 0
  y = 0
  size = 80
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  moveOntoBoard (board) {
    if (this.x < 0) this.x = 0
    if (this.x > board.xTiles) this.x = board.xTiles
    if (this.y < 0) this.y = 0
    if (this.y > board.yTiles) this.y = board.yTiles
  }
}

class Zombie extends Character {
  update ({ ticks, board }) {
    // make the entity follow the border of the playing field
    let result = Zombie.userFunctions.move.execute({
      me: this,
      board: board,
      entities: null, // TODO
    })
    //console.log(Zombie.userFunctions.move.userCode)
    //console.log(result)
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
    let xTiles = board.xTiles
    let yTiles = board.yTiles
    let closeCover = 0.8
    let farCover = 0.4
    let start = 0
    let end = 0.9

    let realY = sketch.height - (this.y * (end - start) * (sketch.height / yTiles))
    let realX = ((this.x - (xTiles / 2)) * (closeCover + (((farCover - closeCover) / yTiles) * this.y)) + ((xTiles / 2))) * (sketch.width / xTiles)
    let perspectiveSize = this.size * (closeCover + (((farCover - closeCover) / yTiles) * this.y))
    let changeFactor = perspectiveSize / img.width

    sketch.image(img, realX - (this.size / 2), realY - (img.height * changeFactor), img.width * changeFactor, img.height * changeFactor)
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
      execute ({ me, entities, board }) { // TODO
        let code = 'let response = {\n' +
          '          north: \'north\',\n' +
          '          south: \'south\',\n' +
          '          west: \'west\',\n' +
          '          east: \'east\',\n' +
          '          stop: \'stop\',\n' +
          '          rotate: \'rotate\'\n' +
          '        };\n' +
          '        let a = function (x, y) {\n' +
          '          ' + this.userCode + '\n' +
          '        };\n' +
          '        a(' + me.x + ', ' + me.y + ');'
        let result = esper.eval(code)
        if (result == null) return 'stop'
        return result
      },
    },
  }
}

class FireBat extends Character {
  update ({ userFunctions, board, entities, ticks }) {}
  draw ({ board, sketch }) {}
  static userFunctions = {
    move: {
      cn: 'Move',
      name: 'move',
      description: 'Move the zombie',
      parameters: ['x', 'y'],
      userCode: '\t// Skriv din kod här',
    },
    shoot: {
      cn: 'Skjut',
      name: 'shoot',
      description: 'Shoot over the zombie',
      parameters: ['x', 'y'],
      userCode: '\t// Skriv din kod här',
    },
  }
}

export default new Vuex.Store({
  state: {
    entities: [
      new Zombie(3, 0),
    ],
    characters: {
      zombie: Zombie,
      fireBat: FireBat,
    },
  },
  getters: {
    getUserCode: state => (character, f) => {
      return state.characters[character].userFunctions[f]
    },
    getEntities: state => state.entities,
    getUserFunctions: state => (character) => {
      return state.characters[character].userFunctions
    },
    getCharacters: state => state.characters,
  },
  mutations: {
    setUserCode (state, { character, f, code }) {
      Vue.set(state.characters[character].userFunctions[f], 'userCode', code)
    },
  },
  actions: {},
})

// helper function to call user code
