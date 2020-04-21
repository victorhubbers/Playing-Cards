<template>
  <div id="app">
    <CardRow v-for="row in rows" :key="row.id" v-bind:cards="cards" />
  </div>
</template>

<script>
import CardRow from "./components/CardRow";
export default {
  name: "App",
  components: { CardRow },
  data: () => ({
    rows: [],
    cards: ["js", "kh", "as"]
  })
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 18px;
}
</style>
