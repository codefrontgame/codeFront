<template>
  <div v-if="this.withBorder">
    <img :src="image" width="75" height="75" class="imageBorder">
  </div>
  <div v-else>
    <img :src="image" width="75" height="75" class="image">
  </div>
</template>

<script>
export default {
  name: 'CharacterSelectorSymbol',
  props: {
    name: String,
    image: String,
    withBorder: Boolean,
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
 .imageBorder {
   display: block;
   margin-left: auto;
   margin-right: auto;
   margin-top: 10px;
   border-style: solid;
   border-width: 5px;
 }
</style>
