<template>
  <div v-if="file.hasChildren">
    <el-submenu :index="file.index">
      <template slot="title">{{file.value}}</template>
      <template v-for="item in file.children">
          <tree-sub-menu :file="item" :key="item.index"></tree-sub-menu>
      </template>
    </el-submenu>
  </div>
  <div v-else>
    <el-menu-item :index="file.index">{{file.value}}</el-menu-item>
  </div>
</template>

<script>

export default {
  name: 'TreeSubMenu',
  props: ['file']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
