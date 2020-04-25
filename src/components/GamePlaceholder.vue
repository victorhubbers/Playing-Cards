<template>
  <div>
    <CardRow :height="height" />
    <CardRow :height="height" />
    <CardRow :height="height" />
    <CardRow :height="height" />
    <CardRow :height="height" />
  </div>
</template>

<script>
import CardRow from "./CardRow";

export default {
  name: "GamePlaceholder",
  components: { CardRow },
  props: {
    height: Number
  }
};
</script>

<style scoped></style>
