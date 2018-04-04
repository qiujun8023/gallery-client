<template>
  <div class="image"
    :style="style"
    :data-src="image.url.original"
    :data-msrc="image.url.thumbnail"
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
        <span>{{metaModel}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-image"></i></b>
        <span>{{image.name}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-film"></i></b>
        <span>{{metaInfo}}</span>
      </p>
      <p class="exif">
        <b><i class="fa fa-clock-o"></i></b>
        <span>{{metaTime}}</span>
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
    },

    metaModel () {
      return this.image.meta.EXIF.Model || 'Unknown'
    },

    metaInfo () {
      let info = []
      let {FNumber, ShutterSpeedValue, ISOSpeedRatings} = this.image.meta.EXIF
      if (FNumber) {
        FNumber = FNumber.split('/')
        if (FNumber.length === 2) {
          info.push('f/' + FNumber[0] / FNumber[1])
        }
      }
      if (ShutterSpeedValue) {
        ShutterSpeedValue = ShutterSpeedValue.split('/')
        if (ShutterSpeedValue.length === 2) {
          info.push('1/' + (2 ^ (ShutterSpeedValue[0] / ShutterSpeedValue[1])) + 's')
        }
      }
      if (ISOSpeedRatings) {
        info.push('ISO' + ISOSpeedRatings)
      }
      if (!info.length) {
        return 'Unknown'
      }
      return info.join(', ')
    },

    metaTime () {
      return this.image.meta.EXIF.DateTimeOriginal || 'Unknown'
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
