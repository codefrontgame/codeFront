<template>
<div class="ide">
  <div>
    <character-functions
      :character-key="selectedCharacterId"
    />
    <button class="button" @click="run">Run code</button>
    <br>
    <span v-if="lastResult !== ''">Resultat: {{ lastResult }}</span>
  </div>
  <character-selector :selected.sync="selectedCharacterId" />
</div>

</template>

<script>
import esper from 'esper.js/dist/esper'
import { mapGetters } from 'vuex'
import CharacterFunctions from './CharacterFunctions'
import CharacterSelector from './CharacterSelector'

export default {
  name: 'IDE',
  components: { CharacterFunctions, CharacterSelector },
  data () {
    return {
      lastResult: '',
      selectedCharacterId: 'zombie',
    }
  },
  computed: {
    ...mapGetters({
      characters: 'getCharacters',
    }),
  },
  methods: {
    run () { // legacy example
      try {
        let code = this.functions.map(f => f.userCode).join('\n')
        this.lastResult = esper.eval(code)
      } catch (e) {
        console.log(e)
      }
    },
    onToggle (functionName) {
      for (let i = 0; i < this.characters[this.selectedCharacterId].functions.length; i++) {
        let characterFunction = this.characters[this.selectedCharacterId].functions[i]
        if (characterFunction.name === functionName) {
          characterFunction.shown = !characterFunction.shown
        }
      }
    },
    onSelectCharacter (id) {
      console.log(id)
      this.selectedCharacterId = id
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
</style>
