<template>
  <v-row no-gutters>
    <v-col v-for="(data, i) in datasets" :key="i" cols="12" sm="4">
      <v-card outlined rounded tile class="pa-2">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ data.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Updated:
              {{ Date(data.updated_at).substr(0, 24) }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-avatar>
            <v-icon right> mdi-dna </v-icon>
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn outlined rounded text> Open </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
export default {
  name: "ListDatasets",
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
