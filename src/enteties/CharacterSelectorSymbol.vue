<template>
    <img :src="image" width="75" height="75" class="image" v-bind:class="{ 'border': withBorder }">
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
 .border {
   border-style: solid;
   border-width: 5px;
 }
</style>
