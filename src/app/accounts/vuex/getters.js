export default {
  getAccountById: (state, getters) => (accountId) => {
    return state.accounts && accountId in state.accounts ? state.accounts[accountId] : false;
  }
};
