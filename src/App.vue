<template>
  <div class="app">
    <navbar :path="path" :description="description"></navbar>
    <div class="content">
      <div class="loading" v-if="loading">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <gallery :gallery="gallery" v-else></gallery>
    </div>
  </div>
</template>

<script>
import '@/assets/css/main.less'
import Navbar from '@/components/Navbar'
import Gallery from '@/components/Gallery'
import albumGql from '@/graphql/album'

export default {
  components: {
    Navbar,
    Gallery
  },

  data () {
    return {
      gallery: null
    }
  },

  apollo: {
    gallery: {
      query: albumGql,
      variables () {
        return {
          path: this.path
        }
      }
    }
  },

  computed: {
    path () {
      return this.$route.query.path || '/'
    },

    description () {
      return this.gallery ? this.gallery.description : null
    },

    loading () {
      return this.$apollo.queries.gallery.loading
    }
  }
}
</script>
