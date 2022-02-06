<template>
  <div class="col-md-12 mb-3">
    <h2>Analyses</h2>
    <br/>
    <v-btn class="mx-2" rounded to="/analysis/singlecell">
      <v-icon dark> mdi-microscope </v-icon> New
    </v-btn>
    <br/>
    <br/>
    <v-spacer></v-spacer>
    <AnalysesList />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import AnalysesList from "./AnalysesList.vue";
export default {
  name: "Analyses",
  components: {
    AnalysesList,
  },
};
</script>
