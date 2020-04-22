<template>
  <div id="app">
    <CardRow v-for="row in getRows" :key="row.id" :cards="row.cards" />
    <fab
      position="bottom-right"
      bg-color="#000000"
      :actions="fabActions"
      icon-size="small"
      @startGame="startGame"
    ></fab>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardRow from "./components/CardRow";
import fab from "vue-fab";

export default {
  name: "App",
  components: { CardRow, fab },
  data: () => ({
    fabActions: [
      {
        name: "startGame",
        icon: "play_circle_outline" //TBD: if in progress: restart option
      }
    ]
  }),
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
