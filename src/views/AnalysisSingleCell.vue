<template>
  <div class="col-md-12 mb-3">
    <h1>Single-cell RNA analysis</h1>
    <v-text-field
      v-model="job.jobName"
      :rules="jobNameRules"
      label="enter a job name"
      required
    ></v-text-field>
    <v-select
      :items="datasets"
      item-text="name"
      item-value="uuid"
      v-model="datasetid"
      label="select a dataset"
      required
    ></v-select>
    <v-radio-group
      label="Select the reference sequence:"
      v-model="referenceSpecies"
      row
      required
    >
      <v-radio label="Human" value="Hsap_GRCh38_ensembl_release-103"></v-radio>
      <v-radio label="Mouse" value="Mmus_GRCm39_ensembl_release-103"></v-radio>
      <v-radio label="Mouse/human (mixed)" value="Hsap_Mmus"></v-radio>
    </v-radio-group>
    <v-text-field
      v-model="job.containerCommand"
      :rules="containerRules"
      label="job command"
    ></v-text-field>
    <v-btn class="ma-2" :disabled="jobSubmitted" @click="submitJob">
      Submit job
    </v-btn>
    <v-alert v-if="jobSubmitted" dense text type="info">
      Your job has been submitted to run on the cloud platform.
    </v-alert>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { audience, redirectURL, s3data, s3ref } from "../../auth_config.json";
export default {
  name: "AnalysisSingleCell",
  data() {
    return {
      jobSubmitted: false,
      jobNameRules: [
        (v) => !!v || "Job name is required",
        (v) =>
          /[a-zA-Z0-9\\-\\_]$/.test(v) || "No spaces or special characters",
      ],
      containerRules: [
        (v) => !!v || "Container name is required",
        (v) =>
          /^\S*$/.test(v) || "No spaces in container command",
      ],
      datasets: [],
      datasetid: null,
      referenceSpecies: null,
      job: {
        jobDefinition: "nextflow-cgxdevnextflow21",
        jobName: null,
        jobQueue: "priority-CGX-dev-gwfcore",
        nextflowPipeline: "/opt/work/rnaseq/main.nf",
        containerCommand: [],
      },
    };
  },
  created() {
    this.getDatasets();
  },
  watch: {
    datasetid: function () {
      this.job.containerCommand = [
        "--test",
        "true",
        "--test_path",
        s3data + this.datasetid,
        "--downsample",
        "false",
        "--rd",
        "false",
        "--genome_path",
        s3ref + this.referenceSpecies  + '/STAR_index',
        "--gtf_path",
        s3ref + this.referenceSpecies,
        "-profile",
        "tower",
      ];
    },
    referenceSpecies: function () {
      this.job.containerCommand = [
        "--test",
        "true",
        "--test_path",
        s3data + this.datasetid,
        "--downsample",
        "false",
        "--rd",
        "false",
        "--genome_path",
        s3ref + this.referenceSpecies + '/STAR_index',
        "--gtf_path",
        s3ref + this.referenceSpecies,
        "-profile",
        "tower",
      ];
    },
  },
  methods: {
    async getDatasets() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      HTTP.get("datasets", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((resp) => {
        this.datasets = resp.data;
      });
    },
    async submitJob() {
      const accessToken = await this.$auth.getTokenSilently();
      if (
        typeof this.job.containerCommand === "string" ||
        this.job.containerCommand instanceof String
      )
        this.job.containerCommand = this.job.containerCommand.split(",");
      try {
        HTTP.post("job/submit", JSON.stringify(this.job), {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${redirectURL}`,
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            console.log(response);
            this.jobSubmitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

