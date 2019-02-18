<template>
  <div>
    <div class="description" @click="$emit('toggle', functionName)">
      <label>{{description}}</label>
    </div>
    <transition name="fade">
      <div v-if="shown">
        <editor class="editor" :code.sync="functionCode"></editor>
      </div>
    </transition>
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
    shown: Boolean,
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
.description {
  font-family: "DejaVu Sans", sans-serif;
  font-size: 18pt;
  margin-top: 5px;
  margin-bottom: 5px;
  background: lightgray;
}
.editor {
  margin-top: 5px;
  margin-bottom: 5px;
}
.fade-enter-active {
  transition: ease .5s;
}
.fade-enter, .fade-leave-to, .fade-leave {
  opacity: 0;
}
</style>
