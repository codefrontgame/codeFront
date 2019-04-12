import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie'
import FireBat from '@/characters/firebat'
import levels from '@/levels'
import clone from '@/utility/clone'
import Boulder from '@/characters/boulder'
import Character from './characters/character'
import WoodenTower from './characters/wooden-tower'
import Book from '@/book'

Vue.use(Vuex)

let initialGameObjects = [ // List of all game objects
  Zombie,
  FireBat,
  Boulder,
  WoodenTower,
]

export default new Vuex.Store({
  state: {
    running: false, // Whither game is running or not
    entities: clone(levels[0].entities), // Entities currently on thr gameboard
    levels, // List of all levels
    level: 0, // The current level
    book: Book,
    selectedChapter: null,
    selectedPage: null,
    gameObjects: initialGameObjects,
    userFunctions: getFunctions(initialGameObjects, 0), // works as a cache
  },
  getters: {
    getRunStatus: state => state.running,
    getEntities: state => state.entities,
    getUserFunctions: (state) => state.userFunctions,
    getGameObjects: state => state.gameObjects,
    getCharacters: state => state.gameObjects.filter(Obj => (new Obj()) instanceof Character),
    getLevelObstacles: state => state.levels[state.level].obstacles,
    getLevel: state => state.level,
    bookChapters: state => Object.keys(state.book),
    bookPages: state => {
      let chapter = state.book[state.selectedChapter]
      if (chapter == null) return []
      return Object.keys(chapter)
    },
    bookPage: state => {
      let chapter = state.book[state.selectedChapter]
      if (chapter == null) return ''
      let page = chapter[state.selectedPage]
      if (page == null) return ''
      return page
    },
    selectedPage: state => state.selectedPage,
    selectedChapter: state => state.selectedChapter,
    getHelpTexts: state => state.levels[state.level].helpTexts,
  },
  mutations: {
    setUserCode (state, { character, f, code }) {
      character = state.gameObjects.find(obj => obj.name === character)
      Vue.set(character.userFunctions(state.level)[f], 'userCode', code)
      Vue.set(state, 'userFunctions', getFunctions(state.gameObjects, state.level))
    },
    resetUserCode (state, { character, f }) {
      character = state.gameObjects.find(obj => obj.name === character)
      let func = character.userFunctions(state.level)[f]
      Vue.set(func, 'userCode', func.originalUserCode)
      Vue.set(state, 'userFunctions', getFunctions(state.gameObjects, state.level))
    },
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
    selectedPage (state, page) {
      Vue.set(state, 'selectedPage', page)
    },
    selectedChapter (state, chapter) {
      Vue.set(state, 'selectedPage', null)
      Vue.set(state, 'selectedChapter', chapter)
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
