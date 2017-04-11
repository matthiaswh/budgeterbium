<template>
  <div id="app">
    <div class="columns app-container">
      <div class="column is-3 sidebar">
        <span class="brand"><img src="../assets/logo.png">udgeterbium</span>
        <navigation></navigation>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation } from './navigation/components';

export default {
  name: 'app',
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .columns.app-container {
    flex: 1;
    display: block;
    padding: 0;
    margin: 0;
  }
  @media only screen and (min-device-width : 769px) {
    .columns.app-container {
      display: flex;
    }
  }
  .columns.app-container:last-child {
    margin-bottom: 0;
  }
  .sidebar {
    background-color: #02212B;

    .brand {
      font-size: 24px;
      color: #ffffff;
      margin: 40px 0 20px 20px;
      vertical-align: top;
      img {
        margin: 4px;
        max-width: 24%;
        display: inline;
      }
    }
  }

  .table td, .table th {
    border-color: #bbbbbb;
  }
  tbody tr {
    background-color: rgba(34, 109, 59, 0.2);
  }
  .is-delinquent {
    background-color: rgba(148, 62, 46, 0.2);
  }
</style>
