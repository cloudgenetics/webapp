<template>
  <div class="col-md-12 mb-3">
    <h1>Dataset</h1>
    <v-btn class="mx-2" rounded to="/dataset/new">
      <v-icon dark> mdi-plus </v-icon> New
    </v-btn>
    <v-btn class="mx-2" rounded to="/dataset/basespace">
      <v-icon dark> mdi-cloud-download </v-icon> Import from Basespace
    </v-btn>
    <br/>
    <v-spacer></v-spacer>
    <DatasetsList />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import DatasetsList from "./DatasetsList.vue";
export default {
  name: "Datasets",
  components: {
    DatasetsList,
  },
};
</script>
