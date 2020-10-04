<template>
  <div id="error">
    <div id="error-banner">
      <h2>Wrong Guess!</h2>
      <VuePlayingCard
        style="margin: 5px 0"
        :signature="getErrorCard.signature"
        :height="1.2 * height"
      />
      <div id="error-message">
        <p>This row was {{ rowLength }} cards long.</p>
        <v-btn
          depressed
          dark
          color="#FF4444"
          @click="clearRow(getErrorCard.rowId)"
          small
          >Continue</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    rowLength() {
      // noinspection JSValidateTypes
      return this.getRowLength(this.getErrorCard.rowId);
    }
  },
  methods: {
    ...mapActions(["clearRow"])
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
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

p {
  font-size: 1rem;
  margin-bottom: 10px;
}
</style>
