import { routes as accounts } from './accounts';
import { routes as transactions } from './transactions';
import { routes as budgets } from './budgets';

export default [ ...accounts, ...transactions, ...budgets ];
