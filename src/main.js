// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// lazyload
import VueLazyload from 'vue-lazyload'

// GraphQL
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

// Install lazyload
Vue.use(VueLazyload, {
  dispatchEvent: true
})

// Install the vue plugin
Vue.use(VueApollo)

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: '/api/graphql',
  credentials: 'same-origin'
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
