<template>
  <div id="budget-create-edit-view">
    You can create and edit budgets with me, woot!

    <router-link :to="{ name: 'budgetsList' }">View all budgets</router-link>

    <form class="form" @submit.prevent="processSave">
      <label for="month" class="label">Month</label>
      <p class="control">
        <datepicker name="month" input-class="input" format="MMMM yyyy" v-model="selectedBudget.month"></datepicker>
      </p>
      <label for="budgeted" class="label">Budgeted amount</label>
      <p class="control">
        $<input type="number" class="input" name="budgeted" v-model="selectedBudget.budgeted">
      </p>
      <p class="control">
        Spent: ${{ selectedBudget.spent }}
      </p>
      <p class="control">
        Income: ${{ selectedBudget.income }}
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'budgetsList' }"><button class="button is-link">Cancel</button></router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'budget-create-edit-view',

  components: {
    Datepicker
  },

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
      this.$router.push({ name: 'budgetsList' });
    },

    saveNewBudget () {
      this.createBudget(this.selectedBudget).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
      });
    },

    saveBudget () {
      this.updateBudget(this.selectedBudget).then(() => {
        this.resetAndGo();
      }).catch((err) => {
        alert(err);
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
