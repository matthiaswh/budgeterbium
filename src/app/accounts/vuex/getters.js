export default {
  getAccountById: (state, getters) => (accountId) => {
    return state.accounts && accountId in state.accounts ? state.accounts[accountId] : false;
  },

  getAccountSelectList: (state, getters) => {
    return state.accounts && Object.keys(state.accounts).length > 0 ? Object.values(state.accounts) : [];
  }
};
