import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/components/Gallery'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: Gallery
    }
  ]
})
