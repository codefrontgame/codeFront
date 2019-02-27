<template>
<div class="character-function-editor">
  <div class="title" @click="$emit('update:expanded', !expanded)">
    <label>{{func.cn}}</label>
  </div>
  <transition name="fade">
    <div v-if="expanded">
      {{ func.description }}
      <function-editor
        :user-code="func.userCode"
        @update:userCode="code => $emit('update:userCode', code)"
        :function-name="func.name"
        :parameters="func.parameters"
      ></function-editor>
    </div>
  </transition>
</div>
</template>

<script>
import FunctionEditor from './FunctionEditor'
export default {
  name: 'CharacterFunctionEditor',
  components: { FunctionEditor },
  props: {
    expanded: Boolean,
    func: Object,
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
