<template>
  <div class="speech-bubble" @click="next">
    <VueMarkdown :source="text"></VueMarkdown>
    <font-awesome-icon v-if="hasPrevious" @click.stop="$emit('previous')" class="left-icon" icon="chevron-left"/>
    <font-awesome-icon v-if="hasNext" @click.stop="next" class="right-icon" icon="chevron-right"/>
    <font-awesome-icon @click.stop="$emit('close')" class="close-icon" icon="times"/>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'SpeechBubble',
  props: {
    text: String,
    hasPrevious: Boolean,
    hasNext: Boolean,
  },
  methods: {
    next () {
      if (this.hasNext) this.$emit('next')
    },
  },
  components: {
    VueMarkdown,
  },
}
</script>

<style lang="scss">
.speech-bubble p {
  user-select: none;
  code {
    font-family: "DejaVu Sans Mono", monospace;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>

<style scoped lang="scss">
.speech-bubble {
  min-width: 20vh;
  min-height: 7vh;
  max-width: 40vh;
  background-color: dimgrey;
  color: whitesmoke;
  border-style: solid;
  border-color: black;
  border-width: 3px;
  border-radius: 15px;
  text-align: left;
  padding-left: 10px;
  padding-right: 25px;
  padding-bottom: 10px;
  p {
    user-select: none;
    code {

    }
  }
  :before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: black;
    border-left: 0;
    margin-top: -20px;
    margin-left: -23px;
  }
  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: dimgray;
    border-left: 0;
    margin-top: -20px;
    margin-left: -20px;
  }

  .close-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    transition: all 0.2s ease;
  }
  .left-icon {
    position: absolute;
    bottom: 4px;
    right: 25px;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    transition: all 0.2s ease;
  }
  .right-icon {
    position: absolute;
    bottom: 4px;
    right: 4px;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    transition: all 0.2s ease;
  }
}
</style>
