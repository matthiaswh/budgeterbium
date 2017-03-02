<template>
  <div id="accounts-list-view">

    <nav class="level">
      <div class="level-left">
        <h1 class="title is-2">Accounts</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link :to="{ name: 'createAccount' }" class="button is-primary">Add Account +</router-link>
        </div>
      </div>
    </nav>

    <table class="table is-bordered">
      <thead>
        <tr>
          <th>Account name</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="account, key in accounts"
          :class="{ 'is-delinquent': account.balance < 0 }"
        >
          <td>
            <span class="subtitle is-5">{{ account.name }}</span>
            <span class="tag is-small ">{{ categories[account.category] }}</span>
          </td>
          <td><span class="subtitle is-5">${{ account.balance }}</span></td>
          <td>
            <router-link class="button is-primary" :to="{ name: 'updateAccount', params: { accountId: account.id } }">Edit</router-link>
            <a class="button is-danger" @click="confirmDeleteAccount(account)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CATEGORIES } from '../../../consts';

export default {
  name: 'accounts-list-view',

  data () {
    return {
      categories: CATEGORIES
    };
  },

  mounted () {
    this.loadAccounts();
  },

  methods: {
    ...mapActions([
      'deleteAccount',
      'loadAccounts'
    ]),

    confirmDeleteAccount (account) {
      if (confirm(`Are you sure you want to delete ${account.name}?`)) {
        this.deleteAccount(account);
      }
    }
  },

  computed: {
    ...mapState({
      'accounts': state => state.accounts.accounts
    })
  }
};
</script>

<style scoped lang='scss'>

</style>
