<template>
  <div id="gallery">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/main.less'
import Navbar from '@/components/Navbar'

export default {
  components: {
    'navbar': Navbar
  }
}
</script>
