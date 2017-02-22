import { guid } from '../../../utils';
import { saveBudget, fetchBudgets } from '../api';

export const createBudget = ({ commit }, data) => {
  let id = guid();
  let budget = Object.assign({ id: id }, data);

  commit('CREATE_BUDGET', { budget: budget });
  saveBudget(budget).then((value) => {
    // we saved the budget, what's next?
  });
};

export const updateBudget = ({ commit }, data) => {
  commit('UPDATE_BUDGET', { budget: data });
  saveBudget(data);
};

export const loadBudgets = (state) => {
  if (!state.budgets || Object.keys(state.budgets).length === 0) {
    return fetchBudgets().then((res) => {
      state.commit('LOAD_BUDGETS', res);
    });
  }
};
