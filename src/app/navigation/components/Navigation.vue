<template>
  <div id="navigation-view">
    <ul>
      <li><router-link :to="{ name: 'accountsList' }">Accounts</router-link></li>
      <li><router-link :to="{ name: 'budgetsList' }">Budgets</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigation'
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
    }
  }
</style>
