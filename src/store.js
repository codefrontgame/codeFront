import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie'
import FireBat from '@/characters/firebat'
import levels from '@/levels'
import clone from '@/utility/clone'
import Boulder from '@/characters/boulder'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: false, // Whither game is running or not
    entities: clone(levels[0].entities), // Entities currently on thr gameboard
    levels, // List of all levels
    level: 0, // The current level
    characters: {
      zombie: Zombie,
      fireBat: FireBat,
    },
    gameObjects: [ // List of all game objects
      Zombie,
      FireBat,
      Boulder,
    ],
  },
  getters: {
    getRunStatus: state => state.running,
    getUserCode: (state) => (character, f) => {
      return state.characters[character].userFunctions(state.level)[f]
    },
    getEntities: state => state.entities,
    getUserFunctions: state => (character) => {
      return state.characters[character].userFunctions(state.level)
    },
    getGameObjects: state => state.gameObjects,
    getCharacters: state => state.characters,
    getLevelObstacles: state => state.levels[state.level].obstacles,
    getLevel: state => state.level,
  },
  mutations: {
    setUserCode (state, { character, f, code }) {
      Vue.set(state.characters[character].userFunctions(state.level)[f], 'userCode', code)
    },
    incLevel (state) {
      // Stop game
      Vue.set(state, 'running', false)
      // Increase level
      Vue.set(state, 'level', state.level + 1)
      // Populate with entities
      // Make sure to clone the initial entities
      Vue.set(state, 'entities', clone(state.levels[state.level].entities))
    },
    setRunStatus (state, status) {
      // Reset entities when stopping game
      if (!status) {
        // Make sure to clone the initial entities
        Vue.set(state, 'entities', clone(state.levels[state.level].entities))
      }
      Vue.set(state, 'running', status)
    },
    setEntities (state, entities) {
      Vue.set(state, 'entities', entities)
    },
  },
  actions: {},
})
