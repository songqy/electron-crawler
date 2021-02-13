<template>
  <div class="photoView">
    <top-menu :defaultIndex="2"></top-menu>
    <div class="container">
      <el-backtop target=".content"></el-backtop>
      <tree-menu @onSelect=getDir :files="menus" class="menu"></tree-menu>
      <div class="content" id="imgContent">
        <h2>{{info.title}}</h2>
        <div class="desc">{{info.desc}}</div>
        <div class="rank" v-if="info.title">
          <el-rate
            @change="rankChange"
            v-model="info.rank"
          ></el-rate>
        </div>
        <img v-for="img in imgs" :key=img.index :src=img.src />
      </div>
    </div>
    
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import { getDirsByParent, setInfo } from '../service/viewPhoto'

const { mapState, mapActions } = createNamespacedHelpers('viewPhoto')

const needFetchChildren = (files, parent) => {
  if(parent === '/') return true;
  const values = parent.split('/').slice(1);
  let target = files
  values.forEach(value => {
    target = target.find(file => file.filePath === value).children
  })
  return !(target && target.length > 0)
}


export default {
  name: 'PhotoView',

  mounted: function () {
      getDirsByParent();
  },

  computed: {
    ...mapState({
      menus: state => state.menus,
      files: state => state.files,
      imgs: state => state.imgs,
      info: state => state.info,
      parent: state => state.parent,
    })
  },

  methods: {
    ...mapActions([
      'refreshImgs',
    ]),
    getDir (parent) {
      if (needFetchChildren(this.files, parent)) {
        getDirsByParent(parent);
      } else {
        this.refreshImgs(parent)
      }
    },
    rankChange() {
        setInfo(this.info, this.parent)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photoView {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.container {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.menu {
   width: 200px;
   flex: 0 0 200px;
   overflow: auto;
}

.content {
  overflow: auto;
}

.desc {
    margin-bottom: 10px;
}

.rank {
  margin-bottom: 10px;
}

/* img {
  width: 100%;
} */
</style>
