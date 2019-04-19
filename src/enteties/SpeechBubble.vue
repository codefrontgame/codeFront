<template>
  <div class="speech-bubble">
    <p>{{text}}</p>
    <font-awesome-icon v-if="hasPrevious" @click="$emit('previous')" class="left-icon" icon="chevron-left"/>
    <font-awesome-icon v-if="hasNext" @click="$emit('next')" class="right-icon" icon="chevron-right"/>
    <font-awesome-icon @click="$emit('close')" class="close-icon" icon="times"/>
  </div>
</template>

<script>
export default {
  name: 'SpeechBubble',
  props: {
    text: String,
    hasPrevious: Boolean,
    hasNext: Boolean,
  },
}
</script>

<style scoped lang="scss">
.speech-bubble {
  min-width: 20vh;
  min-height: 7vh;
  background-color: dimgrey;
  color: whitesmoke;
  border-style: solid;
  border-color: black;
  border-width: 3px;
  border-radius: 15px;
  text-align: left;
  padding-left: 10px;
  padding-right: 25px;
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
  }
  .left-icon {
    position: absolute;
    bottom: 4px;
    left: 4px;
  }
  .right-icon {
    position: absolute;
    bottom: 4px;
    left: 25px;
  }
}
</style>
