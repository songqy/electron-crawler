<template>
  <div class="crawler">
    <el-button v-on:click="handleWrite">提交</el-button>

    <!-- <div><router-link to="/">home</router-link></div> -->
  </div>
</template>

<script>

import {crawlerMain} from '../service/crawler'

export default {
  name: 'Crawler',

  mounted: function () {
    console.log('baseUrl1',process.env.baseUrl1)
  },

  methods: {
    handleWrite: function() {
      crawlerMain(process.env.baseUrl1)
    }
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content,.left {
  height: 100vh;
  overflow: scroll;
}
</style>
