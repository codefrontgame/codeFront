<template>
<div class="game">
  <book v-if="openBook" @toggle-book="toggleBook"></book>
  <game-board v-else @toggle-book="toggleBook"></game-board>
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
    openBook: false,
  }),
  components: { GameBoard, IDE, Book },
  methods: {
    toggleBook () {
      this.openBook = !this.openBook
    },
  },
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
