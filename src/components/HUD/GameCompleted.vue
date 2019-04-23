<template>
  <div class="game-completed" v-if="gameCompleted">
    <h3>Grymt jobbat!</h3>
    <p>Du har nu klarat av alla nivåer som finns!</p>
    <!--<button class="button"
            @click="clickRestart">
      Börja om
    </button>-->
  </div>
</template>

<script>
export default {
  name: 'GameCompleted',
  data () {
    return {
      gameCompleted: true,
    }
  },
  methods: {
    clickRestart () {
      this.$store.commit('setLevel', 0)
      this.$store.commit('gameCompleted', false)
    },
  },
  computed: {
    completed () {
      return this.$store.getters.gameCompleted
    },
  },
  watch: {
    completed (val, old) {
      this.gameCompleted = val
    },
  },
}
</script>

<style scoped lang="scss">
  .game-completed {
    position: absolute;
    left: 27.5vh;
    top: 200px;
    height: 200px;
    width: 300px;
    background-color: rgba(180,180,180,0.7);
    text-align: center;
    // text-shadow: -1px 1px black;
    padding: 70px 10px 10px;
    border-style: outset;
    border-radius: 3px;
    border-width: thick;
    border-color: palegoldenrod;
    color: black;
  }
</style>
