<template>
  <div id="error" v-if="show">
    <div id="error-banner">
      <h3>WRONG!</h3>
      <VuePlayingCard
        :signature="getErrorCard.signature"
        :height="1.2 * height"
      />
      <div id="error-message">
        <h5>This row had a length of {{ rowLength }}</h5>
        <v-btn x-small>Clean row</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VuePlayingCard } from "vue-playing-card";

export default {
  name: "ErrorMessage",
  components: {
    VuePlayingCard
  },
  props: {
    height: Number
  },
  computed: {
    ...mapGetters(["getErrorCard", "getRowLength"]),
    show() {
      return this.getErrorCard.signature !== undefined;
    },
    rowLength() {
      // noinspection JSValidateTypes
      return this.getRowLength(this.getErrorCard.rowId);
    }
  }
};
</script>

<style scoped>
#error {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.5);
}
#error-banner {
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
