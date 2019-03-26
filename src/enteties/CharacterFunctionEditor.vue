<template>
<div class="character-function-editor">
  <div class="title" @click="$emit('update:expanded', !expanded)">
    <label>{{func.cn}}</label>
  </div>
  <transition name="fade">
    <div v-if="expanded">
      {{ func.description }}
      <function-editor
        :disabled="disabled"
        :user-code="func.userCode"
        @update:userCode="updateUserCode"
        :function-name="func.name"
        :parameters="func.parameters"
      ></function-editor>
      {{ errorMessage() }}
    </div>
  </transition>
  <button class="button" @click="resetUserCode">Återställ</button></div>
</template>

<script>
import FunctionEditor from './FunctionEditor'
export default {
  name: 'CharacterFunctionEditor',
  components: { FunctionEditor },
  props: {
    characterKey: String,
    expanded: Boolean,
    func: Object,
    disabled: Boolean,
  },
  methods: {
    /**
     * Returns the error message from last execution of user code
     * @return {string} with error message
     */
    errorMessage () {
      if (this.func == null || this.func.error == null) {
        return ''
      } else {
        return this.func.error.lineNumber + ': ' + this.func.error.description
      }
    },
    updateUserCode (code) {
      this.$emit('update:userCode', code)
    },
    resetUserCode () {
      this.$store.commit('resetUserCode', {
        character: this.characterKey,
        f: this.func.name,
      })
      console.log(this.func)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
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
