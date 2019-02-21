<template>
<div class="game-board">
  <vue-p5
    @setup="setup"
  ></vue-p5>
</div>
</template>

<script>
import VueP5 from "vue-p5"

export default {
  name: 'GameBoard',
  components: {
    VueP5,
  },
  methods: {
    setup (sketch) {
      sketch.createCanvas(895, sketch.windowHeight)
      sketch.background(220)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
