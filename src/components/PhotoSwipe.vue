<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

      <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'

export default {
  props: {
    gallerySelector: {
      type: String,
      required: true
    },
    imageSelector: {
      type: String,
      required: true
    },
    titleSelector: {
      type: String,
      required: true
    }
  },

  methods: {
    findImageElements (galleryElement) {
      let imageElements = galleryElement.querySelectorAll(this.imageSelector)
      return Array.from(imageElements).map((imageElement) => {
        let size = imageElement.getAttribute('data-size').split('x')
        return {
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10),
          src: imageElement.getAttribute('data-src'),
          msrc: imageElement.getAttribute('data-msrc'),
          title: imageElement.querySelector(this.titleSelector).innerHTML,
          el: imageElement
        }
      })
    },

    findClosest (el, fn) {
      return el && (fn(el) ? el : this.findClosest(el.parentNode, fn))
    },

    findClosestBySelector (eTarget, selector) {
      return this.findClosest(eTarget, (el) => {
        if (!el.parentNode) {
          return false
        }
        return Array.from(el.parentNode.querySelectorAll(selector)).indexOf(el) !== -1
      })
    },

    onThumbnailClick (event) {
      event = event || window.event
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }

      let eTarget = event.target || event.srcElement
      let imageElement = this.findClosestBySelector(eTarget, this.imageSelector)
      if (!imageElement) {
        return false
      }

      let galleryElement = this.findClosestBySelector(imageElement, this.gallerySelector)
      let imageElements = this.findImageElements(galleryElement)
      for (let i = 0; i < imageElements.length; i++) {
        if (imageElements[i].el === imageElement) {
          this.openPhotoSwipe(galleryElement, imageElements, i)
          return true
        }
      }
      return false
    },

    openPhotoSwipe (galleryElement, imageElements, index, isFromURL) {
      let options = {
        index,
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function (index) {
          let thumbnail = imageElements[index].el.getElementsByTagName('img')[0]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        },
        shareButtons: [{
          id: 'download',
          label: '下载图片',
          url: '{{raw_image_url}}',
          download: true
        }]
      }

      if (isFromURL) {
        options.showAnimationDuration = 0
      }

      let pswpElement = document.querySelectorAll('.pswp')[0]
      let photoSwipe = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, imageElements, options)
      photoSwipe.init()
    }
  },

  mounted () {
    const galleryElements = document.querySelectorAll(this.gallerySelector)
    for (let i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1)
      galleryElements[i].onclick = this.onThumbnailClick.bind(this)
    }

    let { pid, gid } = this.$route.query
    if (pid && gid) {
      let galleryElement = galleryElements[gid - 1]
      let imageElements = this.findImageElements(galleryElement)
      this.openPhotoSwipe(galleryElement, imageElements, pid - 1, true)
    }
  }
}
</script>
