<template>
<div class="function-editor">
  <editor class="editor" :code.sync="functionCode"></editor>
</div>
</template>

<script>
import Editor from './Editor'

export default {
  name: 'FunctionEditor',
  components: { Editor },
  props: {
    functionName: String,
    parameters: Array,
    userCode: String,
  },
  computed: {
    functionCode: {
      get () {
        return `function ${this.functionName} (${this.parameters.join(', ')}) {\n` +
            this.userCode +
            '\n}'
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

<style scoped lang="scss">
.editor {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
