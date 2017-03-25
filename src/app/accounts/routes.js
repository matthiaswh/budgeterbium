import * as components from './components';

export default [
  {
    path: '/',
    component: components.AccountsList,
    name: 'accountsList'
  },
  {
    path: '/accounts/create',
    component: components.CreateUpdateAccount,
    name: 'createAccount'
  },
  {
    path: '/accounts/:accountId/update',
    component: components.CreateUpdateAccount,
    name: 'updateAccount',
    props: true
  }
];
