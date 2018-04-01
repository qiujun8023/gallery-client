<template>
  <div class="album" @click="answer" :style="style">
    <div class="lock">
      <i class="fa fa-lock"></i>
    </div>
    <span class="lable">
        <span class="title">{{album.name}}</span>
    </span>
    <div class="container">
      <div class="cover">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
        <div class="cropped" data-src="${thumbnail}" data-type="bg"></div>
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
    }
  },

  methods: {
    answer () {
      alert('123')
    }
  }
}
</script>
