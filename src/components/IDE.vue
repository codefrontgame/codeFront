<template>
<div class="ide">
  <div>
    <character-functions
      :character-key="selectedCharacterId"
    />
    <button @click="run">Run code</button>
    <br>
    <span v-if="lastResult !== ''">Resultat: {{ lastResult }}</span>
  </div>
  <!--<character-selector :characters="characters" v-on:selectCharacter="this.onSelectCharacter"></character-selector>-->
</div>

</template>

<script>
import esper from 'esper.js/dist/esper'
import { mapGetters } from 'vuex'
import CharacterFunctions from './CharacterFunctions'

export default {
  name: 'IDE',
  components: { CharacterFunctions },
  data () {
    return {
      lastResult: '',
      userCode: '\t// Skriv din kod här',
      characterss: [
        {
          id: 0,
          name: 'Gurgy',
          functions: [
            {
              name: 'move',
              description: 'Move',
              parameters: ['x', 'y'],
              userCode: '\t// Skriv din kod här',
              shown: false,
            },
            {
              name: 'shoot',
              description: 'Shoot',
              parameters: ['entity'],
              userCode: '\t// Skriv din kod här',
              shown: false,
            },
            {
              name: 'heal',
              description: 'Heal',
              parameters: ['entity'],
              userCode: '\t// Skriv din kod här',
              shown: false,
            },
          ],
        },
        {
          id: 1,
          name: 'Mårdhor',
          functions: [
            {
              name: 'move',
              description: 'Move',
              parameters: ['x', 'y'],
              userCode: '\t// Skriv din kod här',
              shown: false,
            },
          ],
        },
      ],
      selectedCharacterId: 'zombie',
    }
  },
  computed: {
    ...mapGetters({
      characters: 'getCharacters',
    }),
  },
  methods: {
    run () {
      try {
        let code = this.functions.map(f => f.userCode).join('\n')
        this.lastResult = esper.eval(code)
      } catch (e) {
        console.log(e)
      }
    },
    onToggle (functionName) {
      for (let i = 0; i < this.characters[this.selectedCharacterId].functions.length; i++) {
        this.characters[this.selectedCharacterId].functions[i].shown = this.characters[this.selectedCharacterId].functions[i].name === functionName
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
</style>
