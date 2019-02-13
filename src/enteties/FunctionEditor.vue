<template>
  <div>
    <label class="description">{{description}}</label>
    <editor :code.sync="userCode"></editor>
  </div>
</template>

<script>
import Editor from './Editor'

export default {
  name: 'FunctionEditor',
  components: { Editor },
  props: {
    description: String,
    functionName: String,
    parameters: Array,
  },
  data () {
    return {
      userCode: 'function ' + this.functionName + '(' + this.parameters.join(', ') + ') {\n' +
                '  // Skriv din kod här\n' +
                '}',
    }
  },
}
</script>

<style scoped>
.description {
  font-family: "DejaVu Sans", sans-serif;
  font-size: 18pt;
}
</style>