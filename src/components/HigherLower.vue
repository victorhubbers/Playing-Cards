<template>
  <div class="parent" id="hoverWrapper">
    <v-icon @click="drawHigher" class="child" color="#009688" size="50"
      >mdi-arrow-up-bold</v-icon
    >
    <v-icon @click="drawLower" class="child" color="#F44336" size="50"
      >mdi-arrow-down-bold</v-icon
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HigherLower",
  props: {
    id: String
  },
  methods: {
    ...mapActions(["drawHigher", "drawLower"])
  }
};
</script>

<style scoped>
#hoverWrapper:hover {
  display: inline-grid;
  width: 94px;
  border-radius: 5px;
  border: 3px dashed rgba(100, 100, 100, 1);
  background: rgba(211, 211, 211, 0.6);
}
#hoverWrapper {
  width: 94px;
}
.child {
  visibility: hidden;
}
.parent:hover .child {
  visibility: visible;
}
</style>
