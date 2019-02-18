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
      entities: [
        {
          // x, y is middle of foot base
          x: 0, // 0 - xTiles
          y: 0, // 0 - yTiles
          size: 80,
          dx: 0.2,
          draw ({ sketch, assets, self}) {
            let img = assets['zombie']
            let xTiles = 10
            let yTiles = 15
            let closeCover = 0.8
            let farCover = 0.4
            let start = 0
            let end = 0.9

            let realY = sketch.height - (this.y * (end - start) * (sketch.height / yTiles))
            let realX = ((this.x - (xTiles / 2)) * (closeCover + (((farCover - closeCover) / yTiles) * this.y)) + ((xTiles / 2))) * (sketch.width / xTiles)
            let perspectiveSize = this.size * (closeCover + (((farCover - closeCover) / yTiles) * this.y))
            let changeFactor = perspectiveSize / img.width

            sketch.image(img, realX - (this.size / 2), realY - (img.height * changeFactor), img.width * changeFactor, img.height * changeFactor)
          },
          update ({ ticks, self }) {
            // make the entity follow the border of the playing field
            let change = 1 * ticks
            if (this.x <= 0 && this.y >= 15) {
              this.x += change
            } else if (this.x <= 0) {
              this.y += change
            } else if (this.y >= 15 && this.x >= 10) {
              this.y -= change
            } else if (this.y >= 15) {
              this.x += change
            } else if (this.y <= 0 && this.x >= 10) {
              this.x -= change
            } else if (this.x >= 10) {
              this.y -= change
            } else if (this.y <= 0) {
              this.x -= change
            }
          },
        },
      ],
    }
  },
  components: {
    VueP5,
  },
  methods: {
    preload (sketch) {
      this.assets['zombie'] = sketch.loadImage('assets/test.svg', () => console.log('yay'), (err) => console.log(err))
    },
    setup (sketch) {
      sketch.setFrameRate(this.fr)
      sketch.createCanvas(sketch.windowHeight * 0.86, sketch.windowHeight)
      sketch.background(200)
    },
    draw (sketch) {
      // Reset canvas
      sketch.background(200)
      let fr = sketch.getFrameRate()
      fr = fr === 0 ? this.fr : fr

      // console.log(fr)
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].update({
          sketch: sketch,
          ticks: 1 / fr,
        })
      }
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].draw({
          sketch: sketch,
          assets: this.assets,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
