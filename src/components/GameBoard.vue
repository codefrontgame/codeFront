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
      assets: [],
      fr: 36,
      hasWon: false,
      board: {
        xTiles: 10,
        yTiles: 15,
        closeHCover: 0.91,
        farHCover: 0.55,
        start: 0.085,
        end: 0.71,
      },
    }
  },
  computed: {
    entities () {
      return this.$store.getters['getEntities']
    },
    obstacles () {
      return this.$store.getters['getObstacles']
    }
  },
  components: {
    VueP5,
  },
  methods: {
    preload (sketch) {
      this.assets['zombie'] = sketch.loadImage('assets/test.svg', () => console.log('yay'), (err) => console.log(err))
      this.assets['background'] = sketch.loadImage('assets/background.png', () => console.log('yay'), (err) => console.log(err))
      this.assets['rock'] = sketch.loadImage('assets/rock.svg', () => console.log('yay'), (err) => console.log(err))
    },
    setup (sketch) {
      sketch.setFrameRate(this.fr)
      sketch.createCanvas(sketch.windowHeight * 0.86, sketch.windowHeight)
      sketch.background(200)
    },
    draw (sketch) {
      // Reset canvas
      sketch.background(this.assets['background'])
      let fr = sketch.getFrameRate()
      fr = fr === 0 ? this.fr : fr
      if (this.hasWon) {
        this.$store.commit('incLevel')
        this.hasWon = false
      }
      // console.log(fr)
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].update({
          sketch: sketch,
          ticks: 1 / fr,
          board: this.board,
          level: this.$store.getters['getLevel'],
          obstacles: this.$store.getters['getObstacles'],
        })
      }
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].draw({
          sketch: sketch,
          assets: this.assets,
          ticks: 1 / fr,
          board: this.board,
        })
      }
      for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].draw({
          sketch: sketch,
          assets: this.assets,
          board: this.board,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
