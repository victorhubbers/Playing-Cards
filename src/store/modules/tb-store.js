import axios from "axios";
import * as types from "../mutation-types";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000"
    : "http://localhost:3000";

const initialState = () => ({
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
});

const state = initialState();

const getters = {
  getRows: state => state.rows,
  getRowById: state => id => state.rows.find(row => row.id === id),
  getRowLength: (state, getters) => id => getters.getRowById(id).cards.length,
  getCardsByRowId: (state, getters) => id => getters.getRowById(id).cards,
  getError: state => state.error,
  getErrorCard: state => state.errorCard,
  getActiveGame: state => state.active
};

const actions = {
  async startGame({ commit }) {
    try {
      const response = await axios.get(
        apiUrl + "/deck/cards?amount=5&new=true"
      );

      commit(types.INITIALISE, response.data);
    } catch (e) {
      commit(types.REGISTER_ERROR, e.response);
    }
  },
  reset({ commit }) {
    commit("RESET");
  },
  guessHigher({ dispatch }, payload) {
    payload.wantHigher = true;
    dispatch("draw", payload);
  },
  guessLower({ dispatch }, payload) {
    payload.wantHigher = false;
    dispatch("draw", payload);
  },
  clearRow({ dispatch }, rowId) {
    const payload = { rowId, wantHigher: null };
    dispatch("returnCards", rowId);
    dispatch("draw", payload);
  },
  async returnCards({ commit, getters }, rowId) {
    try {
      const cards = getters.getRowById(rowId).cards;
      await axios.post(apiUrl + "/deck/cards", { cards });
    } catch (e) {
      commit(types.REGISTER_ERROR, e.response);
    }
  },
  async draw({ commit }, payload) {
    try {
      const response = await axios.get(apiUrl + "/deck/cards?amount=1");
      payload.card = response.data[0];
      if (payload.wantHigher === null) {
        commit(types.RESET_ROW, payload);
      } else {
        commit(types.GUESS_CARD, payload);
      }
    } catch (e) {
      commit(types.REGISTER_ERROR, e.response);
    }
  }
};

const mutations = {
  [types.INITIALISE]: (state, newCards) => {
    for (let i = 0; i < state.rows.length; i++) {
      state.rows[i].cards = newCards.splice(-1);
    }
    state.active = true;
  },
  [types.RESET]: state => {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  [types.RESET_ROW]: (state, payload) => {
    let row = state.rows.find(row => row.id === payload.rowId);
    row.cards = [payload.card];
    state.errorCard = {};
  },
  [types.REGISTER_ERROR]: (state, errorMsg) => {
    if (errorMsg === undefined) {
      errorMsg = { data: "Network error (server might be down)" };
    }
    state.error = errorMsg.data;
  },
  [types.GUESS_CARD]: (state, payload) => {
    const card = payload.card;
    const rowId = payload.rowId;
    const side = payload.side;
    const wantHigher = payload.wantHigher;

    //find out which card to compare to
    let row = state.rows.find(row => row.id === rowId);
    let endCard;
    if (side === "R") {
      endCard = row.cards[row.cards.length - 1];
    } else {
      endCard = row.cards[0];
    }

    //check whether user guessed correctly
    let result;
    if (wantHigher) {
      result = card.value > endCard.value;
    } else {
      result = card.value < endCard.value;
    }

    //add the card
    if (side === "R") {
      row.cards.push(card);
    } else {
      row.cards.unshift(card);
    }

    //if guessed wrong, store the wrong card
    const errorCard = { ...card, rowId };
    if (!result) {
      state.errorCard = errorCard;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
