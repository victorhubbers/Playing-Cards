<template>
  <div>
    <div id="container">
      <HigherLower :id="left" />
      <VuePlayingCard
        v-for="card in cards"
        :key="card.signature"
        :signature="card.signature"
        :height="height"
      />
      <HigherLower :id="right" />
      <!--          <v-btn @click="click">ss</v-btn>-->
    </div>
  </div>
</template>

<script>
import { VuePlayingCard } from "vue-playing-card";
import HigherLower from "./HigherLower";

export default {
  name: "CardRow",
  props: {
    cards: Array,
    height: Number
  },
  data() {
    return {
      left: "left",
      right: "right"
    };
  },
  components: {
    VuePlayingCard,
    HigherLower
  },
  methods: {}
};
</script>

<style scoped>
#container {
  display: inline-flex;
  padding: 3px;
}
svg {
  padding: 3px;
}
</style>
