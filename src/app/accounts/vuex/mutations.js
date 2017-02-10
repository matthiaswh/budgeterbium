import { guid } from '../../../utils';

export default {
  ADD_ACCOUNT (state, payload) {
    let id = guid();
    state.accounts[id] = Object.assign({ id: id }, payload.account);
  }
};
