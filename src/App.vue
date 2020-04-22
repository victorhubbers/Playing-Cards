<template>
  <div id="app">
    <button @click="startGame" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions(["startGame"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
