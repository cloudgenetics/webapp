<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div></div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="30"
        />{{ details.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Main />
    </v-main>

    <v-footer color="primary" dark app>
      <span class="white--text"
        >&copy; {{ new Date().getFullYear() }} {{ details.title }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main,
  },
  data: () => ({
    details: {
      title: process.env.VUE_APP_TITLE,
      url: process.env.VUE_APP_URL,
    },
  }),
  methods: {},
};
</script>