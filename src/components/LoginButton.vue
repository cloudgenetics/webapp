<template>
  <v-btn v-if="!$auth.isAuthenticated" @click="login">
    Log In
  </v-btn>
</template>

<script>
export default {
  name: "LoginButton",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    }
  }
};
</script>

