<template>
  <div id="navigation-view">
    <ul>
      <li>
        <router-link :to="{ name: 'accountsList' }">Accounts</router-link>
        <ul>
          <li
            v-for="account in accounts"
          >
            <router-link :to="{ name: 'updateAccount', params: { accountId: account.id } }">
              {{ account.name }} <span>${{ account.balance }}</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li><router-link :to="{ name: 'budgetsList' }">Budgets</router-link></li>
      <li><router-link :to="{ name: 'transactionsList' }">Transactions</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'navigation',

  mounted () {
    this.loadAccounts();
  },

  methods: {
    ...mapActions(['loadAccounts'])
  },

  computed: {
    ...mapState({
      accounts: state => state.accounts.accounts
    })
  }
};
</script>

<style scoped lang='scss'>
  ul {
    margin-top: 50px;

    li {
      border-bottom: 2px solid rgb(31, 78, 93);
      font-size: 1.8em;
      padding-left: 20px;
      margin: 18px 20px;

      a {
        color: #ffffff;
      }

      ul {
        margin-top: 20px;

        li {
          font-size: 0.6em;
          border: none;

          span {
            float: right;
          }
        }
      }
    }
  }
</style>
