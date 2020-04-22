import Vue from "vue";
import Vuex from "vuex";
import tb from "./modules/tb-store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tb
  }
});
