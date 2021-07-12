<template>
  <div class="statistics">
    <top-menu activeIndex="/statistics"></top-menu>
    <el-button class="startBtn" v-on:click="handleStatistics">统计</el-button>
    <div>
      <el-radio-group v-model="viewType" size="medium">
        <el-radio-button label="default">默认</el-radio-button>
        <el-radio-button label="1"></el-radio-button>
        <el-radio-button label="2"></el-radio-button>
        <el-radio-button label="3"></el-radio-button>
        <el-radio-button label="4"></el-radio-button>
        <el-radio-button label="5"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="rankcount">
        <div>总和: {{totalCount}}</div>
        <div>rank1: {{rankCount[0]}}</div>
        <div>rank2: {{rankCount[1]}}</div>
        <div>rank3: {{rankCount[2]}}</div>
        <div>rank4: {{rankCount[3]}}</div>
        <div>rank5: {{rankCount[4]}}</div>
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

import { createNamespacedHelpers } from 'vuex';
import { startStatistics, getRankCount } from '../service/statistics';

const { mapState } = createNamespacedHelpers('statistics');
const { mapState: mapStateLogger } = createNamespacedHelpers('logger');

export default {
  mounted: function () {
    getRankCount();
  },

  computed: {
    ...mapState({
      rankCount: state => state.rankCount,
      totalCount: state => state.totalCount,
    }),
    ...mapStateLogger({
      loggerMessages: state => state.loggerMessages,
    }),
    viewType: {
      get() {return this.$store.state.viewType;},
      set(val) {this.$store.state.viewType = val;},
    },
  },

  methods: {
    handleStatistics: function() {
      startStatistics();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics {
  height: 100%;
  display:flex;
  flex-direction: column;
}

.startBtn {
  margin: 16px 16px;
}

.rankcount {
  margin: 10px auto;
  text-align: left;
  width: 140px;
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
