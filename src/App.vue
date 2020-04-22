<template>
  <div id="app">
    <CardRow v-for="row in rows" :key="row.id" v-bind:cards="cards" />
    <button @click="startGame" />
  </div>
</template>

<script>
import CardRow from "./components/CardRow";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: { CardRow },
  methods: {
    ...mapActions(["startGame"])
  },
  computed: {
    ...mapGetters(["getError", "getRows"])
  },
  data: () => ({
    rows: [],
    cards: ["js", "kh", "as"]
  })
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 18px;
}
</style>
