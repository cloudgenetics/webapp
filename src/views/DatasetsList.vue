<template>
  <v-row no-gutters>
    <v-list-item v-for="(data, i) in datasets" :key="i" :to="/datasets/ + data.uuid">
      <v-list-item-avatar>
        <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
      </v-list-item-avatar>

      <v-list-item-content :to="/datasets/ + data.uuid">
        <v-list-item-title v-text="data.name"></v-list-item-title>

        <v-list-item-subtitle v-text="Date(data.updated_at).substr(0, 24)"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon :to="/datasets/ + data.uuid">
          <v-icon color="grey lighten-1">mdi-information</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-row>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
export default {
  name: "DatasetsList",
  data() {
    return {
      datasets: [],
    };
  },
  created() {
    this.getDatasets();
  },
  methods: {
    async getDatasets() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("datasets", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.datasets = resp.data;
      });
    },
  },
};
</script>
