<template>
  <div class="navbar">
    <div class="breadcrumb">
      <div class="item" :key="item.path" v-for="item in paths">
        <router-link class="title" :to="{ name: 'gallery', query: { path: item.path }}">
          <span>{{item.name}}</span>
        </router-link>
        <span class="separator">/</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
