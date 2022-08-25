<template>
  <div class="nav-container">
    <div class="mobile-hr-container" @click="setNavClicked">
      <hr />
      <hr />
      <hr />
    </div>
    <div :class="'nav-container ' + clickedOnMobile">
      <router-link to="/about">About</router-link>
      <router-link to="/hymnals">Hymnals</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "optionsAccordion",
  props: {},
  data() {
    return {
      mobile: false,
      navClicked: false,
    };
  },
  computed: {
    clickedOnMobile() {
      return this.navClicked ? "link-visible" : "link-invisible";
    }
  },
  methods: {
    setNavClicked() {
      this.navClicked = !this.navClicked;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/styles/components/OptionsAccordion.scss";
</style>
