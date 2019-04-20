<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="select(character)">
    <character-selector-symbol :name="character.name" :image="character.avatar" :withBorder="character === selected"/>
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
      return this.$store.getters['getLevelCharacters']
    },
  },
  methods: {
    select (character) {
      this.$emit('update:selected', character)
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
