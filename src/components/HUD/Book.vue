<template>
  <div class="book">
    <TabSelector :selections="bookChapters" hidden :selected.sync="selectedChapter"></TabSelector>
    <TabSelector :selections="bookPages" hidden :selected.sync="selectedPage"></TabSelector>
    <div v-bar class="content">
      <VueMarkdown :source="bookPage"></VueMarkdown>
    </div>
    <font-awesome-icon icon="times" size="3x" class="close-btn" @click="$emit('toggle-book')"></font-awesome-icon>
  </div>
</template>

<script>
import TabSelector from '../../enteties/TabSelector'
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
  position: relative;
  .close-btn {
    :hover {
      cursor: pointer;
    }
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .content {
    left: 20%;
    width: 70%;
    height: 100%;
  }
}
</style>
