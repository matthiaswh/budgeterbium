import localforage from 'localforage';
import { processAPIData } from '../../utils';

const BUDGET_NAMESPACE = 'BUDGET-';
const CATEGORY_NAMESPACE = 'CATEGORY-';

export const saveBudget = (budget) => {
  budget = Object.assign({}, budget); // clone our object so we can manipulate it before saving
  budget.month = budget.month.toJSON();

  return localforage.setItem(
    BUDGET_NAMESPACE + budget.id,
    budget
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('had a little trouble saving that budget', err);
  });
};

export const fetchBudgets = () => {
  return localforage.startsWith(BUDGET_NAMESPACE).then((res) => {
    let budgets = processAPIData(res);
    Object.keys(budgets).forEach((o) => {
      budgets[o].month = new Date(budgets[o].month);
    });

    return budgets;
  });
};

export const saveCategory = (category) => {
  return localforage.setItem(
    CATEGORY_NAMESPACE + category.id,
    category
  ).then((value) => {
    return value;
  }).catch((err) => {
    console.log('category problems abound! ', err);
  });
};

export const fetchCategories = () => {
  return localforage.startsWith(CATEGORY_NAMESPACE).then((res) => {
    return processAPIData(res);
  });
};
