<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <template v-for="item in reouterList">
          <el-menu-item :index="item.path" :key="item.name">{{item.title}}</el-menu-item>
      </template>
    </el-menu>
</template>


<script>

import router, { reouterList } from '@/renderer/router'

export default {
  name: 'TopMenu',
  props: ['activeIndex'],

  methods: {
    handleSelect: function (value) {
        router.push(value)
    }
  },

   data () {
    return {
      reouterList,
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>