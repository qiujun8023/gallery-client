<template>
  <div class="album" @click="enter" :style="style">
    <div class="lock" v-if="isLocked">
      <i class="fa fa-lock"></i>
    </div>
    <span class="lable">
        <span class="title">{{album.name}}</span>
    </span>
    <div class="container">
      <div class="cover" :key="index" v-for="(url, index) in album.thumbnails">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
        <div class="cropped" v-lazy:background-image="url" @loaded="loaded"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },

  computed: {
    style () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },

    isLocked () {
      return Boolean(Object.keys(this.album.questions).length)
    }
  },

  methods: {
    loaded ({ target }) {
      let parent = target.parentElement
      let loading = parent.querySelector('.spinner')
      loading.style.display = 'none'
    },

    enter () {
      if (this.isLocked) {
        alert('locked')
      } else {
        this.$router.push({
          name: 'gallery',
          query: {
            path: this.album.path
          }
        })
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
