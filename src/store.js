import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Character {
  x = 0
  y = 0
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class Zombie extends Character {
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
    setUserCode (state, { character, f, userCode }) {
      Vue.set(state.characters[character].userFunctions[f], 'userCode', userCode)
    },
  },
  actions: {},
})

// helper function to call user code
