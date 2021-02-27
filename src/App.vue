<template>
  <v-app>
    <AppBar :appbarDrawer.sync="drawer" />
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
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
import Footer from "@/components/Footer.vue";
import AppBar from "@/components/AppBar.vue";
export default {
  name: "App",

  data: () => ({
    details: {
      title: process.env.VUE_APP_TITLE,
      url: process.env.VUE_APP_URL
    },
    drawer: null,
    links: [
      ["mdi-database", "Data"],
      ["mdi-microscope", "Analysis"],
      ["mdi-folder-multiple", "Project"]
    ]
  }),
  components: {
    AppBar,
    Footer
  },
  methods: {}
};
</script>