<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">爬虫</el-menu-item>
      <el-menu-item index="2">展示</el-menu-item>
    </el-menu>
</template>


<script>

import router from '@/renderer/router'

export default {
  name: 'TopMenu',
  props: ['defaultIndex'],
  activeIndex: '1',

  mounted: function(params) {
    this.activeIndex = this.defaultIndex+''
  },

  methods: {
    handleSelect: function (value) {
      if('1' === value) {
        router.push('/')
      } else if ('2' === value){
        router.push('/view')
      }
    }
  },

  data() {
    return {
      activeIndex: this.activeIndex,
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>