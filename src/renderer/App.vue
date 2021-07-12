<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import router from '@/renderer/router';

export default {
  name: 'App',

  mounted: function() {
    router.push('/crawler');
  },
};
</script>

<style >
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
