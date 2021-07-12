<template>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <template v-for="route in routes">
          <el-menu-item :index="route.path" :key="route.name">{{route.title}}</el-menu-item>
      </template>
    </el-menu>
</template>


<script>

import { routes } from '@/renderer/router';

export default {
  name: 'TopMenu',
  props: ['activeIndex'],

  methods: {
    handleSelect: function (value) {
      this.$router.push(value);
    },
  },

  data () {
    return {
      routes,
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
