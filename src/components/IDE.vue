<template>
<div class="ide">
  <div>
    <div v-for="(func, id) in functions" :key="id">
      <function-editor
              :description="func.description"
              :function-name="func.name"
              :userCode.sync="func.userCode"
              :parameters="func.parameters"
              :shown="func.shown"
              v-on:toggle="onToggle"></function-editor>
    </div>
    <button @click="run">Run code</button>
    <br>
    <span v-if="lastResult !== ''">Resultat: {{ lastResult }}</span>
  </div>
  <character-selector></character-selector>
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
      for (let i = 0; i < this.functions.length; i++) {
        this.functions[i].shown = this.functions[i].name === functionName
      }
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
