<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background-position: center;
    display: flex;
    font-family: Roboto, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }

  button.md-icon-button .md-icon{
    display: inline-block;
  }

  #app {
    background: #f8f5ec;
  }
</style>

<template v-md-theme="'default'" >
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store
  }
</script>
