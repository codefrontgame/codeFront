<template>
<div class="character-function-editor">
  <div class="title" @click="$emit('update:expanded', !expanded)">
    <label>{{func.cn}}</label>
    <font-awesome-icon class="icon" :icon="expanded ? 'window-minimize' : 'window-maximize'"></font-awesome-icon>
  </div>
  <transition name="fade">
    <div v-if="expanded">
      <VueMarkdown :source="func.description" class="description" />
      <function-editor
        :disabled="disabled"
        :user-code="func.userCode"
        @update:userCode="updateUserCode"
        :function-name="func.name"
        :parameters="func.parameters"
      ></function-editor>
      <div class="error">{{ errorMessage }}</div>
    </div>
  </transition>
  <button class="button" v-bind:class="{ 'disabled' : disabled }" @click="resetUserCode">
    Återställ
  </button>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import FunctionEditor from './FunctionEditor'
export default {
  name: 'CharacterFunctionEditor',
  components: { FunctionEditor, VueMarkdown },
  props: {
    character: Function,
    expanded: Boolean,
    func: Object,
    disabled: Boolean,
  },
  computed: {
    /**
     * Returns the error message from last execution of user code
     * @return {string} with error message
     */
    errorMessage () {
      if (this.func == null || this.func.error == null) {
        return ''
      } else {
        return this.func.error
      }
    },
  },
  methods: {
    updateUserCode (code) {
      this.$emit('update:userCode', code)
    },
    resetUserCode () {
      if (!this.disabled) {
        this.$store.commit('resetUserCode', {
          character: this.character.name,
          f: this.func.name,
        })
      }
    },
  },
}
</script>

<style lang="scss">
.description p code {
  font-family: "DejaVu Sans Mono", monospace;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>

<style lang="scss" scoped>
.description {
  padding-right: 10px;
  padding-left: 10px;
}
.title {
  font-size: 18pt;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 3px;
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
.disabled {
  background-color: darkgray;
}
.icon {
  float: right;
  &:hover {
    cursor: pointer;
  }
}
.error {
  color: red;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
