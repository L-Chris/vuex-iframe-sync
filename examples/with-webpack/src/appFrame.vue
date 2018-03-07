<template>
  <div>
    <button @click="handleClick">Add from iframe</button>
    {{$store.state.count}}
    <input v-model.number="increasement" style="margin-left:24px;"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      increasement: 1
    }
  },
  methods: {
    handleClick () {
      this.$store.commit('ADD_COUNT', this.increasement)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  width: 100%;
}
</style>
