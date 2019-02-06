<template>
<div class="editor" :id="_uid">
</div>
</template>

<script>
import Ace from 'ace-builds'
import 'ace-builds/webpack-resolver'

export default {
  name: 'Editor',
  data () {
    return {
      editor: null,
      editorOptions: {
        maxLines: 50,
        minLines: 10,
        value: this.code,
        mode: 'ace/mode/javascript',
        theme: 'ace/theme/solarized_dark',
      },
    }
  },
  props: {
    code: String,
  },
  watch: {
    code (value) {
      if (this.editor != null && this.editor.getValue() !== value) {
        this.editor.setValue(value)
      }
    },
  },
  mounted () {
    this.editor = Ace.edit(String(this._uid), this.editorOptions)

    this.editor.on('change', () => {
      this.$emit('update:code', this.editor.getValue())
    })
  },
}
</script>

<style scoped>

</style>
