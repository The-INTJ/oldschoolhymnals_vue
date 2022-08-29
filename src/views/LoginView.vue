<template>
  <div class="main-content page-container">
    <div class="inputs">
      <input type="text" v-model="email" />
      <input type="password" v-model="password"/>
    </div>
    <div class="buttons">
      <button @click="signIn">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";

export default Vue.extend({
  name: "LoginView",
  components: {},
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async signIn() {
      let response = await signInWithEmailAndPassword(auth, this.email, this.password);
      if(response) {
        this.$router.replace("hymnals")
        this.$store.state.currentUser = response.user;
      } else {
        alert("Login did not succeed. That was Fred's password, try yours.")
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/LoginView.scss";
</style>