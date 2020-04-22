<template>
  <div>
    <span v-for="card in cards" :key="card.signature">
      <VuePlayingCard :signature="card.signature" :height="140" />
    </span>
  </div>
</template>

<script>
import { VuePlayingCard } from "vue-playing-card";

export default {
  name: "CardRow",
  props: ["cards"],
  components: {
    VuePlayingCard
  },
  methods: {}
};
</script>

<style scoped>
span {
  padding: 3px;
}
</style>
