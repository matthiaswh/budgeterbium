<template>
  <div id="budgets-list">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Budgets</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'createBudget' }" class="button is-primary">Add Budget +</router-link>
        </div>
      </div>
    </nav>

    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Budget month</th>
          <th>Budgeted</th>
          <th>Spent</th>
          <th>Income</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="budget in sortedBudgets"
          :class="{ 'is-delinquent': false }"
        >
          <td>
            <span class="subtitle is-5">{{ budget.month | moment }}</span>
          </td>
          <td><span class="subtitle is-5">${{ budget.budgeted }}</span></td>
          <td><span class="subtitle is-5">${{ budget.spent }}</span></td>
          <td><span class="subtitle is-5">${{ budget.income }}</span></td>
          <td><span class="subtitle is-5">${{ budget.budgeted + budget.spent}}</span></td>
          <td>
            <router-link class="button is-primary" :to="{ name: 'updateBudget', params: { budgetId: budget.id } }">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { moment } from '../../../filters';
import { sortObjects } from '../../../utils';

export default {
  name: 'budgets-list',

  filters: {
    moment
  },

  mounted () {
    this.loadBudgets();
  },

  methods: {
    ...mapActions([
      'loadBudgets'
    ])
  },

  computed: {
    ...mapState({
      'budgets': state => state.budgets.budgets
    }),

    sortedBudgets () {
      return sortObjects(this.budgets, 'month', true);
    }
  }
};
</script>

<style scoped lang='scss'>
#budgets-list-view {
}
</style>
