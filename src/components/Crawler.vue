<template>
  <div class="crawler">
    <el-button v-on:click="handleWrite">提交</el-button>

    <div><router-link to="/">home</router-link></div>
  </div>
</template>

<script>

import {write} from '../modal/file';
import path from 'path'

export default {
  name: 'Crawler',

  mounted: function () {
     
  },

  methods: {
    handleWrite: function() {
      console.log('__dirname',__dirname);
      write(path.join(__dirname,'../file_assest/123.json'),'123');
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
