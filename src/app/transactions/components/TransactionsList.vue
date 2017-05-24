<template>
  <div id="transactions-list">
    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Transactions</h1>
      </div>
    </nav>

    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Date</th>
          <th>Business</th>
          <th>Category</th>
          <th>Account</th>
          <th>Note</th>
          <th>Debit</th>
          <th>Credit</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="transaction, key in sortedTransactions"
          :class="{ 'is-delinquent': false }"
        >
          <component
            :is="transactionComponent(transaction)"
            v-model="transaction"
            v-on:updated-transaction="activeTransaction = null"
            v-on:edit-transaction="activeTransaction = transaction"
          ></component>
        </template>
        <CreateUpdateTransaction></CreateUpdateTransaction>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import CreateUpdateTransaction from './CreateUpdateTransaction';
import Transaction from './Transaction';
import { sortObjects } from '../../../utils';

export default {
  name: 'transactions-list',

  components: {
    Transaction,
    CreateUpdateTransaction
  },

  data () {
    return {
      activeTransaction: null
    };
  },

  mounted () {
    this.loadTransactions();
  },

  methods: {
    ...mapActions([
      'createTransaction',
      'updateTransaction',
      'loadTransactions'
    ]),

    transactionComponent (transaction) {
      if (this.activeTransaction && this.activeTransaction === transaction) {
        return 'CreateUpdateTransaction';
      }
      return 'Transaction';
    }
  },

  computed: {
    ...mapState({
      'transactions': state => state.transactions.transactions
    }),

    sortedTransactions () {
      return sortObjects(this.transactions, 'date', false);
    }
  }
};
</script>

<style scoped lang='scss'>
#transactions-list {
}
</style>
