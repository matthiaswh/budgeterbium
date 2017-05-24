import Vue from 'Vue';

export default {
  CREATE_TRANSACTION (state, payload) {
    Vue.set(state.transactions, payload.transaction.id, payload.transaction);
  },

  UPDATE_TRANSACTION (state, payload) {
    state.transactions[payload.transaction.id] = payload.transaction;
  },

  DELETE_TRANSACTION (state, payload) {
    Vue.delete(state.transactions, payload.transaction.id);
  },

  LOAD_TRANSACTIONS (state, payload) {
    state.transactions = payload;
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
