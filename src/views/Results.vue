<template>
  <div class="col-md-12 mb-3">
    <h2>Analysis results</h2>
    <v-row no-gutters>
      <v-list-item v-for="(file, i) in files" :key="i">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-file </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="file.replace(uuid, '')"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-row>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";

export default {
  name: "Results",
  data() {
    return {
      uuid: '',
      files: [],
    };
  },
  created() {
    this.getFiles()
    this.uuid = this.$route.params.uuid
  },
  methods: {
    async getFiles() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("results/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.files = resp.data;
        console.log(this.files)
      });
    },
  },
};
</script>
