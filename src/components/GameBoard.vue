<template>
<div class="game-board">
  <div v-if="completedLevel != null" class="level-transition">
    <h3>Bra jobbat!</h3>
    <p>Du klarade nivå {{completedLevel}}</p>
  </div>
  <div class="image-container">
    <img src="assets/duck.svg"
         class="duck"
         v-bind:class="{ 'duck-hidden': duckHidden }"
         @click="duckPressed()">
  </div>
  <vue-p5
    @setup="setup"
    @draw="draw"
    @preload="preload"
  ></vue-p5>
  <div class="book-btn" @click="$emit('toggle-book')">
    <font-awesome-icon icon="book" size="3x"/>
  </div>
</div>
</template>

<script>
import VueP5 from 'vue-p5'
import Entity from '@/characters/entity'

export default {
  name: 'GameBoard',
  data () {
    return {
      assets: {}, // Graphical assetPaths (sprites)
      fr: 36, // Framerate aim
      board: { // Game board definition
        xTiles: 10, // Width
        yTiles: 15, // Height
        closeHCover: 0.91, // How much of the width the board covers in the close end
        farHCover: 0.55, // How much of the width the board covers in the far end
        start: 0.085, // Where the board starts, given in percentage from the bottom
        end: 0.71, // Where the board ends, given in percentage from the bottom
      },
      mousePos: {
        x: 0,
        y: 0,
      },
      completedLevel: null,
      duckHidden: false,
      helpTextIndex: 0,
      storyTime: true,
      resize: null, // Function that resizes the canvas when the window size changes
    }
  },
  computed: {
    entities: {
      get () {
        return this.$store.getters['getEntities']
      },
      set (entities) {
        this.$store.commit('setEntities', entities)
      },
    },
    obstacles () {
      return this.$store.getters['getLevelObstacles']
    },
  },
  components: {
    VueP5,
  },
  // bind event handlers to the `handleResize` method (defined below)
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    /**
     * Run before loading all sketch assetPaths
     * Asynchronously loads all assetPaths
     * @param sketch The p5.js sketch object
     */
    preload (sketch) {
      let assets = [
        'assets/background.png',
      ]

      this.$store.getters['getGameObjects'].forEach(
        (o) => o.assetPaths.forEach((p) => assets.push(p))
      )

      assets.forEach((path) => {
        this.assets[path] = sketch.loadImage(
          path,
          () => console.log('Loaded asset: ' + path),
          (err) => console.log('Failed to load asset: ' + path, err)
        )
      })
    },
    /**
     * Run before first draw loop
     * Creates the canvas and sets p5 options
     * @param sketch The p5.js sketch object
     */
    setup (sketch) {
      this.resize = () => sketch.createCanvas(sketch.windowHeight * 0.86, sketch.windowHeight)
      sketch.setFrameRate(this.fr)
      // Cover 100 % of height
      sketch.createCanvas(sketch.windowHeight * 0.86, sketch.windowHeight)
      sketch.background(200)
      this.duckPressed()
    },
    handleResize () {
      this.resize()
    },
    /**
     * Check if player has won
     * Returns true if all attackers has reached the far end of the board
     * @return Boolean value
     */
    hasWon () {
      let attackers = this.entities.filter((e) => e.isAttacker)
      return attackers.every((e) => e.y + 0.1 >= this.board.yTiles) && attackers.length > 0
    },
    hasLost () {
      return this.entities.filter((e) => e.isAttacker).length === 0
    },
    endTransition () {
      this.completedLevel = null
      this.duckHidden = false
      this.duckPressed()
    },
    duckPressed () {
      let helpTexts = this.$store.getters['getHelpTexts']
      if (!this.duckHidden) {
        if (this.helpTextIndex < helpTexts.length && this.helpTextIndex >= 0) {
          this.duckSay()
        } else if (this.helpTextIndex === helpTexts.length) {
          this.helpTextIndex = 0
          this.duckHidden = !this.duckHidden
        }
      } else {
        this.duckHidden = false
        this.duckSay()
      }
    },
    duckSay () {
      let helpTexts = this.$store.getters['getHelpTexts']
      console.log('Duck: ' + helpTexts[this.helpTextIndex])
      this.helpTextIndex++
      if (this.helpTextIndex === helpTexts.length) {
        console.log('DONE')
      }
    },
    /**
     * The p5.js draw loop
     * Is used as general game loop
     * @param sketch The p5.js sketch object
     */
    draw (sketch) {
      // Reset canvas with background image
      sketch.background(this.assets['assets/background.png'])

      let level = this.$store.getters['getLevel']
      sketch.textAlign(sketch.LEFT, sketch.TOP)
      sketch.textSize(42)
      sketch.stroke(0)
      sketch.text('Nivå: ' + level, 10, 10)

      // TODO - Lägg till anka och bok

      // Get the current framerate
      let fr = sketch.getFrameRate()
      // Sometimes the sketch return a 0 framerate, if that's the case, use aim framerate
      fr = fr === 0 ? this.fr : fr

      // Update all entities if the game is running
      if (this.$store.getters['getRunStatus']) {
        try { // Abort if there is an error in the user code
          for (let i = 0; i < this.entities.length; i++) {
            // TODO example of damage dealt
            console.log(this.entities[i])
            this.entities[i].update({
              sketch: sketch,
              ticks: 1 / fr,
              board: this.board,
              level: this.$store.getters['getLevel'],
              obstacles: this.obstacles,
              entities: this.entities,
            })
          }
          // Kill dead entities
          this.entities = this.entities.filter(
            (e) => e instanceof Entity && e.health > 0
          )
        } catch (e) {
          console.log('User error: ', e)
          this.$store.commit('setRunStatus', false) // Stop game
        }
      }

      // Redraw all entities and obstacles
      let drawables = this.entities.concat(this.obstacles)
      drawables.sort((a, b) => b.y - a.y)

      drawables.forEach(
        (d) => d.groundDraw({
          sketch: sketch,
          assets: this.assets,
          ticks: 1 / fr,
          board: this.board,
        }))
      drawables.forEach(
        (d) => d.draw({
          sketch: sketch,
          assets: this.assets,
          ticks: 1 / fr,
          board: this.board,
        }))
      drawables.forEach(
        (d) => d.airDraw({
          sketch: sketch,
          assets: this.assets,
          ticks: 1 / fr,
          board: this.board,
        }))

      // Check win condition and increase level
      if (this.hasWon()) {
        this.completedLevel = this.$store.getters['getLevel']
        setTimeout(this.endTransition, 2000)
        this.$store.commit('incLevel')
      } else if (this.hasLost()) {
        console.log(this.$store.getters['getEntities'])
        this.$store.commit('setRunStatus', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .game-board {
    height: 100vh;
    resize: none;
    overflow: hidden;
    position: relative;
    .book-btn {
      position: absolute;
      bottom: 20px;
      right: 30px;
    }
    .book-btn:hover {
      cursor: pointer;
    }
  }
  .level-transition {
    position: absolute;
    left: 27.5vh;
    top: 200px;
    height: 200px;
    width: 300px;
    background-color: white;
    text-align: center;
    padding-top: 70px;
    border-style: solid;
    border-width: thin;
  }
  .duck {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20vh;
  }
  .duck-hidden {
    bottom: -10vh;
  }
  .image-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20vh;
    height: 20vh;
    overflow: hidden;
  }
</style>
