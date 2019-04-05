import Vue from 'vue'
import Vuex from 'vuex'

import Zombie from '@/characters/zombie'
import FireBat from '@/characters/firebat'
import levels from '@/levels'
import clone from '@/utility/clone'
import Boulder from '@/characters/boulder'
import WoodenTower from './characters/wooden-tower'
import Book from '@/book'

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
      WoodenTower,
    ],
    book: Book,
    selectedChapter: null,
    selectedPage: null,
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
