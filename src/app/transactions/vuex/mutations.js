import Vue from 'vue';

const forceFloats = (o) => {
  o.amount = parseFloat(o.amount);
};

export default {
  CREATE_TRANSACTION (state, payload) {
    forceFloats(payload.transaction);
    Vue.set(state.transactions, payload.transaction.id, payload.transaction);
  },

  UPDATE_TRANSACTION (state, payload) {
    forceFloats(payload.transaction);
    state.transactions[payload.transaction.id] = payload.transaction;
  },

  DELETE_TRANSACTION (state, payload) {
    Vue.delete(state.transactions, payload.transaction.id);
  },

  LOAD_TRANSACTIONS (state, payload) {
    state.transactions = payload;

    Object.values(state.transactions).forEach((o) => { forceFloats(o); });
  },

  LOAD_BUSINESSES (state, payload) {
    state.businesses = payload;
  },

  CREATE_BUSINESS (state, payload) {
    state.businesses[payload.business.id] = payload.business;
  },

  DELETE_BUSINESS (state, payload) {
    Vue.delete(state.businesses, payload.business.id);
  }
};
