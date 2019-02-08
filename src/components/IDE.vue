<template>
<div class="ide">
  <div>
    <editor :code.sync="userCode"></editor>
    <input type="button" @click="run" value="Run code">
    <br>
    <span v-if="lastResult != ''">Resultat: {{ lastResult }}</span>
  </div>
  <character-selector></character-selector>
</div>

</template>

<script>
import Editor from '@/enteties/Editor'
import CharacterSelector from '@/components/CharacterSelector'
export default {
  name: 'IDE',
  components: { CharacterSelector, Editor },
  data () {
    return {
      userCode: 'function a (value) {\n' +
        '    return value + 2;\n' +
        '}\n' +
        '\n' +
        'let arr = [2, 6, 1];\n' +
        '\n' +
        'arr.map(a).join(\', \');',
      lastResult: '',
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
