<template>
  <img
    class="duck"
    src="assets/duck.svg"
    :class="{ 'hidden': hidden }"
    @click="$emit('clicked')"
  />
</template>

<script>
export default {
  name: 'Duck',
  props: {
    hidden: Boolean,
  },
}
</script>

<style scoped lang="scss">
  .duck {
    position: absolute;
    left: 3vh;
    bottom: 1vh;
    width: 20vh;
    height: 20vh;
    &.hidden {
      left: -3vh;
      bottom: -11vh;
    }
    transition: all 0.5s ease;
  }
</style>
