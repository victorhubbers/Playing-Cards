<template>
  <div id="app">
    <game v-if="getActiveGame" :height="cardHeight"></game>
    <game-placeholder v-else :height="cardHeight"></game-placeholder>
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
import Game from "./components/Game";
import GamePlaceholder from "./components/GamePlaceholder";
import fab from "vue-fab";

export default {
  name: "App",
  components: { fab, Game, GamePlaceholder },
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
    ...mapGetters(["getActiveGame"])
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
