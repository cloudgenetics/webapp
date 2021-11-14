<template>
  <div class="col-md-12 mb-3">
    <h1>New genome dataset</h1>
    <v-file-input v-model="file" show-size label="dataset input"></v-file-input>
    <v-card elevation="2">
      <v-list-item v-for="(item, i) in file" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-btn @click="handleSubmit">
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
    file: [],
    uploads: [],
  }),
  watch: {
    file: function () {
      console.log(this.file);
    },
  },
  methods: {
    async handleSubmit() {
      // progress(5);
      const auth0 = await createAuth0Client({
        domain: domain,
        client_id: clientId,
        redirect_uri: redirectURL,
      });
      var accessToken = await auth0.getTokenSilently({ audience });
      var uploadUrl = `${serverUrl}${apiVersion}signature`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.file.name,
          mime: this.file.type || "application/octet-stream",
        }),
      });
      if (response.ok) {
        const { datasetid, uploadUrl } = await response.json();
        // progress(10);
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        // xhr.upload.addEventListener("progress", (e) =>
        // progress(Math.round((e.loaded / e.total) * 90) + 10)
        //);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        try {
          await new Promise((resolve, reject) => {
            xhr.onload = (e) =>
              xhr.status - 200 < 100
                ? resolve()
                : reject(new Error("Failed to upload", e));
            xhr.onerror = (e) => reject(new Error("Failed to upload", e));
            xhr.send(this.file);
          });
          console.log(100);
          const url = new URL(uploadUrl);
          return {
            url: `${url.protocol}//${url.host}${url.pathname}`,
            name: this.file.name,
            size: this.file.size,
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