<template>
  <div class="hud">
    <div @click="closeHelpSystems" class="game">
      <slot />
    </div>
    <LevelTransition />
    <button class="button hint-button" @click="getHint">Ledtråd</button>
    <button class="button book-button" @click="toggleBook">
      <font-awesome-icon icon="book" size="3x"/>
    </button>
    <Duck
      :hidden="duckHidden"
      @clicked="duckClicked"
    />
    <SpeechBubble
      v-if="speechBubbleText != null"
      class="box"
      :text="speechBubbleText"
      :hasPrevious="showingStory && storyHasPrevious"
      @previous="previousSpeechBubbleText"
      :hasNext="showingStory && storyHasNext"
      @next="nextSpeechBubbleText"
      @close="closeHelpSystems"
    />
    <Book
      v-if="showingBook"
      @toggle-book="toggleBook"
    />
  </div>
</template>

<script>
import SpeechBubble from '@/enteties/SpeechBubble'
import LevelTransition from './LevelTransition'
import Book from './Book'
import Duck from './Duck'

export default {
  name: 'HUD',
  data () {
    return {
      showingStory: true,
      storyIndex: 0,
      showingHints: false,
      hintIndex: -1,
      showingBook: false,
    }
  },
  methods: {
    duckClicked () {
      if (this.showingStory) {
        this.showingStory = false
      } else if (this.showingHints) {
        this.showingHints = false
      } else {
        this.showingStory = true
      }
    },
    getHint () {
      this.closeHelpSystems()
      this.hintIndex++
      this.showingHints = true
    },
    previousSpeechBubbleText () {
      if (this.showingStory) {
        this.storyIndex--
      }
    },
    nextSpeechBubbleText () {
      if (this.showingStory) {
        this.storyIndex++
      }
    },
    closeHelpSystems () {
      this.showingStory = false
      this.showingHints = false
      this.showingBook = false
    },
    toggleBook () {
      this.showingBook = !this.showingBook
    },
  },
  computed: {
    level () {
      return this.$store.getters.getLevel
    },
    gameRunning () {
      return this.$store.getters.getRunStatus
    },
    hint () {
      let hints = this.$store.getters.getHints
      return hints[this.hintIndex % hints.length]
    },
    story () {
      return this.$store.getters.getHelpTexts[this.storyIndex]
    },
    speechBubbleText () {
      if (this.showingStory) {
        return this.story
      } else if (this.showingHints) {
        return this.hint
      } else {
        return null
      }
    },
    duckHidden () {
      return !this.showingStory
    },
    storyHasNext () {
      return this.$store.getters.getHelpTexts.length > (this.storyIndex + 1)
    },
    storyHasPrevious () {
      return this.storyIndex > 0
    },
  },
  watch: {
    level () {
      this.closeHelpSystems()
      this.showingStory = true
    },
    gameRunning (val) {
      if (val) {
        this.closeHelpSystems()
      }
    },
  },
  components: {
    Duck,
    LevelTransition,
    SpeechBubble,
    Book,
  },
}
</script>

<style scoped lang="scss">
  .hud {
    overflow: hidden;
    height: 100vh;
    width: 100%;
    position: relative;
  }
.hint-button {
  position: absolute;
  bottom: 5px;
  left: 70vh;
}
.box {
  position: absolute;
  bottom: 5px;
  left: 25vh;
}
.book-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.book {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
