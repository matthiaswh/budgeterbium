import { guid } from '../../../utils';
import { deleteAccount as deleteAccountFromAPI, saveAccount, fetchAccounts } from '../api';

export const createAccount = ({ commit }, data) => {
  let id = guid();
  let account = Object.assign({ id: id }, data);
  commit('CREATE_ACCOUNT', {account: account});
  saveAccount(account).then((value) => {
    // we've saved the account, what now
  });
};

export const updateAccount = ({ commit }, data) => {
  commit('UPDATE_ACCOUNT', {account: data});
  saveAccount(data);
};

export const deleteAccount = ({ commit }, data) => {
  commit('DELETE_ACCOUNT', { account: data });
  deleteAccountFromAPI(data);
};

export const loadAccounts = ({ state, commit }) => {
  // loads accounts only if they are not already loaded
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    return fetchAccounts().then((res) => {
      commit('LOAD_ACCOUNTS', res);
    });
  }
};

export const updateAccountBalance = ({ commit, getters }, data) => {
  /*
  Accepts a transaction amount and sums that with the current balance
    account: account
    amount: num
   */
  commit('UPDATE_ACCOUNT_BALANCE', data);
  saveAccount(getters.getAccountById(data.account.id)); // save the updated account
};
