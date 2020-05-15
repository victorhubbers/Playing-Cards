<template>
  <div>
    <div id="container">
      <HigherLower v-if="getActiveGame" side="L" :row-id="rowId" />
      <VuePlayingCard
        v-for="card in cards"
        :key="card.signature"
        :signature="card.signature"
        :height="height"
      />
      <HigherLower v-if="getActiveGame" side="R" :row-id="rowId" />
    </div>
  </div>
</template>

<script>
import { VuePlayingCard } from "vue-playing-card";
import HigherLower from "./HigherLower";
import { mapGetters } from "vuex";

export default {
  name: "CardRow",
  props: {
    rowId: {
      type: Number,
      required: false,
      default() {
        return -1;
      }
    },
    height: {
      type: Number,
      required: true
    }
  },
  components: {
    VuePlayingCard,
    HigherLower
  },
  computed: {
    ...mapGetters(["getActiveGame", "getCardsByRowId"]),
    cards() {
      // noinspection JSValidateTypes
      return this.rowId !== -1
        ? this.getCardsByRowId(this.rowId)
        : [{ signature: null }];
    }
  }
};
</script>

<style scoped>
#container {
  display: inline-flex;
  padding: 2px;
}
svg {
  padding: 1px;
}
</style>
