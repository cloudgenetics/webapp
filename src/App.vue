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

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "App",

  data: () => ({
    details: {
      title: process.env.VUE_APP_TITLE,
      url: process.env.VUE_APP_URL,
    },
  }),
  components: {
    Footer,
  },
  methods: {},
};
</script>