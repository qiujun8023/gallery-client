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
  </div>
</template>

<script>
import 'vue-awesome/icons/home'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    Icon
  },

  data () {
    return {
      paths: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '大学时光',
          path: '/大学时光'
        },
        {
          name: '大学毕业',
          path: '/大学时光/大学毕业'
        }
      ]
    }
  }
}
</script>
