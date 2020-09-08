<template>
  <div class="crawler">
    <el-button v-on:click="handleWrite">开始</el-button>
    <div id="logger">
      <div v-for="loggerMessage in loggerMessages" :key=loggerMessage.index>
        {{loggerMessage.message}}
      </div>
    </div>
    <!-- <div><router-link to="/">home</router-link></div> -->
  </div>
</template>

<script>

import ipc from '../ipc'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('logger')

export default {
  name: 'Crawler',

  mounted: function () {
    console.log('baseUrl1',process.env.baseUrl1)
    console.log('baseUrl2',process.env.baseUrl2)
    console.log('node version',process.versions.node)
    console.log('electron version',process.versions.electron)
    console.log('chrome version',process.versions.chrome)
  },

  computed: {
    ...mapState({
      loggerMessages: state => state.loggerMessages,
    })
  },

  methods: {
    handleWrite: function() {
      ipc.crawlerMain()
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
.crawler {
  height: 100%;
  display:flex;
  flex-direction: column;
}

#logger {
  flex: 1;
  overflow: auto;
  padding: 30px 20px;
  text-align: left;
}
</style>
