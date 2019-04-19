<template>
  <div class="welcome">
    <img src="assets/logo.png" class="logo">
    <h1>Välkommen till codeFront!</h1>
    <video class="video center"  controls>
      <source src="assets/video.mp4" type="video/mp4">
      Det går inte att visa videon i din webbläsare.
    </video>
    <router-link to="Game" tag="button" class="button to-game">Till spelet!</router-link>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.welcome {
  height: 100vh;
  text-align: center;
}
.video{
  width: 50vw;
}
.center {
  margin-left: auto;
  margin-right: auto;
  display: block
}
.to-game {
  position: relative;
  top: 50px;
}
.logo {
  width: 200px;
  position: relative;
  top: 10px;
}
</style>
