<template>
  <div id="budget-create-edit-view">
    You can create and edit budgets with me, woot!

    <form class="form" @submit.prevent="processSave">
      <label for="month" class="label">Month</label>
      <p class="control">
        <input type="text" class="input" name="month" v-model="selectedBudget.month">
      </p>
      <label for="budgeted" class="label">Budgeted amount</label>
      <p class="control">
        <input type="text" class="input" name="budgeted" v-model="selectedBudget.budgeted">
      </p>
      <p class="control">
        Spent: {{ selectedBudget.spent }}
      </p>
      <p class="control">
        Income: {{ selectedBudget.income }}
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'budget-create-edit-view',

  data: () => {
    return {
      selectedBudget: {}
    };
  },

  mounted () {
    if ('budgetId' in this.$route.params) {
      this.loadBudgets().then(() => {
        let selectedBudget = this.getBudgetById(this.$route.params.budgetId);
        if (selectedBudget) {
          this.selectedBudget = Object.assign({}, selectedBudget);
        }
      });
    }
  },

  methods: {
    ...mapActions([
      'createBudget',
      'updateBudget',
      'loadBudgets'
    ]),

    resetAndGo () {
      this.selectedBudget = {};
      // todo: redirect here
    },

    saveNewBudget () {
      this.createBudget(this.selectedBudget).then(() => {
        this.resetAndGo();
      });
    },

    saveBudget () {
      this.updateBudget(this.selectedBudget).then(() => {
        this.resetAndGo();
      });
    },

    processSave () {
      this.$route.params.budgetId ? this.saveBudget() : this.saveNewBudget();
    }
  },

  computed: {
    ...mapGetters([
      'getBudgetById'
    ])
  }
};
</script>
