<template>
  <div class="navbar">
    <div class="breadcrumb">
      <div class="item" :key="item.path" v-for="(item, index) in paths">
        <a class="title" :href="item.path" v-if="!index">
          <span>{{item.name}}</span>
        </a>
        <a class="title" :href="item.path" v-else>{{item.name}}</a>
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
