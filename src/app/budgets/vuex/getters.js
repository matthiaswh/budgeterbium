import moment from 'moment';

export default {
  getBudgetById: (state, getters) => (budgetId) => {
    return state.budgets && budgetId in state.budgets ? state.budgets[budgetId] : false;
  },

  getCategoryById: (state, getters) => (categoryId) => {
    return state.categories && categoryId in state.categories ? state.categories[categoryId] : false;
  },

  getCategorySelectList: (state, getters) => {
    return state.categories && Object.keys(state.categories).length > 0 ? Object.values(state.categories) : [];
  },

  getBudgetCategoryById: (state, getters) => (budgetId, budgetCategoryId) => {
    return state.budgets && budgetId in state.budgets
      ? state.budgets[budgetId].budgetCategories && budgetCategoryId in state.budgets[budgetId].budgetCategories
        ? state.budgets[budgetId].budgetCategories[budgetCategoryId]
        : false
      : false;
  },

  getBudgetCategoryByBudgetAndCategory: (state, getters) => (budgetId, categoryId) => {
    let budget = getters.getBudgetById(budgetId);
    if (!budget) return false;

    return budget.budgetCategories ? Object.values(budget.budgetCategories).find((o) => { return o.category === categoryId; }) : false;
  },

  getBudgetByDate: (state, getters) => (date) => {
    if (!state.budgets) return false;

    let month = moment(date);
    return Object.values(state.budgets).find((o) => {
      return month.isSame(o.month, 'month'); // remember this checks month and year are the same https://momentjs.com/docs/#/query/is-same/
    });
  }
};
