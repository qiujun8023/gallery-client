<template>
  <div class="navbar">
    <div class="breadcrumb">
      <div class="item" :key="item.path" v-for="(item, index) in paths">
        <router-link class="title" :to="{ name: 'gallery', query: { path: item.path }}">
          <icon name="home" class="icon" v-if="!index"></icon>
          <span>{{item.name}}</span>
        </router-link>
        <span class="separator">/</span>
      </div>
    </div>
    <div class="description">{{description}}</div>
  </div>
</template>

<script>
import 'vue-awesome/icons/home'
import Icon from 'vue-awesome/components/Icon'

export default {
  props: {
    path: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },

  components: {
    Icon
  },

  computed: {
    paths () {
      let paths = [{
        name: '首页',
        path: '/'
      }]

      let names = this.path.split('/').filter(Boolean)
      for (let name of names) {
        let path = this.pathJoin(paths[paths.length - 1].path, name)
        paths.push({ name, path })
      }
      console.log(JSON.stringify(paths, null, 4))
      return paths
    }
  },

  methods: {
    pathJoin (...paths) {
      return paths.join('/').replace(/\/{2,}/g, '/')
    }
  }
}
</script>
