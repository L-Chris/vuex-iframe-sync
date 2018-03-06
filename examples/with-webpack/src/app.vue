<template>
  <div>
    <iframe id="frameId1" src="appFrame.html" style="width:100%;"/>
    <iframe id="frameId2" src="appFrame.html" style="width:100%;"/>
    <button @click="handleClick">Add from parent</button>
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
