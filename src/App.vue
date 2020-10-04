<template>
  <div id="app">
    <header>
      By
      <a target="blank" href="https://www.victorhubbers.com">Victor Hubbers</a>
    </header>
    <game v-if="getActiveGame" :height="cardHeight"></game>
    <game-placeholder v-else :height="cardHeight"></game-placeholder>
    <fab
      position="bottom-right"
      bg-color="#4ed494"
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
        icon: "play_circle_outline"
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

header {
  color: white;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  left: 0;
}

header a {
  color: #4ed494;
}
#app {
  font-family: "Roboto";
  width: 100vw;
  height: 100vh;
  text-align: center;
  /*noinspection CssUnknownTarget*/
  background-image: url("~@/assets/table-bg.webp");
  background-size: cover;
}
</style>
