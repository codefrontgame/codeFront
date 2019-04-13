import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie'
import FireBat from '@/characters/firebat'
import levels from '@/levels'
import clone from '@/utility/clone'
import Boulder from '@/characters/boulder'
import Character from './characters/character'
import WoodenTower from './characters/wooden-tower'
import Log from './characters/log'

let startLevel = 0 // Setting this greater than 0 breaks the initial user code at the moment

Vue.use(Vuex)

let initialGameObjects = [ // List of all game objects
  Zombie,
  FireBat,
  Boulder,
  Log,
  WoodenTower,
]

export default new Vuex.Store({
  state: {
    running: false, // Whither game is running or not
    entities: clone(levels[startLevel].entities), // Entities currently on thr gameboard
    levels, // List of all levels
    level: startLevel, // The current level
    gameObjects: initialGameObjects,
    userFunctions: getInitialFunctions(initialGameObjects, startLevel), // works as a cache
  },
  getters: {
    getRunStatus: state => state.running,
    getEntities: state => state.entities,
    getUserFunctions: (state) => state.userFunctions,
    getGameObjects: state => state.gameObjects,
    getCharacters: state => state.gameObjects.filter(Obj => (new Obj()) instanceof Character),
    getLevelObstacles: state => state.levels[state.level].obstacles,
    getLevel: state => state.level,
  },
  mutations: {
    setUserCode (state, { character, f, code }) {
      character = state.gameObjects.find(obj => obj.name === character)
      Vue.set(character.userFunctions(state.level)[f], 'userCode', code)
      Vue.set(state, 'userFunctions', getFunctions(state.gameObjects, state.level))
    },
    resetUserCode: resetUserCode,
    incLevel (state) {
      // Stop game
      Vue.set(state, 'running', false)
      // Increase level
      Vue.set(state, 'level', state.level + 1)
      // Populate with entities
      // Make sure to clone the initial entities
      Vue.set(state, 'entities', clone(state.levels[state.level].entities))

      // Update functions
      Vue.set(state, 'userFunctions', getFunctions(state.gameObjects, state.level))

      // Sets initial userCode to originalUserCode
      setInitialUserCode(state)
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

function getFunctions (gameObjects, level) {
  let functions = {}
  let characters = gameObjects.filter(Obj => (new Obj()) instanceof Character)
  for (let i = 0; i < characters.length; i++) {
    functions[characters[i].name] = characters[i].userFunctions(level)
  }
  return functions
}

function resetUserCode (state, { character, f }) {
  character = state.gameObjects.find(obj => obj.name === character)
  let func = character.userFunctions(state.level)[f]
  Vue.set(func, 'userCode', func.originalUserCode())
  Vue.set(state, 'userFunctions', getFunctions(state.gameObjects, state.level))
}

function setInitialUserCode (state) {
  let characters = state.gameObjects.filter(Obj => (new Obj()) instanceof Character)
  characters.forEach((C) => {
    Object.keys(C.userFunctions(state.level)).forEach((k) => resetUserCode(state, { character: C.name, f: k }))
  })
}

function getInitialFunctions (gameObjects, level) {
  let functions = getFunctions(gameObjects, level)
  let characters = gameObjects.filter(Obj => (new Obj()) instanceof Character)
  characters.forEach((C) => {
    Object.keys(functions[C.name]).forEach((f) => {
      let func = functions[C.name][f]
      func.userCode = func.originalUserCode()
    })
  })
  return functions
}
