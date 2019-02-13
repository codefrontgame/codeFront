<template>
<div class="ide">
  <div>
    <function-editor description="Move" function-name="move" :userCode.sync="userCode" :parameters="['x', 'y']"></function-editor>
    Shoot
    <input type="button" @click="run" value="Run code">
    <br>
    <span v-if="lastResult != ''">Resultat: {{ lastResult }}</span>
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
    }
  },
  methods: {
    run () {
      try {
        this.lastResult = esper.eval(this.userCode)
      } catch (e) {
        console.log(e)
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
