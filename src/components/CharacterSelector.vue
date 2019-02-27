<template>
<div class="character-selector">
  <div :key="key" v-for="(character, key) in characters" @click="$emit('update:selected', key)">
    <character-selector-symbol :name="character.name"/>
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
  components: { CharacterSelectorSymbol },
}
</script>

<style lang="scss" scoped>

</style>
