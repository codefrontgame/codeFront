<template>
<div class="character-selector">
  <character-selector-symbol :key="name" v-for="{name} in characters" :name="name"/>
</div>
</template>

<script>
import CharacterSelectorSymbol from '@/enteties/CharacterSelectorSymbol'
export default {
  name: 'CharacterSelector',
  data () {
    return {
      characters: [
        {
          name: 'Gurgy',
        },
        {
          name: 'Mårdhor',
        },
      ],
    }
  },
  components: {CharacterSelectorSymbol},
}
</script>

<style lang="scss" scoped>

</style>
