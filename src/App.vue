<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="30"
        />
        {{ env.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <AuthenticationButton />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          :to="link.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AuthenticationButton from "@/components/AuthenticationButton";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",

  data: () => ({
    env: {
      title: process.env.VUE_APP_TITLE,
      url: process.env.VUE_APP_URL
    },
    drawer: null,
    links: [
      { icon: "mdi-database", text: "Datasets", route: "/datasets" },
      { icon: "mdi-account", text: "Account", route: "/account" }
    ]
  }),
  components: {
    AuthenticationButton,
    Footer
  },
  methods: {}
};
</script>