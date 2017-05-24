export default {
  getBusinessSelectList: (state, getters) => {
    return state.businesses && Object.keys(state.businesses).length > 0 ? Object.values(state.businesses) : [];
  },

  getBusinessById: (state, getters) => (businessId) => {
    return state.businesses && businessId in state.businesses ? state.businesses[businessId] : false;
  }
};
