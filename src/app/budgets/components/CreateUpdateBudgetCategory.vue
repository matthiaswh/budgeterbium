<template>
  <tr id="budget-category-create-edit-view">

      <td>
        <multiselect
          :value="budgetCategory.category"
          @input="updateCategorySelection"
          :taggable="true"
          @tag="handleCreateCategory"
          :options="getCategorySelectList"
          placeholder="Select or create a category"
          label="name"
          track-by="id"
        ></multiselect>
      </td>

      <td>
        <p class="control has-icon">
          <input type="number" step="0.01" class="input" v-model="budgetCategory.budgeted" />
          <span class="icon">
            <i class="fa fa-usd" aria-hidden="true"></i>
          </span>
        </p>
      </td>

      <td>
        <span class="subtitle is-5">${{ budgetCategory.spent }}</span>
      </td>

      <td></td>

      <td>
        <a class="button is-primary" @click.prevent="processSave">
          {{ editing ? 'Save' : 'Add' }}
        </a>
      </td>

  </tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
  name: 'budget-category-create-edit-view',

  components: {
    Multiselect
  },

  props: [
    'value'
  ],

  data: () => {
    return {
      budgetCategory: {},
      editing: false
    };
  },

  mounted () {
    this.loadCategories();
    if (this.value) {
      this.budgetCategory = Object.assign({}, this.value);

      // we need the selected category name and ID, but the budgetCategory object only holds the ID by default
      this.budgetCategory.category = this.getCategoryById(this.budgetCategory.category);

      this.editing = true;
    }
  },

  methods: {
    ...mapActions([
      'createCategory',
      'loadCategories'
    ]),

    processSave () {
      // we are passing the saves up to the budget because this budget
      // category view isn't aware of its parent budget object
      if (this.editing) {
        this.$emit('update-budget-category', this.budgetCategory);
      } else {
        this.$emit('add-budget-category', this.budgetCategory);
        this.budgetCategory = {};
      }
    },

    handleCreateCategory (category) {
      let newCategory = { name: category };
      this.createCategory(newCategory).then((val) => {
        this.updateCategorySelection(val);
      });
    },

    updateCategorySelection (category) {
      // if using v-model and not using Vue.set directly, vue-multiselect seems to struggle to properly
      // keep its internal value up to date with the value in our component. So we're skipping v-model
      // and handling updates manually.
      this.$set(this.budgetCategory, 'category', category);
    }
  },

  computed: {
    ...mapGetters([
      'getCategorySelectList',
      'getCategoryById'
    ])
  }
};
</script>
