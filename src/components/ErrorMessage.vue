<template>
  <div class="error" v-if="show">
    <div class="error-banner">
      <VuePlayingCard :signature="getErrorCard.signature" />
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
  computed: {
    ...mapGetters(["getErrorCard"]),
    show() {
      return this.getErrorCard.signature !== undefined;
    }
  }
};
</script>

<style scoped>
.error {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.5);
}
.error-banner {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
