<template>
  <tr class="transaction">
    <td>
      <span class="subtitle is-5">{{ value.date | moment('YYYY-MM-DD') }}</span>
    </td>
    <td><span class="subtitle is-5">{{ getBusinessById(value.business).name }}</span></td>
    <td><span class="subtitle is-5">{{ getCategoryById(value.category).name }}</span></td>
    <td><span class="subtitle is-5">{{ getAccountById(value.account).name }}</span></td>
    <td><span class="subtitle is-5">{{ value.note }}</span></td>
    <td><span class="subtitle is-5" v-if="value.amount < 0">${{ value.amount }}</span></td>
    <td><span class="subtitle is-5" v-if="value.amount > 0">${{ value.amount }}</span></td>
    <td><a class='button' @click.prevent="$emit('edit-transaction')">Edit</a></td>
  </tr>
</template>

<script>
import { moment } from '../../../filters';
import { mapGetters } from 'vuex';

export default {
  name: 'transaction',

  props: ['value'],

  filters: {
    moment
  },

  computed: {
    ...mapGetters([
      'getCategoryById',
      'getAccountById',
      'getBusinessById'
    ])
  }
};
</script>
