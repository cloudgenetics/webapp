<template>
  <div class="col-md-12 mb-3">
    <v-file-input label="Select your file to upload" v-model="myFile">
      File to upload to S3
    </v-file-input>
    <v-btn class="ma-2" @click="upload_to_s3">
      Upload to S3
    </v-btn>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
export default {
  name: "Upload",
  data() {
    return {
      myFile: null
    };
  },
  methods: {
    async upload_to_s3() {
      try {
        const presignedS3Url = this.fetch_s3_url(this.myFile);
        console.log(presignedS3Url);

        const axiosResponse = HTTP.put(
          presignedS3Url,
          {
            data: this.myFile
          },
          {
            headers: {
              "Content-Type": "application/octet-stream"
            }
          }
        );
        console.info(axiosResponse);
      } catch (e) {
        console.error(e);
      }
    },
    fetch_s3_url(filename) {
      const accessToken = this.$auth.getTokenSilently();
      var s3url = "";
      try {
        HTTP.get("presigned-s3-url/" + filename, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            this.apiMessage = response.data;
            this.s3url = this.apiMessage["url"];
          })
          .catch(e => {
            this.errors.push(e);
          });
      } catch (e) {
        console.log(e);
      }
      return s3url;
    }
  }
};
</script>