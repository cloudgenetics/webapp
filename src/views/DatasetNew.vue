<template>
  <div class="col-md-12 mb-3">
    <h2>Genomics dataset: {{ datasetName }}</h2>
    <v-text-field
      v-if="!createDataset"
      label="Name of genome dataset"
      v-model="datasetName"
      outlined
      :disabled="createDataset"
    ></v-text-field>
    <v-btn
      v-if="!createDataset"
      @click="create_dataset"
      :disabled="!(this.datasetName.length > 0)"
    >
      Create dataset
      <v-icon right dark> mdi-folder-plus </v-icon>
    </v-btn>
    <Upload v-if="createDataset" v-bind:datasetid="datasetid" />
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import {
  redirectURL,
  audience,
} from "../../auth_config.json";
import Upload from './Upload.vue'

export default {
  name: "DatasetNew",
  components: {
    Upload
  },
  data: () => ({
    datasetid: null,
    datasetName: "",
    createDataset: false,
  }),
  watch: {
    files: function () {
      // this.progress = new Array(this.files.length).fill(0);
      this.files.forEach((file) => {
        file["status"] = "pending";
      });
      this.uploadDisabled = this.files.length === 0 ? true : false;
    },
  },
  methods: {
    create_dataset() {
      this.$auth.getTokenSilently({ audience }).then((accessToken) => 
        HTTP.post("dataset/new", JSON.stringify({ name: this.datasetName }), {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${redirectURL}`,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.datasetid = response.data["datasetid"];
          this.createDataset = true;
        })
        .catch((e) => {
          this.errors.push(e);
        })
      )
    },
  },
};
</script>