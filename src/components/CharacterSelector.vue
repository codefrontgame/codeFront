<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="select(key)">
    <character-selector-symbol :name="character.name" :image="character.image"/>
  </div>
</div>
</template>

<script>
import CharacterSelectorSymbol from '@/enteties/CharacterSelectorSymbol'
export default {
  name: 'CharacterSelector',
  props: {
    selected: String, // Name
  },
  computed: {
    characters () {
      return this.$store.getters['getCharacters']
    },
  },
  methods: {
    select (key) {
      this.$emit('update:selected', key)
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
