<template>
  <div class="crawler">
    <el-button class="startBtn" v-on:click="handleStart">开始</el-button>
    <div class="crawlerNum">
      s1: <el-input-number v-model="s1"></el-input-number>
      <el-button v-on:click="handleStartS1">开始</el-button>
    </div>
    <div class="crawlerNum">
      s2: <el-input-number v-model="s2"></el-input-number>
      <el-button v-on:click="handleStartS2">开始</el-button>
    </div>
    <div id="logger">
      <div v-for="loggerMessage in loggerMessages" :key=loggerMessage.index>
        <span v-if="loggerMessage.type==='log'">{{loggerMessage.message}}</span>
        <span v-else class="errorMessage">{{loggerMessage.message}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import ipc from '../ipc'
import { createNamespacedHelpers } from 'vuex'
import pkg from '../../../package.json'

const { mapState } = createNamespacedHelpers('logger')

export default {
  name: 'Crawler',

  mounted: function () {
    console.log('baseUrl1',process.env.baseUrl1)
    console.log('baseUrl2',process.env.baseUrl2)
    console.log('app version', pkg.version)
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
    handleStart: function() {
      ipc.sendMessage('crawlerMain')
    },

    handleStartS1: function() {
      console.log('s1',this.s1)
      if(this.s1) {
        ipc.sendMessage('crawlerMain', {s1: this.s1})
      } 
    },

    handleStartS2: function() {
      console.log('s2',this.s2)
      if(this.s2) {
        ipc.sendMessage('crawlerMain', {s2: this.s2})
      }
    }
  },

  data () {
    return {
      name,
      s1: null,
      s2: null
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

.crawlerNum {
  margin: 10px 0;
}

.startBtn {
  margin: 16px 16px;
}

.errorMessage {
  color: red;
}

#logger {
  flex: 1;
  overflow: auto;
  padding: 30px 20px;
  text-align: left;
}
</style>
