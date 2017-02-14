export const addAccount = ({ commit }, data) => {
  commit('ADD_ACCOUNT', { account: data });
};

export const updateAccount = ({ commit }, data) => {
  commit('UPDATE_ACCOUNT', { account: data });
};

export const deleteAccount = ({ commit }, data) => {
  commit('DELETE_ACCOUNT', { account: data });
};
