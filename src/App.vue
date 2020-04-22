<template>
  <div id="app">
    <CardRow v-for="row in getRows" :key="row.id" :cards="row.cards" :height="cardHeight"/>
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
    ],
    cardHeight: Math.floor((window.innerHeight - 25 )/5)
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
  width: 100%; height: 100%;
  text-align: center;
  /*noinspection CssUnknownTarget*/
  background-image: url("~@/assets/table-bg.jpg");
}
</style>
