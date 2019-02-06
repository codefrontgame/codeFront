<template>
  <div id="app">
    <editor :code.sync="userCode"></editor>
    <input type="button" @click="run" value="Run code">
  </div>
</template>

<script>

import Editor from './components/Editor'
export default {
  name: 'App',
  components: { Editor },
  data () {
    return {
      userCode: 'function a (value) {\n' +
              '    return value + 2;\n' +
              '}\n' +
              '\n' +
              'let arr = [2, 6, 1];\n' +
              '\n' +
              'arr.map(a).join(\', \');',
    }
  },
  methods: {
    run () {
      try {
        console.log(esper.eval(this.userCode))
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss">

</style>
