import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VuePlayingCard from "vue-playing-card";

Vue.config.productionTip = false;
Vue.use(VuePlayingCard);
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
