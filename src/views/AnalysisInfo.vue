<template>
  <div class="col-md-12 mb-3">
    <h2>{{ analysis.jobName }}</h2>
    Command: <code class="col-12 text-light bg-dark p-4">
      {{ JSON.stringify(analysis.Command, null, "\t") }}
    </code><br/>

    Results: {{analysis.resultsDir}}
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL } from "../../auth_config.json";
export default {
  name: "AnalysisInfo",
  data() {
    return {
      analysis: {}
    };
  },
  created() {
    this.getAnalysisInfo();
  },
  methods: {
    async getAnalysisInfo() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("jobs/" + this.$route.params.uuid, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.analysis = resp.data;
      });
    },
  },
};
</script>
