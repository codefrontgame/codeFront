<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="select(character)">
    <character-selector-symbol :name="character.name" :image="selected(character) ? character.selectedAvatar : character.avatar" :notices="errors(character)" />
  </div>
  <slot></slot>
</div>
</template>

<script>
import CharacterSelectorSymbol from '@/enteties/CharacterSelectorSymbol'
export default {
  name: 'CharacterSelector',
  props: {
    selectedCharacterName: String, // the character object
  },
  computed: {
    characters () {
      return this.$store.getters['getLevelCharacters']
    },
  },
  methods: {
    select (character) {
      this.$emit('selected', character)
    },
    selected (character) {
      return character.name === this.selectedCharacterName
    },
    errors (character) {
      return Object.values(this.$store.getters.getUserFunctions[character.name]).filter((uf) => uf.error != null).length
    },
  },
  components: { CharacterSelectorSymbol },
  watch: {
    characters (val) {
      let selectedExists = val.some((char) => char.name === this.selectedCharacterName)
      if (!selectedExists) {
        this.select(val[0])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .character-selector {
    width: 100px; //Kanske bra? Bör göra så att denna sitter fast i högerkansten dock
    position: relative;
  }
</style>
