<template>
  <div class="book">
    <TabSelector :selections="bookChapters" :selected.sync="selectedChapter"></TabSelector>
    <TabSelector :selections="bookPages" :selected.sync="selectedPage"></TabSelector>
    <VueMarkdown :source="bookPage"></VueMarkdown>
  </div>
</template>

<script>
import TabSelector from '../enteties/TabSelector'
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'
export default {
  name: 'Book',
  computed: {
    ...mapGetters([
      'bookChapters',
      'bookPage',
      'bookPages',
    ]),
    selectedPage: {
      get () {
        return this.$store.getters['selectedPage']
      },
      set (val) {
        this.$store.commit('selectedPage', val)
      },
    },
    selectedChapter: {
      get () {
        return this.$store.getters['selectedChapter']
      },
      set (val) {
        this.$store.commit('selectedChapter', val)
      },
    },
  },
  components: {
    TabSelector,
    VueMarkdown,
  },
}
</script>

<style scoped lang="scss">
.book {
  background-repeat: repeat-y;
  background-position: top;
  background-image: url('/assets/book.png');
  background-size: 100%;
  height: 100vh;
}
</style>
