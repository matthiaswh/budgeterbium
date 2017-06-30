<template>
  <div id="budget-create-edit-view">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Add Budget</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'budgetsList' }" class="button">View all budgets &#8630;</router-link>
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-6">
        <form class="form" @submit.prevent="processSave">
          <label for="month" class="label">Month</label>
          <p class="control has-icon has-addons">
            <datepicker name="month" input-class="input" format="MMMM yyyy" v-model="selectedBudget.month"></datepicker>
            <span class="icon">
              <i class="fa fa-calendar" aria-hidden="true"></i>
            </span>
            <button class="button is-primary">Submit</button>
          </p>
          <span class="help" v-if="!editing">To add budget items you must first save the budget.</span>
          <router-link :to="{ name: 'budgetsList' }"><button class="button is-link">Cancel</button></router-link>
        </form>
      </div>
    </div>

    <div v-if="editing">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Budgeted</p>
            <p class="title">${{ selectedBudget.budgeted }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Spent</p>
            <p class="title">${{ selectedBudget.spent }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Income</p>
            <p class="title">${{ selectedBudget.income }}</p>
          </div>
        </div>
      </nav>

      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budgeted</th>
            <th>Spent</th>
            <th>Remaining</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="value, key in selectedBudget.budgetCategories"
          >
            <component
              :is="budgetCategoryComponent(value)"
              v-model="value"
              v-on:update-budget-category="saveBudgetCategory"
              v-on:edit-budget-category="activeBudgetCategory = value"
            ></component>
          </template>
          <CreateUpdateBudgetCategory v-on:add-budget-category="addBudgetCategory"></CreateUpdateBudgetCategory>
        </tbody>
        <tfoot>
          <tr>
            <td>
              Copy entire budget from:
              <select
                class="select"
                @change="processDuplicateBudget($event.target.value)"
              >
                <option
                  v-for="value, key in sortedBudgets"
                  :value="value.id"
                >
                  {{ value.month | moment }}
                </option>
              </select>
            </td>
            <td>${{ selectedBudget.budgeted }}</td>
            <td>${{ selectedBudget.spent }}</td>
            <td>${{ selectedBudget.budgeted + selectedBudget.spent }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

    </div>


  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';

import CreateUpdateBudgetCategory from './CreateUpdateBudgetCategory';
import BudgetCategory from './BudgetCategory';
import { moment } from '../../../filters';
import { sortObjects } from '../../../utils';

export default {
  name: 'budget-create-edit-view',

  components: {
    Datepicker,
    CreateUpdateBudgetCategory,
    BudgetCategory
  },

  data: () => {
    return {
      selectedBudget: {},
      editing: false,
      activeBudgetCategory: null,
      lastBudget: null
    };
  },

  filters: {
    moment
  },

  mounted () {
    if ('budgetId' in this.$route.params) {
      this.loadBudgets().then(() => {
        let selectedBudget = this.getBudgetById(this.$route.params.budgetId);
        if (selectedBudget) {
          this.editing = true;
          this.selectedBudget = Object.assign({}, selectedBudget);
        }
      });
    }
  },

  methods: {
    ...mapActions([
      'createBudget',
      'updateBudget',
      'loadBudgets',
      'createBudgetCategory',
      'updateBudgetCategory',
      'duplicateBudget'
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
    },

    addBudgetCategory (budgetCategory) {
      if (!budgetCategory.category) return;

      this.createBudgetCategory({
        budget: this.selectedBudget,
        budgetCategory: {
          category: budgetCategory.category.id,
          budgeted: budgetCategory.budgeted,
          spent: 0
        }
      }).then(() => {
        this.selectedBudget = Object.assign({}, this.getBudgetById(this.$route.params.budgetId));
      });
    },

    saveBudgetCategory (budgetCategory) {
      // format it how our action expects
      budgetCategory.category = budgetCategory.category.id;
      this.updateBudgetCategory({
        budget: this.selectedBudget,
        budgetCategory: budgetCategory
      }).then(() => {
        this.selectedBudget = Object.assign({}, this.getBudgetById(this.$route.params.budgetId));
      });
    },

    budgetCategoryComponent (budgetCategory) {
      return this.activeBudgetCategory && this.activeBudgetCategory === budgetCategory ? 'create-update-budget-category' : 'budget-category';
    },

    processDuplicateBudget (budgetId) {
      if (confirm('Are you sure you want to duplicate that budget? Doing this will overwrite all existing data for this month (transaction data will NOT be erased).')) {
        this.duplicateBudget({
          budget: this.selectedBudget,
          baseBudget: this.getBudgetById(budgetId)
        }).then((budget) => {
          this.selectedBudget = budget;
        });
      }
    }
  },

  computed: {
    ...mapGetters([
      'getBudgetById',
      'getCategoryById'
    ]),

    ...mapState({
      'budgets': state => state.budgets.budgets
    }),

    sortedBudgets () {
      return sortObjects(this.budgets, 'month', true);
    }
  }
};
</script>
