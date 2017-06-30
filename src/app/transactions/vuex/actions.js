import { guid } from '../../../utils';
import { deleteTransaction as deleteTransactionFromAPI, deleteBusiness as deleteBusinessFromAPI, fetchBusinesses, fetchTransactions, saveBusiness, saveTransaction } from '../api';

const prepareTransaction = (getters, data) => {
  // code shared by createTransaction and updateTransaction

  // find the budget based on the date
  // we'll go ahead and do this for existing transactions in case the user changes the date
  // in the future we may want to only do it on a date change
  let budget = getters.getBudgetByDate(data.date);
  if (!budget) throw new Error('Could not find a budget for the date ' + data.date);
  data.budget = budget.id;
  console.log(data.budget);

  // tell the budget category that the transaction is occurring so it can update its amount
  let budgetCategory = getters.getBudgetCategoryByBudgetAndCategory(budget.id, data.category);
  if (!budgetCategory) throw new Error('Could not find a budget category for ' + data.category);
  // don't dispatch yet, we are just preparing data here

  return { preparedData: data, budgetCategory: budgetCategory, budget: budget };
};

export const createTransaction = ({ commit, dispatch, getters }, data) => {
  let { preparedData, budgetCategory, budget } = prepareTransaction(getters, data);

  let id = guid();
  let transaction = Object.assign({ id: id }, preparedData);

  // update the budget category, which updates the budget spend total
  dispatch('updateBudgetCategorySpent', {
    budgetCategory: budgetCategory,
    budget: budget,
    amount: transaction.amount
  });

  // update the account balance
  dispatch('updateAccountBalance', {
    account: getters.getAccountById(data.account),
    amount: transaction.amount
  });

  commit('CREATE_TRANSACTION', { transaction: transaction });
  saveTransaction(transaction);
};

export const updateTransaction = ({ commit, getters }, data) => {
  // TODO: handle any change the user could make here! Including
  // updating budgets or account balances

  let { preparedData } = prepareTransaction(getters, data);

  commit('UPDATE_TRANSACTION', { transaction: preparedData });
  saveTransaction(preparedData);
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
