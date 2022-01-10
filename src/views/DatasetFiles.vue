<template>
  <div class="col-md-12 mb-3">
    <h1>Dataset</h1>
    <v-list-item v-for="(file, i) in files" :key="i">
      <v-list-item-content>
        <v-list-item-title v-text="file.name"></v-list-item-title>
        <v-card-text
          >Size: {{ file.size / 1000 }} kb <br />
        </v-card-text>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "DatasetFiles",
  data() {
    return {
      files: [
          {
              name: "fn",
              size: 100000,
          },
          {
              name: "fn2",
              size: 394000,
          }

      ],
    };
  },
};
</script>
