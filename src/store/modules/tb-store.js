import * as types from "../mutation-types";
import { drawCards, putBackInDeck } from "../deck";
//Note: I was using a node.js server to control the deck before, but i've moved it all into "../deck.js"

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
    let cards = drawCards(5, true);
    if (cards) {
      commit(types.INITIALISE, cards);
    } else {
      commit(types.REGISTER_ERROR, "Not enough cards left in the deck");
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
  async returnCards({ getters }, rowId) {
    const cards = getters.getRowById(rowId).cards;
    putBackInDeck(cards);
  },
  async draw({ commit }, payload) {
    let card = drawCards(1, false);
    if (card) {
      payload.card = card[0];

      if (payload.wantHigher === null) {
        commit(types.RESET_ROW, payload);
      } else {
        commit(types.GUESS_CARD, payload);
      }
    } else {
      commit(types.REGISTER_ERROR, "No cards left in the deck.");
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

    //if guessed wrong, store the wrong card and give and error
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
