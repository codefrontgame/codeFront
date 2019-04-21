<template>
  <div class="character-selector-symbol">
    <div v-if="notices > 0" class="notices">{{ notices }}</div>
    <img :src="image" width="75" height="75" class="image" v-bind:class="{ 'border': withBorder }">
  </div>
</template>
<script>
export default {
  name: 'CharacterSelectorSymbol',
  props: {
    name: String,
    image: String,
    withBorder: Boolean,
    notices: Number,
  },
}
</script>

<style lang="scss" scoped>
.character-selector-symbol {
  position: relative;
  .notices {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    border-radius: 50%;
    padding: 3px;
    min-width: 20px;
    text-align: center;
    border: 1px solid black;
  }
}
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  &.border {
    border-style: solid;
    border-width: 5px;
  }
}
</style>
