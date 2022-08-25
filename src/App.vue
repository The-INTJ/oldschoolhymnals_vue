<template>
  <div id="app">
    <vue-header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import vueHeader from './components/vueHeader.vue';

export default Vue.extend({
  components: { vueHeader },
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },

  methods: {  
    onResize() {
      this.windowWidth = window.innerWidth
    }
  }
});
</script>

<style lang="scss">
  @import "./assets/styles/foundational/globals.scss"
</style>
