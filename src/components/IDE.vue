<template>
<div class="ide">
  <div>
    <div v-for="(func, id) in characters[selectedCharacterId].functions" :key="id">
      <function-editor
              :description="func.description"
              :function-name="func.name"
              :userCode.sync="func.userCode"
              :parameters="func.parameters"
              :shown="func.shown"
              v-on:toggle="onToggle"></function-editor>
    </div>
    <button @click="run" class="button">Run code</button>
    <br>
    <span v-if="lastResult !== ''">Resultat: {{ lastResult }}</span>
  </div>
  <character-selector :characters="characters" v-on:selectCharacter="this.onSelectCharacter"></character-selector>
</div>

</template>

<script>
import CharacterSelector from '@/components/CharacterSelector'
import esper from 'esper.js/dist/esper'
import FunctionEditor from '@/enteties/FunctionEditor'

export default {
  name: 'IDE',
  components: { CharacterSelector, FunctionEditor },
  data () {
    return {
      lastResult: '',
      userCode: '\t// Skriv din kod här',
      characters: [
        {
          id: 0,
          name: 'firebat',
          image: 'assets/firebat.png',
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
          name: 'zombie',
          image: 'assets/zombie.png',
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
      selectedCharacterId: 0,
    }
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
