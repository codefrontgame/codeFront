<template>
<div class="ide">
  <div>
    <character-functions
      :character-key="selectedCharacterId"
      :disabled="running"
    />
    <button class="button" @click="runBtn">{{ runBtnText }}</button>
    <button class="helpButton" @click="getHelpText">Hjälp</button>
    <br>
  </div>
  <character-selector :selected.sync="selectedCharacterId" />
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import CharacterFunctions from './CharacterFunctions'
import CharacterSelector from './CharacterSelector'

export default {
  name: 'IDE',
  components: { CharacterFunctions, CharacterSelector },
  data () {
    return {
      selectedCharacterId: 'zombie',
    }
  },
  computed: {
    ...mapGetters({
      characters: 'getCharacters',
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
    getHelpText () {
      console.log(this.$store.getters['getHelptexts'])
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
    background-color: forestgreen;
    border: none;
    color: white;
    padding: 12px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  .helpButton { // Placement should be changed
    background-color: forestgreen;
    border: none;
    color: white;
    padding: 12px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    position: absolute;
    bottom: 5px;
    right: 500px;
  }
</style>
