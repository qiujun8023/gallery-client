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
import Navbar from '@/components/Navbar'
import Gallery from '@/components/Gallery'
import albumGql from '@/graphql/album'
import answerGql from '@/graphql/answer'
import answerUtil from '@/utils/answer'

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
      },
      update (data) {
        let questions = data.gallery ? data.gallery.questions : []
        if (questions && questions.length) {
          let checkAnswer = this.checkAnswer.bind(this)
          answerUtil(questions, checkAnswer).then((result) => {
            console.log(result)
          })
          return null
        }
        return data.gallery
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
    }
  }
}
</script>

<style lang="less">
@import './assets/css/main.less';
@import '../node_modules/sweetalert2/dist/sweetalert2.min.css';
</style>
