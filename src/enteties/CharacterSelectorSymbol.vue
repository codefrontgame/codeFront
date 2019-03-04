<template>
  <img :src="image" width="75" height="75" class="image">
</template>

<script>
export default {
  name: 'CharacterSelectorSymbol',
  props: {
    name: String,
    image: String,
  },
}
</script>

<style lang="scss" scoped>
 .image {
   display: block;
   margin-left: auto;
   margin-right: auto;
   margin-top: 10px;
 }
</style>
