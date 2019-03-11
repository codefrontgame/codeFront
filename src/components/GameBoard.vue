<template>
<div class="game-board">
  <vue-p5
    @setup="setup"
    @draw="draw"
    @preload="preload"
  ></vue-p5>
</div>
</template>

<script>
import VueP5 from 'vue-p5'

export default {
  name: 'GameBoard',
  data () {
    return {
      assets: [], // Graphical assets (sprites)
      fr: 36, // Framerate aim
      board: { // Game board definition
        xTiles: 10, // Width
        yTiles: 15, // Height
        closeHCover: 0.91, // How much of the width the board covers in the close end
        farHCover: 0.55, // How much of the width the board covers in the far end
        start: 0.085, // Where the board starts, given in percentage from the bottom
        end: 0.71, // Where the board ends, given in percentage from the bottom
      },
    }
  },
  computed: {
    entities () {
      return this.$store.getters['getEntities']
    },
    obstacles () {
      return this.$store.getters['getObstacles']
    },
  },
  components: {
    VueP5,
  },
  methods: {
    /**
     * Run before loading all sketch assets
     * Asynchronously loads all assets
     * @param sketch The p5.js sketch object
     */
    preload (sketch) {
      // List assets
      let assets = [
        { name: 'zombie', path: 'assets/test.svg' },
        { name: 'background', path: 'assets/background.png' },
        { name: 'rock', path: 'assets/rock.svg' },
      ]

      // Load assets
      assets.forEach(({ name, path }) => {
        this.assets[name] = sketch.loadImage(
          path,
          () => console.log('Loaded ' + name + ' asset'),
          (err) => console.log('Failed to load ' + name, err)
        )
      })
    },
    /**
     * Run before first draw loop
     * Creates the canvas and sets p5 options
     * @param sketch The p5.js sketch object
     */
    setup (sketch) {
      sketch.setFrameRate(this.fr)
      // Cover 100 % of height
      sketch.createCanvas(sketch.windowHeight * 0.86, sketch.windowHeight)
      sketch.background(200)
    },
    /**
     * Check if player has won
     * Returns true if all attackers has reached the far end of the board
     * @return Boolean value
     */
    hasWon () {
      return this.entities.filter((e) => e.isAttacker).every((e) => e.y + 0.1 >= this.board.yTiles)
    },
    /**
     * The p5.js draw loop
     * Is used as general game loop
     * @param sketch The p5.js sketch object
     */
    draw (sketch) {
      // Reset canvas with background image
      sketch.background(this.assets['background'])

      // Get the current framerate
      let fr = sketch.getFrameRate()
      // Sometimes the sketch return a 0 framerate, if that's the case, use aim framerate
      fr = fr === 0 ? this.fr : fr

      // Update all entities if the game is running
      if (this.$store.getters['getRunStatus']) {
        try { // Abort if there is an error in the user code
          for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update({
              sketch: sketch,
              ticks: 1 / fr,
              board: this.board,
              level: this.$store.getters['getLevel'],
              obstacles: this.obstacles,
            })
          }
        } catch (e) {
          console.log('User error: ', e)
          this.$store.commit('setRunStatus', false) // Stop game
        }
      }

      // Redraw all entities and obstacles
      let drawables = this.entities.concat(this.obstacles)
      drawables.sort((a, b) => b.y - a.y)
      for (let i = 0; i < drawables.length; i++) {
        drawables[i].draw({
          sketch: sketch,
          assets: this.assets,
          ticks: 1 / fr,
          board: this.board,
        })
      }

      // Check win condition and increase level
      if (this.hasWon()) {
        this.$store.commit('incLevel')
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
