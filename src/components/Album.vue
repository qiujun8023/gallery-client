<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import albumGql from '@/graphql/album'

export default {
  name: 'Album',
  data () {
    return {
      msg: 'Hello World',
      // Initialize your apollo data
      ping: {}
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // hello: gql`{hello}`,
    ping: {
      // gql query
      query: albumGql,
      // Static parameters
      variables: {
        path: '大学毕业'
      }
    }
  },
  created () {
    console.log(this.$route.params.path)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
