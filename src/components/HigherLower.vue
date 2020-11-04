<template>
  <div
    class="parent"
    id="hoverWrapper"
    :style="{
      width: cardHeight * 0.71428571428 + 'px',
      'max-height': cardHeight
    }"
  >
    <v-icon
      @click="guessHigher(payload)"
      class="child"
      color="#009688"
      size="50"
      >mdi-arrow-up-bold</v-icon
    >
    <v-layout style="padding-top: 10px">
      <v-divider class="child"></v-divider>
    </v-layout>
    <v-icon @click="guessLower(payload)" class="child" color="#F44336" size="50"
      >mdi-arrow-down-bold</v-icon
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HigherLower",
  props: {
    side: String,
    rowId: Number,
    cardHeight: Number
  },
  data() {
    return {
      payload: { side: this.side, rowId: this.rowId }
    };
  },
  methods: {
    ...mapActions(["guessHigher", "guessLower"])
  }
};
</script>

<style scoped>
#hoverWrapper:hover {
  display: inline-grid;
  border-radius: 5px;
  border: 2px dashed rgba(100, 100, 100, 1);
  background: rgba(211, 211, 211, 0.6);
}
.child {
  visibility: hidden;
}
.parent:hover .child {
  visibility: visible;
}
</style>
