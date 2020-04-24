<template>
  <div id="app">
    <div v-if="getActiveGame">
      <ErrorMessage :height="cardHeight" />
      <CardRow
        v-for="row in getRows"
        :key="row.id"
        :row-id="row.id"
        :cards="row.cards"
        :height="cardHeight"
      />
    </div>
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
import ErrorMessage from "./components/ErrorMessage";
import fab from "vue-fab";

export default {
  name: "App",
  components: { CardRow, ErrorMessage, fab },
  data: () => ({
    fabActions: [
      {
        name: "startGame",
        icon: "play_circle_outline" //TBD: if in progress: restart option
      }
    ],
    cardHeight: Math.floor((window.innerHeight - 23) / 5)
  }),
  methods: {
    ...mapActions(["startGame"])
  },
  computed: {
    ...mapGetters(["getRows", "getActiveGame"])
  }
};
</script>

<style>
body,
html {
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  text-align: center;
  /*noinspection CssUnknownTarget*/
  background-image: url("~@/assets/table-bg.jpg");
}
</style>
