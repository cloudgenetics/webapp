<template>
  <v-row no-gutters>
    <v-list-item v-for="(analysis, i) in analyses" :key="i" :to="/analyses/ + analysis.uuid">
      <v-list-item-avatar>
        <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="analysis.jobName"></v-list-item-title>
        <v-list-item-subtitle v-text="new Date(analysis.created_at)"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
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
  name: "AnalysesList",
  data() {
    return {
      analyses: [],
    };
  },
  created() {
    this.getAnalyses();
  },
  methods: {
    async getAnalyses() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("jobs", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.analyses = resp.data;
      });
    },
  },
};
</script>
