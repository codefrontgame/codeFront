<template>
  <div class="level-transition" v-if="recentlyCompleted != null">
    <h3>Bra jobbat!</h3>
    <p>Du klarade nivå {{recentlyCompleted}}</p>
  </div>
</template>

<script>
export default {
  name: 'LevelTransition',
  data () {
    return {
      recentlyCompleted: null,
    }
  },
  computed: {
    level () {
      return this.$store.getters.getLevel
    },
  },
  watch: {
    level (val) {
      if (val !== 0) {
        this.recentlyCompleted = val
        setTimeout(() => {
          if (this.recentlyCompleted === val) {
            this.recentlyCompleted = null
          }
        }, 2000)
      }
    },
  },
}
</script>

<style scoped lang="scss">
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
</style>
