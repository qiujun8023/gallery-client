<template>
  <div class="image"
    :style="style"
    :data-src="image.url.original"
    :data-size="image.meta.width + 'x' + image.meta.height"
    >
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <span class="lable">
        <span class="title">{{image.name}}</span>
    </span>
    <div class="container">
      <img v-lazy="image.url.thumbnail" :alt="image.name" @loaded="loaded">
    </div>
    <div class="extra">
      <p class="exif">
        <b><i class="fa fa-camera"></i></b>
        <span>{{image.meta.model}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-image"></i></b>
        <span>{{image.meta.name}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-film"></i></b>
        <span>{{image.meta.info}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-clock-o"></i></b>
        <span>{{image.meta.time}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
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
    }
  },

  methods: {
    loaded ({ target }) {
      let parent = target.parentElement.parentElement
      let loading = parent.querySelector('.spinner')
      loading.style.display = 'none'
    }
  }
}
</script>
