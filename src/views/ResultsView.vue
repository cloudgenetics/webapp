<template>
  <div class="col-md-12 mb-3">
    <h2>Analysis results</h2>
    
    <h3>Summary plots</h3>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex v-for="(plot, i) in plots" :key="i" sm3>
          <v-card flat tile :href="plot" target="_blank" rel="noopener">
            <v-img max-width="250" :src="plot"></v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <br/>
    <h4>Job summary</h4>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex v-for="(report, i) in reports" :key="i" sm3>
          <v-card flat tile>
            <v-btn :href="report" target="_blank" rel="noopener">
            <v-icon dark>
              mdi-chart-line
            </v-icon>
            view report {{i+1}}
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <br/>
    <h4>Output files</h4>
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
  name: "ResultsView",
  data() {
    return {
      uuid: '',
      imagesrc: '',
      files: [],
      plots: [],
      reports: [],
    };
  },
  created() {
    this.getFiles()
    this.getPlots()
    this.getReports()
    this.uuid = this.$route.params.uuid
  },
  methods: {
    async getReports() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("results/reports/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.reports = resp.data;
      });
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
