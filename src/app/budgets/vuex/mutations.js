import Vue from 'vue';

const forceBudgetFloats = (o) => {
  o.budgeted = parseFloat(o.budgeted);
  o.income = parseFloat(o.income);
  o.spent = parseFloat(o.spent);

  if (o.budgetCategories && Object.keys(o.budgetCategories).length > 0) {
    Object.values(o.budgetCategories).forEach((bc) => { forceBudgetCategoryFloats(bc); });
  }
};

const forceBudgetCategoryFloats = (o) => {
  o.budgeted = parseFloat(o.budgeted);
  o.spent = parseFloat(o.spent);
};

export default {
  CREATE_BUDGET (state, payload) {
    forceBudgetFloats(payload.budget);
    state.budgets[payload.budget.id] = payload.budget;
  },

  UPDATE_BUDGET (state, payload) {
    forceBudgetFloats(payload.budget);
    state.budgets[payload.budget.id] = payload.budget;
  },

  LOAD_BUDGETS (state, payload) {
    state.budgets = payload;

    Object.values(state.budgets).forEach((o) => {
      forceBudgetFloats(o);
    });
  },

  UPDATE_BUDGET_BALANCE (state, payload) {
    if (!(payload['param'] === 'budgeted' || payload['param'] === 'spent') || payload['param'] === 'income') {
      throw new Error('UPDATE_BUDGET_BALANCE expects either { param: "budgeted" } or { param: "spent" } or { param: "income" }');
    }

    state.budgets[payload.budget.id][payload.param] += parseFloat(payload.value);
  },

  CREATE_CATEGORY (state, payload) {
    Vue.set(state.categories, payload.category.id, payload.category);
  },

  UPDATE_CATEGORY (state, payload) {
    state.categories[payload.category.id] = payload.category;
  },

  LOAD_CATEGORIES (state, payload) {
    state.categories = payload;
  },

  CREATE_EMPTY_BUDGET_CATEGORY_OBJECT (state, payload) {
    Vue.set(state.budgets[payload.id], 'budgetCategories', {});
  },

  CREATE_BUDGET_CATEGORY (state, payload) {
    forceBudgetCategoryFloats(payload.budgetCategory);
    Vue.set(state.budgets[payload.budget.id].budgetCategories, payload.budgetCategory.id, payload.budgetCategory);
  },

  UPDATE_BUDGET_CATEGORY (state, payload) {
    forceBudgetCategoryFloats(payload.budgetCategory);
    state.budgets[payload.budget.id].budgetCategories[payload.budgetCategory.id] = payload.budgetCategory;
  },

  UPDATE_BUDGET_CATEGORY_BALANCE (state, payload) {
    if (!(payload['param'] === 'budgeted' || payload['param'] === 'spent')) {
      throw new Error('UPDATE_BUDGET_BALANCE expects either { param: "budgeted" } or { param: "spent" }');
    }

    state.budgets[payload.budget.id].budgetCategories[payload.budgetCategory.id][payload.param] += parseFloat(payload.value);
  }
};
