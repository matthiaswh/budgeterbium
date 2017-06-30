<template>
  <tr class="budget-item">
    <td><span class="subtitle is-5">{{ getCategoryById(value.category).name }}</span></td>
    <td><span class="subtitle is-5">${{ value.budgeted }}</span></td>
    <td><span class="subtitle is-5">${{ value.spent }}</span></td>
    <td><span class="subtitle is-5">${{ value.budgeted + value.spent }}</span></td>
    <td><a class='button' @click="$emit('edit-budget-category')">Edit</a></td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'budget-item',

  props: ['value'],

  computed: {
    ...mapGetters(['getCategoryById'])
  }
};
</script>
