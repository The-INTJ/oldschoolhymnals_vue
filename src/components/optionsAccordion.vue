<template>
  <div class="nav-container">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/hymnals">Hymnals</router-link> 
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "optionsAccordion",
  props: {
    
  },
  computed: {
    
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/styles/components/OptionsAccordion.scss";
</style>
