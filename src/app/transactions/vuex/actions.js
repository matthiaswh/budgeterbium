import { guid } from '../../../utils';
import { deleteTransaction as deleteTransactionFromAPI, deleteBusiness as deleteBusinessFromAPI, fetchBusinesses, fetchTransactions, saveBusiness, saveTransaction } from '../api';

export const createTransaction = ({ commit }, data) => {
  let id = guid();
  let transaction = Object.assign({ id: id }, data);
  commit('CREATE_TRANSACTION', { transaction: transaction });
  saveTransaction(transaction);
};

export const updateTransaction = ({ commit }, data) => {
  commit('UPDATE_TRANSACTION', { transaction: data });
  saveTransaction(data);
};

export const deleteTransaction = ({ commit }, data) => {
  commit('DELETE_TRANSACTION', { transaction: data });
  deleteTransactionFromAPI(data);
};

export const loadTransactions = ({ state, commit }) => {
  // loads transactions if they're not already loaded
  if (!state.transactions || Object.keys(state.transactions).length === 0) {
    return fetchTransactions().then((res) => {
      commit('LOAD_TRANSACTIONS', res);
    });
  }
};

export const createBusiness = ({ commit, state }, data) => {
  let id = guid();
  let business = Object.assign({ id: id }, data);
  commit('CREATE_BUSINESS', { business: business });
  saveBusiness(business);

  return business;
};

export const loadBusinesses = ({ state, commit }) => {
  // loads businesses if they're not already loaded
  if (!state.businesses || Object.keys(state.businesses).length === 0) {
    return fetchBusinesses().then((res) => {
      commit('LOAD_BUSINESSES', res);
    });
  }
};

export const deleteBusiness = ({ commit }, data) => {
  commit('DELETE_BUSINESS', { business: data });
  deleteBusinessFromAPI(data);
};
