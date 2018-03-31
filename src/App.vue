<template>
  <div id="gallery">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    'navbar': Navbar
  }
}
</script>

<style lang="less">
body {
    margin: 0;
    padding: 0;
    background-color: #E8ECF0;
}

.spinner {
    width: 30px;
    height: 30px;
    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #e8ecf0;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: bounce 2.0s infinite ease-in-out;
    }
    .double-bounce2 {
        animation-delay: -1.0s;
    }
    @keyframes bounce {
        0%, 100% {
            transform: scale(0.0);
        } 50% {
            transform: scale(1.0);
        }
    }
}
</style>
