import Vue from 'vue'
import Router from 'vue-router'
import Album from '@/components/Album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: ':path(.*)',
      name: 'Album',
      component: Album
    }
  ]
})
