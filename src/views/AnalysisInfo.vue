<template>
  <div class="col-md-12 mb-3">
    <h2>{{ job.jobName }}</h2>
    <v-list>
      <v-list-item v-for="(info,i) in jobinfo" :key="i">
        <v-list-item-icon>
          <v-icon>{{ icons[i] }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{info}}: {{ batchjob[info]}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="/results/ + job.resultsDir">
        <v-list-item-icon>
          <v-icon>mdi-chart-line</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><b>View results:</b> {{job.resultsDir}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p>
      Job script: <br/>
      <vue-json-pretty :data="batchjob['Container']['Command']"> </vue-json-pretty>
      <br/>
    </p>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
export default {
  name: "AnalysisInfo",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      job: {},
      batchjob: {},
      icons: ["mdi-clock", "mdi-alarm-check", "mdi-format-list-checks", "mdi-file-chart-outline"],
      jobinfo: ["StartedAt", "StoppedAt", "Status", "StatusReason"],
      results: "Results"
    };
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  },
  created() {
    this.getJobInfo()
    this.getBatchJobInfo()
  },
  methods: {
    async getJobInfo() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("jobs/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.job = resp.data
      });
    },
    async getBatchJobInfo() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("batchjobs/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.batchjob = resp.data["Jobs"][0]
        this.batchjob["StartedAt"] = new Date(this.batchjob["StartedAt"])
        this.batchjob["StoppedAt"] = new Date(this.batchjob["StoppedAt"])
      });
    },
  },
};
</script>
