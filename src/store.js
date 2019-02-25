import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: {
      zombie: {
        userFunctions: {
          move: {
            cn: 'Move',
            userCode: '',
          },
        },
        graphics: { // built from directory structure?
          north: {
            running: [
              // running north frames (preloaded)
            ],
            still: [
              // standing still north frames
            ],
          }, // ...
          mugshot: '', // File
        },
      },
    },
    entities: {
      character: 'zombie', // pointer?
      x: 0,
      y: 0,
      health: 100,
      update ({ userFunctions, board, entities, ticks }) {
        //
      },
      draw ({ board, sketch }) {

      },
    },
    board: {
      // ... properties of the board
    },
  },
  getters: {},
  mutations: {},
  actions: {},
})

// helper function to call user code
