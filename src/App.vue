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
});
</script>

<style lang="scss">
  @import "./assets/styles/foundational/globals.scss";
</style>
