<template>
<div class="game" :style="{ backgroundImage: 'url(assets/background.png)' }">
  <game-board />
  <i-d-e />
</div>
</template>

<script>
import IDE from '@/components/IDE'
import GameBoard from '@/components/GameBoard'
export default {
  name: 'Game',
  components: { GameBoard, IDE },
}
</script>

<style scoped lang="scss">
.game {
  display: grid;
  @media (max-width: 1100px) {
    display: block;
  }
  grid-template-columns: 95vh auto;
  background-size: cover;
}
</style>
