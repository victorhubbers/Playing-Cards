<template>
  <div id="app">
    <CardRow v-for="row in getRows" :key="row.id" :cards="row.cards" />
    <v-btn @click="startGame">start game</v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardRow from "./components/CardRow";

export default {
  name: "App",
  components: { CardRow },
  data: () => ({}),
  methods: {
    ...mapActions(["startGame"])
  },
  computed: {
    ...mapGetters(["getError", "getRows"])
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 18px;
}
</style>
