<template>
  <div class="col-md-12 mb-3">
    <h1>New genome dataset</h1>
    <v-btn class="ma-2" @click="fetch_s3_url">
      Fetch S3 URL
    </v-btn>
    <div v-if="apiMessage" class="mt-5">
      <h6 class="muted">Info</h6>
      <div class="container-fluid">
        <div class="row">
          <code class="col-12 text-light bg-dark p-4">
            {{ JSON.stringify(apiMessage, null, "\t") }}
          </code>
        </div>
      </div>
    </div>
    <div class="input-area">
      <FormulateForm @submit="handleSubmit">
        <FormulateInput
          type="file"
          name="data"
          placeholder="genomics dataset"
          help="Select one or more datafiles to upload!"
          multiple
          validation=""
        />
        <FormulateInput type="submit" />
        <h4>Submitted Data</h4>
        <pre>{{ data }}</pre>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
export default {
  name: "Upload",
  data() {
    return {
      data: {},
      apiMessage: null
    };
  },
  methods: {
    async handleSubmit(data) {
      this.data = data;
    },
    async fetch_s3_url() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.get("presigned-s3-url/", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            this.apiMessage = response.data;
          })
          .catch(e => {
            this.errors.push(e);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
