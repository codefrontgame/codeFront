<template>
<div class="function-editor">
  <editor class="editor" :code.sync="functionCode" :disabled="disabled"></editor>
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
    disabled: Boolean,
  },
  computed: {
    functionCode: {
      get () {
        console.log(this.userCode)
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
.description {
  font-family: "DejaVu Sans", sans-serif;
  font-size: 18pt;
  margin-top: 5px;
  margin-bottom: 0px;
  margin-right: 5px;
  background: lightgray;
  width: 675px; //Denna är inte najs, bör vara något som anpassar sig
}
.editor {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
