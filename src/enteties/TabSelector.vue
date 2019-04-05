<template>
  <nav>
    <a v-for="item in selections" :key="item" @click="$emit('update:selected', item)">
      {{item}}
    </a>
  </nav>
</template>

<script>
export default {
  name: 'TabSelector',
  props: {
    selections: Array,
    selected: String,
  },
}
</script>

<style scoped lang="scss">
  a:hover {
    cursor: pointer;
  }

</style>
