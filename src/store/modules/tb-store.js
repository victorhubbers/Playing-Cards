import axios from "axios";
import * as types from "../mutation-types";

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
  getError: state => state.error,
  getErrorCard: state => state.errorCard,
  getActiveGame: state => state.active
};

const actions = {
  async startGame({ commit }) {
    try {
      const response = await axios.get(
        "http://localhost:3000/deck/cards?amount=5"
      );

      commit(types.INITIALISE, response.data);
    } catch (e) {
      commit(types.REGISTER_ERROR, e.response);
    }
  },
  reset({ commit }) {
    commit("RESET");
  },
  async guessHigher({ dispatch }, payload) {
    payload.wantHigher = true;
    dispatch("draw", payload);
  },
  async guessLower({ dispatch }, payload) {
    payload.wantHigher = false;
    dispatch("draw", payload);
  },
  async draw({ commit }, payload) {
    console.log(payload);
    try {
      const response = await axios.get(
        "http://localhost:3000/deck/cards?amount=1"
      );
      payload.card = response.data[0];
      commit(types.GUESS_CARD, payload);
    } catch (e) {
      commit(types.REGISTER_ERROR, e.response);
    }
  }
};

const mutations = {
  [types.INITIALISE]: (state, newCards) => {
    const length = newCards.length;
    for (let i = 0; i < length; i++) {
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
  [types.REGISTER_ERROR]: (state, errorMsg) => {
    console.log(errorMsg);
    state.error = errorMsg.data;
  },
  [types.GUESS_CARD]: (state, payload) => {
    const card = payload.card;
    const rowId = payload.rowId;
    const side = payload.side;
    const wantHigher = payload.wantHigher;

    //find out which card to compare to
    let row = state.rows[rowId];
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
    if (!result) {
      state.errorCard = card;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
