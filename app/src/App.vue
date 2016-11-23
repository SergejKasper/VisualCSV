<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(204, 223, 133, 0.5) 0%,
        rgba(248, 245, 236, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Roboto, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
</style>

<template v-md-theme="'default'">
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
