<template>
  <el-menu
    class="el-menu-vertical-demo"
    :unique-opened="true"
    @select="handleSelect"
  >
    <template v-for="file in files">
      <tree-sub-menu :file="file" :key="file.index"></tree-sub-menu>
    </template>
  </el-menu>
</template>

<script>
import TreeSubMenu from './TreeSubMenu';

export default {
  name: 'TreeMenu',
  props: ['files'],
  components: { TreeSubMenu },

  methods: {
    handleSelect: function (value) {
      this.$emit('onSelect', value);
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
