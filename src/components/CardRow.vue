<template>
  <div>
    <span v-for="card in cards" :key="card">
      <!-- card.sig-->
      <VuePlayingCard :signature="card" :height="140" />
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
