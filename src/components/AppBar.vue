<template>
  <v-app-bar app color="primary" dark clipped-left>
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
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    env: {
      title: process.env.VUE_APP_TITLE
    }
  })
};
</script>
