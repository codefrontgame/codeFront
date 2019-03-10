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
        minLines: 5,
        value: this.code,
        mode: 'ace/mode/javascript',
        theme: 'ace/theme/monokai',
        fontSize: '18pt',
        tabSize: '2',
      },
    }
  },
  props: {
    code: String,
    disabled: Boolean,
  },
  watch: {
    code (value) {
      if (this.editor != null && this.editor.getValue() !== value) {
        // console.log(value)
        this.editor.setValue(value)
      }
    },
    disabled (value) {
      if (this.editor != null) {
        this.editor.setReadOnly(value)
      }
    },
  },
  mounted () {
    this.editor = Ace.edit(String(this._uid), this.editorOptions)

    this.editor.on('change', () => {
      let val = this.editor.getValue()
      if (val !== '') {
        this.$emit('update:code', val)
      }
    })

    this.editor.commands.on('exec', (e) => {
      let name = e.command.name
      let allowedCommands = [
        'gotoleft',
        'gotoright',
        'golineup',
        'golinedown',
        'selectleft',
        'selectright',
        'gotowordleft',
        'gotowordright',
        'selectwordleft',
        'selectwordright',
      ]
      var rowCol = this.editor.getCursorPosition()
      let commandIsAllowed = allowedCommands.includes(name) ||
          (name === 'insertstring' && e.args[0] === '\n' && (
            (rowCol.row === 0 && this.editor.session.getLine(rowCol.row).length === rowCol.column) ||
            (rowCol.row + 1 === this.editor.session.getLength() && rowCol.column === 0)
          ))

      if (!commandIsAllowed) {
        if ((rowCol.row === 0) || ((rowCol.row + 1) === this.editor.session.getLength())) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    })
  },
}
</script>

<style scoped>

</style>
