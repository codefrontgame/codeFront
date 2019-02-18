<template>
<div class="character-selector">
  <div :key="char.name" v-for="char in characters" @click="$emit('selectCharacter', char.id)">
    <character-selector-symbol :name="char.name"/>
  </div>
</div>
</template>

<script>
import CharacterSelectorSymbol from '@/enteties/CharacterSelectorSymbol'
export default {
  name: 'CharacterSelector',
  props: {
    characters: Array,
  },
  components: { CharacterSelectorSymbol },
}
</script>

<style lang="scss" scoped>

</style>
