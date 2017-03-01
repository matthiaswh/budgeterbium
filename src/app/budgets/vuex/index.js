import * as actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  budgets: {},
  categories: {}
};

export default {
  state,
  actions,
  mutations,
  getters
};
