<template>
  <div id="budget-category-create-edit-view">
    <form class="form" @submit.prevent="processSave">
      <div class="control is-horizontal">
        <div class="control is-grouped">
          <div class="control is-expanded">
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
          </div>
          <div class="control is-expanded">
            $<input type="number" class="input" v-model="budgetCategory.budgeted" />
          </div>
          <div class="control is-expanded">
            {{ budgetCategory.spent }}
          </div>
          <button @click.prevent="processSave">Add</button>
        </div>
      </div>
    </form>
  </div>
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

  data: () => {
    return {
      budgetCategory: {}
    };
  },

  mounted () {
    this.loadCategories();
  },

  methods: {
    ...mapActions([
      'createCategory',
      'loadCategories'
    ]),

    processSave () {
      this.$emit('add-budget-category', this.budgetCategory);
      this.budgetCategory = {};
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
      'getCategorySelectList'
    ])
  }
};
</script>
