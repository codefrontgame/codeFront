<template>
<div class="character-functions">
  <div v-for="(func, key) in functions" :key="key">
    <character-function-editor
      :func="func"
      :expanded="getExpanded(key)"
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
  },
  computed: {
    functions () {
      let fns = this.$store.getters['getUserFunctions'](this.characterKey)
      console.log(fns)
      return fns
    },
  },
  methods: {
    updateUserCode (f, code) {
      this.$store.commit('setUserCode', {
        character: this.characterKey,
        f,
        code,
      })
    },
    getExpanded (key) {
      if (this.characterKey != null && this.characterKey !== '') {
        if (this.expanded[this.characterKey] == null) {
          Vue.set(this.expanded, this.characterKey, [])
        }
        let value = this.expanded[this.characterKey][key]
        return value == null ? this.defaultExpansion : value
      }
      return this.defaultExpansion
    },
    setExpanded (key, value) {
      if (this.characterKey != null && this.characterKey !== '') {
        if (this.expanded[this.characterKey] == null) {
          Vue.set(this.expanded, this.characterKey, [])
        }
        Vue.set(this.expanded[this.characterKey], key, value)
      }
    },
  },
  components: {
    CharacterFunctionEditor,
  },
}
</script>

<style lang="scss" scoped>

</style>
