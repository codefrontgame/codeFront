<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
body {
  margin: 0px;
  min-height: 100vh;
}
  .app{
    height: 100vh;
  }

</style>
