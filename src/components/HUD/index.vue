<template>
  <div class="hud">
    <div @click="closeHelpSystems" class="game">
      <slot />
    </div>
    <LevelTransition />
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
    <button class="button hint-button" @click="getHint">Ledtråd</button>
  </div>
</template>

<script>
import SpeechBubble from '@/enteties/SpeechBubble'
import LevelTransition from './LevelTransition'
import Duck from './Duck'

export default {
  name: 'HUD',
  data () {
    return {
      showingStory: true,
      storyIndex: 0,
      showingHints: false,
      hintIndex: -1,
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
</style>
