<template>
  <div id="accounts-create-edit-view">
    You can create and edit accounts with me, yippee!

    <router-link :to="{ name: 'accountsListView' }">View all accounts</router-link>

    <form class="form" @submit.prevent="saveNewAccount">
      <label for="name" class="label">Name</label>
      <p class="control">
        <input type="text" class="input" name="name" v-model="newAccount.name">
      </p>
      <label for="category" class="label">Category</label>
      <p class="control">
        <span class="select">
          <select name="category" v-model="newAccount.category">
            <option v-for="value, key in categories" :value="key">{{ value }}</option>
          </select>
        </span>
      </p>
      <label for="balance" class="label">Balance</label>
      <p class="control">
        <input type="text" class="input" name="balance" v-model="newAccount.balance">
      </p>
      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'accountsListView' }"><button class="button is-link">Cancel</button></router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { CATEGORIES } from '../../../consts';

export default {
  name: 'accounts-create-edit-view',

  data: () => {
    return {
      categories: CATEGORIES,
      newAccount: {}
    };
  },

  methods: {
    ...mapActions([
      'addAccount'
    ]),

    saveNewAccount () {
      this.addAccount(this.newAccount).then(() => {
        this.newAccount = {};
        this.$router.push({ name: 'accountsListView' });
      });
    }
  }
};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>
