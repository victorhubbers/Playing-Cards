import axios from "axios";

const state = {
  rows: [
    {
      id: 0,
      cards: []
    },
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
    }
  ],
  active: false,
  error: "",
  errorCard: {}
};

const getters = {
  getRows: state => state.rows,
  getError: state => {
    return { error: state.error, errorCard: state.errorCard };
  },
  getActiveGame: state => state.active
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
  },
  async drawHigher({ commit }, payload) {
    console.log(payload.rowId);
    try {
      const response = await axios.get(
        "http://localhost:3000/deck/cards?amount=1"
      );

      commit("addCardToRow", {
        card: response.data[0],
        rowId: payload.rowId,
        side: payload.side,
        wantHigher: true
      });
    } catch (e) {
      commit("registerError", e.response);
    }
  },
  async drawLower({ commit }, payload) {
    console.log(payload);
    try {
      const response = await axios.get(
        "http://localhost:3000/deck/cards?amount=1"
      );

      commit("addCardToRow", {
        card: response.data[0],
        rowId: payload.rowId,
        side: payload.side,
        wantHigher: false
      });
    } catch (e) {
      commit("registerError", e.response);
    }
  }
  // async draw({ commit }, ){
  //
  // }
};

const mutations = {
  initialise: (state, newCards) => {
    const length = newCards.length;
    for (let i = 0; i < length; i++) {
      state.rows[i].cards = newCards.splice(-1);
    }
    state.active = true;
  },
  registerError: (state, errorMsg) => {
    console.log(errorMsg);
    state.error = errorMsg.data;
  },
  addCardToRow: (state, payload) => {
    const card = payload.card;
    const rowId = payload.rowId;
    const side = payload.side;
    const wantHigher = payload.wantHigher;

    let row = state.rows[rowId];
    let endCard;
    if (side === "R") {
      endCard = row.cards[row.cards.length - 1];
    } else {
      endCard = row.cards[0];
    }
    let result;
    if (wantHigher) {
      result = card.value > endCard.value;
    } else {
      result = card.value < endCard.value;
    }

    if (result) {
      if (side === "R") {
        row.cards.push(card);
      } else {
        row.cards.unshift(card);
      }
    } else {
      state.errorCard = card;
      state.error = "RIP";
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
