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
      <div class="error message" v-else-if="error">
        <i class="fa fa-times-circle"></i>
        <span class="content" v-if="!gallery.questions.length">{{error}}</span>
        <span class="content" @click="askQuestion(gallery.questions)" v-else>{{error}}</span>
      </div>
      <gallery :gallery="gallery" :checkAnswer="checkAnswer" v-else></gallery>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Gallery from '@/components/Gallery'
import albumGql from '@/graphql/album'
import answerGql from '@/graphql/answer'
import serverGql from '@/graphql/server'
import answerUtil from '@/utils/answer'

export default {
  components: {
    Navbar,
    Gallery
  },

  data () {
    return {
      error: null,
      gallery: null,
      server: null
    }
  },

  apollo: {
    server: {
      query: serverGql
    },

    gallery: {
      query: albumGql,
      variables () {
        return {
          path: this.path
        }
      },
      update (data, b, c) {
        if (data.gallery === this.gallery) {
          return data.gallery
        }

        this.error = null
        let { questions, albums, images } = data.gallery || {}
        if (questions && questions.length) {
          this.askQuestion(questions)
        } else if (!albums.length && !images.length) {
          this.error = '相册中还没有内容呢'
        }
        return data.gallery
      },
      fetchPolicy: 'network-only'
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
    },

    title () {
      if (!this.server) {
        return null
      } else if (!this.gallery || this.gallery.name === '/') {
        return this.server.title
      } else {
        return this.gallery.name + ' - ' + this.server.title
      }
    }
  },

  methods: {
    checkAnswer (path, answer) {
      return this.$apollo.mutate({
        mutation: answerGql,
        variables: {
          answers: [{
            path,
            answer
          }]
        }
      }).then(({ data: { answer: { allowed } } }) => {
        return allowed.indexOf(path) !== -1
      })
    },

    askQuestion (questions) {
      answerUtil(questions, this.checkAnswer).then((result) => {
        if (!result.value) {
          this.error = '需要正确回答问题后才能访问！'
          return null
        }

        this.$apollo.queries.gallery.fetchMore({
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return fetchMoreResult
          }
        })
      })
    }
  },
  watch: {
    title (title) {
      document.title = title
    }
  }
}
</script>

<style lang="less">
@import './assets/css/main.less';
@import '../node_modules/sweetalert2/dist/sweetalert2.min.css';
@import '../node_modules/photoswipe/dist/photoswipe.css';
@import '../node_modules/photoswipe/dist/default-skin/default-skin.css';
</style>
