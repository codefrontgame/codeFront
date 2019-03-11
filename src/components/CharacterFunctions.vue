<template>
<div class="character-functions">
  <div v-for="(func, key) in functions" :key="key">
    <character-function-editor
      :disabled="disabled"
      :func="func"
      :expanded="isExpanded(key)"
      @update:expanded="val => setExpanded(key, val)"
      @update:userCode="code => updateUserCode(key, code)"
    />
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import CharacterFunctionEditor from '@/enteties/CharacterFunctionEditor'

export default {
  name: 'CharacterFunctions',
  data () {
    return {
      expanded: [],
      defaultExpansion: true,
    }
  },
  props: {
    characterKey: String,
    disabled: Boolean,
  },
  computed: {
    functions () {
      return this.$store.getters['getUserFunctions'](this.characterKey)
    },
  },
  methods: {
    updateUserCode (func, code) {
      // The user code resides in store
      this.$store.commit('setUserCode', {
        character: this.characterKey,
        f: func,
        code,
      })
    },
    isExpanded (funKey) {
      let value = null
      // Initialize expanded array for the selected character
      if (this.characterKey != null && this.characterKey !== '') { // Validate
        if (this.expanded[this.characterKey] == null) {
          // Set it to empty array with vue to init listeners
          Vue.set(this.expanded, this.characterKey, [])
        }
      }
      value = this.expanded[this.characterKey][funKey]
      // Return default expansion if it is not set before
      return value == null ? this.defaultExpansion : value
    },
    setExpanded (key, value) {
      // Initialize expanded array for the selected character
      if (this.characterKey != null && this.characterKey !== '') { // Validate
        if (this.expanded[this.characterKey] == null) {
          // Set it to empty array with vue to init listeners
          Vue.set(this.expanded, this.characterKey, [])
        }
      }
      // Set it with vue as it might be a new property to initiate listeners
      Vue.set(this.expanded[this.characterKey], key, value)
    },
  },
  components: {
    CharacterFunctionEditor,
  },
}
</script>

<style lang="scss" scoped>

</style>
