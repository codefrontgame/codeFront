<template>
<div class="game">
  <book v-if="openBook"></book>
  <game-board v-else></game-board>
  <i-d-e></i-d-e>
</div>
</template>

<script>
import IDE from '@/components/IDE'
import GameBoard from '@/components/GameBoard'
import Book from '@/components/Book'
export default {
  name: 'Game',
  data: () => ({
    openBook: true,
  }),
  components: { GameBoard, IDE, Book },
}
</script>

<style scoped lang="scss">
.game {
  display: grid;
  @media (max-width: 1100px) {
    display: block;
  }
  grid-template-columns: 87vh auto;
}
</style>
