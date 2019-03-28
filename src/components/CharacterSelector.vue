<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="select(key)">
    <div v-if="key === selected">
      <character-selector-symbol :name="character.name" :image="character.avatar" :withBorder="true"/>
    </div>
    <div v-else>
      <character-selector-symbol :name="character.name" :image="character.avatar" :withBorder="false"/>
    </div>
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
