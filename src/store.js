import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie.js'
import FireBat from '@/characters/firebat.js'

Vue.use(Vuex)

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
