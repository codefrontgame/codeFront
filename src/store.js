import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie'
// import FireBat from '@/characters/firebat'
import levels from '@/levels'
import clone from '@/utility/clone'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: false,
    entities: clone(levels[0].entities),
    levels,
    level: 0,
    characters: {
      zombie: Zombie,
      // fireBat: FireBat,
    },
  },
  getters: {
    getRunStatus: state => state.running,
    getUserCode: state => (character, f) => {
      return state.characters[character].userFunctions(state.level)[f]
    },
    getEntities: state => state.entities,
    getUserFunctions: state => (character) => {
      return state.characters[character].userFunctions(state.level)
    },
    getCharacters: state => state.characters,
    getObstacles: state => state.levels[state.level].obstacles,
    getLevel: state => state.level,
  },
  mutations: {
    setUserCode (state, { character, f, code }) {
      Vue.set(state.characters[character].userFunctions(state.level)[f], 'userCode', code)
    },
    incLevel (state) {
      Vue.set(state, 'running', false)
      Vue.set(state, 'level', state.level + 1)
      Vue.set(state, 'entities', clone(state.levels[state.level].entities))
    },
    setRunStatus (state, status) {
      if (!status) {
        console.log(state.levels[state.level].entities)
        Vue.set(state, 'entities', clone(state.levels[state.level].entities))
      }
      Vue.set(state, 'running', status)
    },
  },
  actions: {},
})

// helper function to call user code
