<template>
  <div class="col-md-12 mb-3">
    <h1>New genome dataset</h1>
    <v-file-input
      v-model="files"
      multiple
      show-size
      label="dataset input"
    ></v-file-input>
    <v-card elevation="2">
      <v-list-item v-for="(file, i) in files" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="file.name"></v-list-item-title>
          <v-list-item-title v-text="file.size"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-btn @click="uploadFiles">
      Upload
      <v-icon right dark> mdi-cloud-upload </v-icon>
    </v-btn>
  </div>
</template>

<script>
import createAuth0Client from "@auth0/auth0-spa-js";
import {
  domain,
  clientId,
  redirectURL,
  audience,
  serverUrl,
  apiVersion,
} from "../../auth_config.json";

export default {
  name: "S3Upload",
  data: () => ({
    files: [],
    uploads: [],
    progress: [],
  }),
  watch: {
    files: function () {
      console.log(this.files);
      this.progress = new Array(this.files.length).fill(0);
    },
  },
  methods: {
    uploadFiles() {
      for (let i = 0; i < this.files.length; i++) {
        this.uploads[i] = this.uploadFile(this.files[i], i);
        console.log(this.uploads[i]);
      }
    },
    async uploadFile(file, id) {
      this.progress[id] = 5;
      const auth0 = await createAuth0Client({
        domain: domain,
        client_id: clientId,
        redirect_uri: redirectURL,
      });
      var accessToken = await auth0.getTokenSilently({ audience });
      var uploadUrl = `${serverUrl}${apiVersion}signature`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': `${redirectURL}`,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: file.name,
          mime: file.type || "application/octet-stream",
        }),
      });
      if (response.ok) {
        const { datasetid, uploadUrl } = await response.json();
        this.progress[id] = 10;
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.upload.addEventListener(
          "progress",
          (e) =>
            (this.progress[id] = Math.round((e.loaded / e.total) * 90) + 10)
        );
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        try {
          await new Promise((resolve, reject) => {
            xhr.onload = (e) =>
              xhr.status - 200 < 100
                ? resolve()
                : reject(new Error("Failed to upload", e));
            xhr.onerror = (e) => reject(new Error("Failed to upload", e));
            xhr.send(file);
          });
          this.progress[id] = 100;
          const url = new URL(uploadUrl);
          return {
            url: `${url.protocol}//${url.host}${url.pathname}`,
            name: file.name,
            size: file.size,
            datasetid: datasetid,
          };
        } catch {
          // we'll suppress this since we have a catch all error
        }
      }
      // Catch all error
      console.log(
        "Sorry, we encountered an error when trying to upload your file."
      );
    },
  },
};
</script>