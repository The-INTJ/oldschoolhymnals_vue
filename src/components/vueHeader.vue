<template>
  <header class="nav-bar">
    <div><h1 id="obh"><router-link to="/"> Baptist Hymnals</router-link></h1></div>
    <options-accordion />
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import optionsAccordion from "./optionsAccordion.vue";

export default Vue.extend({
  components: { optionsAccordion },
  name: "vueHeader",
  props: {},
  computed: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/styles/foundational/Header.scss"
</style>
