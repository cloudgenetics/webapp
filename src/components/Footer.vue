<template>
  <v-footer color="primary" dark app>
    <span class="white--text">
      &copy; {{ new Date().getFullYear() }} {{ env.title }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({
    env: {
      title: process.env.VUE_APP_TITLE,
    },
  }),
};
</script>
