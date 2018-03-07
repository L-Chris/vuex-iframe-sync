<template>
  <div>
    <iframe id="frameId1" src="appFrame.html" style="width:100%;"/>
    <iframe id="frameId2" v-if="iframe2Visible" src="appFrame.html" style="width:100%;"/>
    <button @click="handleClick">Add from parent</button>
    {{$store.state.count}}
    <input v-model.number="increasement" style="margin-left:24px;"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      increasement: 1,
      iframe2Visible: false
    }
  },
  methods: {
    handleClick () {
      this.$store.commit('ADD_COUNT', this.increasement)
    }
  },
  mounted () {
    const that = this
    setTimeout(function () {
      that.iframe2Visible = true
    }, 3000)
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
