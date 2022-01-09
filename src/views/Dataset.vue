<template>
  <div class="col-md-12 mb-3">
    <h1>Dataset</h1>
    <v-btn class="mx-2" rounded dark to="/dataset/new">
      <v-icon dark> mdi-plus </v-icon> New
    </v-btn>
    <ListDatasets />
  </div>
</template>

<script>
import ListDatasets from './ListDatasets.vue'
export default {
  name: "Dataset",
  components: {
    ListDatasets
  },
};
</script>
