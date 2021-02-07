<template>
  <v-app>
    <Header />

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
import Header from "@/components/Header.vue";
export default {
  name: "App",

  data: () => ({
    details: {
      title: process.env.VUE_APP_TITLE,
      url: process.env.VUE_APP_URL
    }
  }),
  components: {
    Footer,
    Header
  },
  methods: {}
};
</script>