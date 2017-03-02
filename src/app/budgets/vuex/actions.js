import moment from 'moment';
import { guid } from '../../../utils';
import { saveBudget, fetchBudgets, saveCategory, fetchCategories } from '../api';

const verifyUniqueMonth = (budgets, budget) => {
  // accepts a list of budgets, and the budget being updated
  // returns true if there is no date collision
  // returns false if a budget already exists in budgets with the same month as budget
  let month = moment(budget.month);
  return !Object.values(budgets).find((o) => {
    if (o.id === budget.id) return false; // it's the budget we're examining, let's not check if the months are the same
    return month.isSame(o.month, 'month');
  });
};

export const createBudget = ({ commit, state }, data) => {
  if (!verifyUniqueMonth(state.budgets, data)) {
    return Promise.reject(new Error('A budget already exists for this month.'));
  }

  let id = guid();
  let budget = Object.assign({ id: id }, data);

  budget.budgeted = 0;
  budget.spent = 0;
  budget.income = 0;

  commit('CREATE_BUDGET', { budget: budget });
  saveBudget(budget).then((value) => {
    // we saved the budget, what's next?
  });
};

export const updateBudget = ({ commit, state }, data) => {
  if (!verifyUniqueMonth(state.budgets, data)) {
    return Promise.reject(new Error('A budget already exists for this month.'));
  }

  commit('UPDATE_BUDGET', { budget: data });
  saveBudget(data);
};

export const loadBudgets = ({ state, commit }) => {
  if (!state.budgets || Object.keys(state.budgets).length === 0) {
    return fetchBudgets().then((res) => {
      commit('LOAD_BUDGETS', res);
    });
  }
};

export const updateBudgetBalance = ({ commit, getters }, data) => {
  /*
  Accepts a budget and a parameter-value to be updated
    param: budgeted|spent
    value: num
   */

  commit('UPDATE_BUDGET_BALANCE', data);
  saveBudget(getters.getBudgetById(data.budget.id));
};

export const createCategory = ({ commit, state }, data) => {
  let id = guid();
  let category = Object.assign({ id: id }, data);
  commit('CREATE_CATEGORY', { category: category });
  saveCategory(category);

  return category;
};

export const loadCategories = ({ state, commit }) => {
  if (!state.categories || Object.keys(state.categories).length === 0) {
    return fetchCategories().then((res) => {
      commit('LOAD_CATEGORIES', res);
    });
  }
};

export const createBudgetCategory = ({ commit, dispatch, getters }, data) => {
  // create an empty budget categories object if it doesn't exist
  if (!data.budget.budgetCategories || Object.keys(data.budget.budgetCategories).length === 0) {
    commit('CREATE_EMPTY_BUDGET_CATEGORY_OBJECT', data.budget);
  }

  let id = guid();
  let budgetCategory = Object.assign({ id: id }, data.budgetCategory);

  commit('CREATE_BUDGET_CATEGORY', { budget: data.budget, budgetCategory: budgetCategory });

  // save using the budget in our store
  saveBudget(getters.getBudgetById(data.budget.id));

  dispatch('updateBudgetBalance', {
    budget: data.budget,
    param: 'budgeted',
    value: budgetCategory.budgeted
  });
};
