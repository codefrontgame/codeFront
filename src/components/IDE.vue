<template>
<div class="ide">
  <div>
    <character-functions
      :character="selectedCharacter"
      :disabled="running"
    />
  </div>
  <character-selector :selected.sync="selectedCharacter" >
    <button class="button" @click="runBtn">{{ runBtnText }}</button>
  </character-selector>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import CharacterFunctions from './CharacterFunctions'
import CharacterSelector from './CharacterSelector'
import Zombie from '../characters/zombie'

export default {
  name: 'IDE',
  components: { CharacterFunctions, CharacterSelector },
  data () {
    return {
      selectedCharacter: Zombie,
    }
  },
  computed: {
    ...mapGetters({
      running: 'getRunStatus',
    }),
    runBtnText () {
      return this.running ? 'Avbryt' : 'Starta'
    },
  },
  methods: {
    runBtn () {
      this.$store.commit('setRunStatus', !this.running)
    },
  },
}
</script>

<style scoped lang="scss">
  .ide {
    display: grid;
    grid-template-columns: auto 100px;
  }
  .button { // Lägger knappen längst ner till höger
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
</style>
