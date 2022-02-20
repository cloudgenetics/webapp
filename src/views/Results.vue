<template>
  <div class="col-md-12 mb-3">
    <h2>Analysis results</h2>
    <br/>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex v-for="(plot, i) in plots" :key="i" sm3>
          <v-card flat tile>
            <v-btn :href="plot" target="_blank" rel="noopener">
            <v-icon dark>
              mdi-file-image
            </v-icon>
            view plot {{i}}
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <br/>
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
      plots: [],
      imgsrc: null,
      images: [],
    };
  },
  props: {
    rawHtml: String,
  },
  created() {
    this.getFiles()
    this.getPlots()
    this.uuid = this.$route.params.uuid
  },
  methods: {
    encode(data) {
      let buf = Buffer.from(data);
      let base64 = buf.toString('base64');
      return base64
    },
    async getPlots() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("results/plots/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.plots = resp.data;
      });
    },
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
      });
    },
  },
};
</script>
