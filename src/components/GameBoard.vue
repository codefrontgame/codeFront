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
import Entity from '../characters/entity'

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
      }
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
      let attackers = this.entities.filter((e) => e.isAttacker)
      return attackers.every((e) => e.y + 0.1 >= this.board.yTiles) && attackers.length > 0
    },
    hasLost () {
      return this.entities.filter((e) => e.isAttacker).length === 0
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

      // Get the current framerate
      let fr = sketch.getFrameRate()
      // Sometimes the sketch return a 0 framerate, if that's the case, use aim framerate
      fr = fr === 0 ? this.fr : fr

      // Update all entities if the game is running
      if (this.$store.getters['getRunStatus']) {
        try { // Abort if there is an error in the user code
          for (let i = 0; i < this.entities.length; i++) {
            // TODO example of damage dealt
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
        console.log('won!')
        this.$store.commit('incLevel')
      } else if (this.hasLost()) {
        console.log('lost')
        console.log(this.$store.getters['getEntities'])
        this.$store.commit('setRunStatus', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
