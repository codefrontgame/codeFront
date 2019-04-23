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
    level (val, old) {
      if (val !== 0) {
        this.recentlyCompleted = old
        setTimeout(() => {
          if (this.recentlyCompleted === old) {
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
    background-color: floralwhite;
    text-align: center;
    padding: 70px 10px 10px;
    border-style: double;
    border-radius: 0px;
    border-width: thick;
    border-color: goldenrod;
    color:darkslategrey;
  }
</style>
