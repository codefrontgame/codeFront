<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="select(character)">
    <character-selector-symbol :name="character.name" :image="character.avatar" :notices="errors(character)" :withBorder="character === selected"/>
  </div>
</div>
</template>

<script>
import CharacterSelectorSymbol from '@/enteties/CharacterSelectorSymbol'
export default {
  name: 'CharacterSelector',
  props: {
    selected: Function, // the character object
  },
  computed: {
    characters () {
      let uf = this.$store.getters.getUserFunctions
      return this.$store.getters['getCharacters'].filter((c) => Object.keys(uf[c.name]).length > 0)
    },
  },
  methods: {
    select (character) {
      this.$emit('update:selected', character)
    },
    errors (character) {
      return Object.values(this.$store.getters.getUserFunctions[character.name]).filter((uf) => uf.error != null).length
    },
  },
  components: { CharacterSelectorSymbol },
}
</script>

<style lang="scss" scoped>
  .character-selector {
    background-color: burlywood;
    width: 100px; //Kanske bra? Bör göra så att denna sitter fast i högerkansten dock
  }
</style>
