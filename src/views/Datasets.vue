<template>
  <div class="col-md-12 mb-3">
    <h2>Dataset</h2>
    <br/>
    <v-btn class="mx-2" rounded to="/dataset/new">
      <v-icon dark> mdi-plus </v-icon> New
    </v-btn>
    <v-btn class="mx-2" rounded to="/dataset/basespace">
      <v-icon dark> mdi-cloud-download </v-icon> Import from Basespace
    </v-btn>
    <br/>
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
