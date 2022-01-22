<template>
  <div class="col-md-12 mb-3">
    <h1>Import project from basespace</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="basespace.accessToken"
              :rules="accessTokenRules"
              label="Basespace access token"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="basespace.projectId"
              :rules="projectIdRules"
              label="Project ID"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="ma-2" v-if="valid" @click="fetchBasespaceFiles">
          Fetch Basespace project
        </v-btn>
      </v-container>
    </v-form>
    <v-alert v-if="importStatus && responseStatus === null" dense text type="info">
      {{importStatus}}
    </v-alert>
    <v-alert v-if="importStatus && responseStatus === 200" dense text type="success">
      {{importStatus}}
    </v-alert>
    <v-alert v-if="importStatus && responseStatus != 200 && responseStatus != null" dense text type="error">
      {{importStatus}}
    </v-alert>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { redirectURL } from "../../auth_config.json";
export default {
  name: "DatasetBasespace",
  data() {
    return {
      valid: false,
      accessTokenRules: [(v) => !!v || "Access token is required"],
      projectIdRules: [
        (v) => !!v || "Project ID is required",
        (v) => /^-?\d+$/.test(v) || "Project ID must be a numeric value",
      ],
      basespace: {
        accessToken: "",
        projectId: "",
      },
      importStatus: "",
      responseStatus: null,
    };
  },
  watch: {
    accessToken: function() {
      if (this.basespace.accessToken && this.basespace.projectId) this.valid = true  
    },
    projectId: function() {
      if (this.basespace.accessToken && this.basespace.projectId) this.valid = true  
    },
  },
  methods: {
    async fetchBasespaceFiles() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        this.importStatus = "Basespace project import in progress. Please wait this may take a while or you can safely navigate away from this page";
        HTTP.post("dataset/basespace", JSON.stringify(this.basespace), {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${redirectURL}`,
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            this.responseStatus = response.status
            this.importStatus = "Basespace project import complete" ;
          })
          .catch((e) => {
            this.responseStatus = 0
            this.importStatus = "Basespace project import failed with: " + e;
          });
      } catch (e) {
        this.responseStatus = 0
        this.importStatus = "Basespace project import failed with: " + e;
      }
    },
  },
};
</script>
