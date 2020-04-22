import axios from "axios";

const state = {
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
  error: ""
};

const getters = {
  getRows: state => state.rows,
  getError: state => state.error
};

const actions = {
  async startGame({ commit }) {
    try {
      const response = await axios.get(
        "http://localhost:3000/deck/cards?amount=5"
      );

      commit("initialise", response.data);
    } catch (e) {
      commit("registerError", e.response);
    }
  }
};

const mutations = {
  initialise: (state, newCards) => {
    const length = newCards.length;
    for (let i = 0; i < length; i++) {
      state.rows[i].cards = newCards.splice(-1);
    }
  },
  registerError: (state, errorMsg) => {
    state.error = errorMsg.data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
