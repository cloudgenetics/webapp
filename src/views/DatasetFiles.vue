<template>
  <div class="col-md-12 mb-3">
    <h1>{{ dataset.name }}</h1>
    <v-row no-gutters>
      <v-col v-for="(file, i) in files" :key="i" cols="12" sm="4">
        <v-card outlined rounded tile class="pa-2">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ file.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                >size: {{ file.size / 1000 }} kb</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >created:
                {{ Date(file.created_at).substr(0, 24) }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon right> mdi-file-cloud </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
export default {
  name: "DatasetFiles",
  data() {
    return {
      files: [],
      dataset: {},
    };
  },
  created() {
    this.getFiles();
    this.getDatasetInfo();
  },
  methods: {
    async getDatasetInfo() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("dataset/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.dataset = resp.data;
      });
    },
    async getFiles() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("datasets/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.files = resp.data;
      });
    },
  },
};
</script>
