<template>
  <div>
    <label class="description">{{description}}</label>
    <editor :code.sync="functionCode"></editor>
  </div>
</template>

<script>
import Editor from './Editor'

export default {
  name: 'FunctionEditor',
  components: { Editor },
  props: {
    description: String,
    functionName: String,
    parameters: Array,
    userCode: String,
  },
  computed: {
    functionCode: {
      get () {
        let s = `function ${this.functionName} (${this.parameters.join(', ')}) {\n` +
            this.userCode +
            '\n}'
        return s
      },
      set (val, old) {
        if (val !== old) {
          let v = val.split('\n')
          v.splice(0, 1)
          v.splice(-1, 1)
          this.$emit('update:userCode', v.join('\n'))
        }
      },
    },
  },
}
</script>

<style scoped>
.description {
  font-family: "DejaVu Sans", sans-serif;
  font-size: 18pt;
}
</style>