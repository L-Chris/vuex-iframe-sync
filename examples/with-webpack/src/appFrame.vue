<template>
  <div>
    <button @click="handleClick">Add from iframe</button>
    {{$store.state.count}}
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$store.commit('ADD_COUNT')
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
