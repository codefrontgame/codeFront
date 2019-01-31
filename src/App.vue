<template>
  <div id="app">
    <input type="text" v-model="userCode">
    <input type="button" @click="run" value="knapptext">
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userCode: ""
    }
  },
  methods: {
    run() {
      console.log(this.userCode)
    }
  }
};
</script>

<style lang="scss">

</style>
