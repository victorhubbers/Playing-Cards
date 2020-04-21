import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rows: [
      {
        id: 1,
        cards: []
      },
      {
        id: 2,
        cards: []
      },
      {
        id: 3,
        cards: []
      },
      {
        id: 4,
        cards: []
      },
      {
        id: 5,
        cards: []
      }
    ],
    deckId: ""
  },
  mutations: {
    initialise: (state, cards) => {
      for (let i = 0; i < cards.length; i++) {
        state.rows[i].cards = [].push(cards[i]);
      }
      console.log(state);
    }
  },
  actions: {
    async startGame({ commit }) {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/deck/new/draw/?count=5"
      );

      commit("initialise", response.data.cards);
    }
  },
  modules: {}
});
