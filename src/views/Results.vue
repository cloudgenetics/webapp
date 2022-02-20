<template>
  <div class="col-md-12 mb-3">
    <h2>Results</h2>
    <v-row no-gutters>
    <v-list-item v-for="(result, i) in Results" :key="i" :to="/results/ + result.resultsDir">
      <v-list-item-avatar>
        <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="result.jobName"></v-list-item-title>
        <v-list-item-subtitle v-text="new Date(result.created_at)"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-information</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-row>
  </div>
</template>


<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
export default {
  name: "ResultsList",
  data() {
    return {
      Results: [],
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    async getResults() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("jobs", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.Results = resp.data;
      });
    },
  },
};
</script>

