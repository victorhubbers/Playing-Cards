<template>
  <div id="app">
    <header>
      By
      <a target="_blank" href="https://www.victorhubbers.com">Victor Hubbers</a>
    </header>
    <game
      v-if="getActiveGame && $vuetify.breakpoint.mdAndUp"
      :height="cardHeight"
    ></game>
    <game-placeholder
      v-else-if="$vuetify.breakpoint.mdAndUp"
      :height="cardHeight"
    ></game-placeholder>
    <div v-else class="centered">
      <strong style="color: white; font-size: 18px">
        Your device is not suited for this game, try again on a bigger screen!
      </strong>
    </div>

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

  computed: {
    ...mapGetters(["getActiveGame"])
  },
  methods: {
    ...mapActions(["startGame"]),
    setCardHeight() {
      this.cardHeight = Math.floor((window.innerHeight - 23) / 5);
    }
  },
  created() {
    window.addEventListener("resize", this.setCardHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.setCardHeight);
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

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
