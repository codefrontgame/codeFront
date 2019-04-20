<template>
  <div class="markdown-page">
    {{ markdown }}
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  props: {
    markdown: String,
  },
}
</script>

<style scoped lang="scss">

</style>
