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
    <v-btn v-if="!createDataset" @click="create_dataset" :disabled="!(this.datasetName.length > 0)">
      Create dataset
      <v-icon right dark> mdi-folder-plus </v-icon>
    </v-btn>
    <div v-if="createDataset">
      <v-file-input
        v-model="files"
        multiple
        show-size
        label="add files"
      ></v-file-input>
      <v-btn
        @click="uploadFiles"
        :disabled="uploadDisabled"
        :color="uploadDisabled ? '#cccccc' : 'success'"
      >
        Upload
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>

      <v-alert v-if="uploadStatus === 'success'" dense text type="success">
        Upload completed <strong>successfully</strong>.
      </v-alert>
      <v-alert v-if="uploadStatus === 'fail'" dense text type="error">
        Upload <strong>failed</strong>.
      </v-alert>
      <v-card elevation="2">
        <v-col cols="12" v-if="uploadProgress">
          <v-progress-linear
            color="grey accent-4"
            v-model="progress"
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
        <v-list-item v-for="(file, i) in files" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="file.name"></v-list-item-title>
            <v-card-text
              >Size: {{ file.size / 1000 }} kb <br />
              Upload: {{ file.status }} <br />
              Progress: {{ progress }} %
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import UploadStatus from "../upload-status";
import {
  redirectURL,
  audience,
  serverUrl,
  apiVersion,
} from "../../auth_config.json";

export default {
  name: "DatasetNew",
  data: () => ({
    files: [],
    uploadProgress: false,
    uploadDisabled: true,
    uploadStatus: UploadStatus.Pending,
    progress: 0,
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
    async create_dataset() {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      // var uploadUrl = `${serverUrl}${apiVersion}dataset/new`;
      // Register new dataset in DB and retrieve dataset id
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
        });
    },
    uploadFiles() {
      this.uploadProgress = true;
      this.uploadDisabled = true;
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].status = "in progress";
        this.uploadFile(this.files[i]).then((response) => {
          this.files[i].status =
            response.status == 200 ? "complete" : response.status;
          if (
            this.files.filter((file) => file.status === "complete").length ==
            this.files.length
          )
            this.uploadStatus = UploadStatus.Success;
          this.uploadProgress = false;
        });
      }
    },
    async uploadFile(file) {
      const accessToken = await this.$auth.getTokenSilently({ audience });
      var uploadUrl = `${serverUrl}${apiVersion}dataset/uploadurl`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: file.name,
          uuid: this.datasetid,
          mime: file.type || "application/octet-stream",
        }),
      });
      if (response.ok) {
        const { datasetid, uploadUrl } = await response.json();
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.upload.addEventListener(
          "progress",
          (e) => (this.progress = Math.round((e.loaded / e.total) * 90) + 10)
        );
        try {
          await new Promise((resolve, reject) => {
            xhr.onload = (e) =>
              xhr.status - 200 < 100
                ? resolve()
                : reject(new Error("Failed to upload", e));
            xhr.onerror = (e) => reject(new Error("Failed to upload", e));
            xhr.send(file);
          });
          const url = new URL(uploadUrl);
          return {
            url: `${url.protocol}//${url.host}${url.pathname}`,
            name: file.name,
            size: file.size,
            datasetid: datasetid,
            status: xhr.status,
          };
        } catch {
          // we'll suppress this since we have a catch all error
        }
      }
      this.uploadStatus = UploadStatus.Fail;
      // Catch all error
      console.log(
        "Sorry, we encountered an error when trying to upload your file."
      );
    },
  },
};
</script>