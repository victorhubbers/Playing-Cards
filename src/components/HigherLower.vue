<template>
  <div class="parent" id="hoverWrapper">
    <v-icon class="child" color="#009688" size="50">mdi-arrow-up-bold</v-icon>
    <v-icon class="child" color="#F44336" size="50">mdi-arrow-down-bold</v-icon>
  </div>
</template>

<script>
export default {
  name: "HigherLower"
};
</script>

<style scoped>
#hoverWrapper:hover {
  display: inline-grid;
  width: 94px;
  border-radius: 5px;
  border: 3px dashed darkgray;
  background: lightgray;
}
#hoverWrapper {
  /*display: inline-grid;*/
  width: 94px;
}
.child {
  visibility: hidden;
}
.parent:hover .child {
  visibility: visible;
}
</style>
