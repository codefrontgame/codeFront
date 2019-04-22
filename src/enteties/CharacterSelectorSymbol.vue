<template>
  <div class="character-selector-symbol">
    <div v-if="notices > 0" class="notices">{{ notices }}</div>
    <img :src="image" >
  </div>
</template>
<script>
export default {
  name: 'CharacterSelectorSymbol',
  props: {
    image: String,
    notices: Number,
    name: String,
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
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
