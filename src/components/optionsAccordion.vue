<template>
  <div class="nav-container">
    <div class="mobile-hr-container" @click="setNavClicked">
      <hr />
      <hr />
      <hr />
    </div>
    <div :class="'nav-container ' + clickedOnMobile">
      <router-link to="/hymnals">Hymnals</router-link>
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <router-link v-else to="/account">Account</router-link>
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
    },
    loggedIn() {
      return this.$store.state.currentUser;
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
