<template>
  <div>
    <ErrorMessage v-if="showError" :height="height" />
    <CardRow
      v-for="row in getRows"
      :key="row.id"
      :row-id="row.id"
      :height="height"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorMessage from "./ErrorMessage";
import CardRow from "./CardRow";

export default {
  name: "Game",
  components: { ErrorMessage, CardRow },
  computed: {
    ...mapGetters(["getRows", "getErrorCard"]),
    showError() {
      return this.getErrorCard.signature !== undefined;
    }
  },

  props: {
    height: Number
  }
};
</script>

<style scoped></style>
