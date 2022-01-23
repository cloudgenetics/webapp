<template>
  <div class="col-md-12 mb-3">
    <h2>{{ dataset.name }}</h2>
    <v-row no-gutters>
      <v-list-item v-for="(file, i) in files" :key="i">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-file </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="file.name"></v-list-item-title>

          <v-list-item-subtitle v-text="'size: ' + parseFloat(file.size / 1048576).toFixed(2) + ' mb'"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
