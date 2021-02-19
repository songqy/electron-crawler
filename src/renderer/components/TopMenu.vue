<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/crawler">爬虫</el-menu-item>
      <el-menu-item index="/view">展示</el-menu-item>
    </el-menu>
</template>


<script>

import router from '@/renderer/router'

export default {
  name: 'TopMenu',
  props: ['activeIndex'],

  methods: {
    handleSelect: function (value) {
        router.push(value)
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>