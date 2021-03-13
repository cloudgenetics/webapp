<template>
  <div>
    <h1>External API</h1>
    <p>
      You use will use a button to call an external API using an access token,
      and the API will validate it using the API's audience value.
      <strong>This route should be private</strong>.
    </p>
    <div
      class="btn-group mt-5"
      role="group"
      aria-label="External API Requests Examples"
    >
      <button type="button" class="btn btn-primary" @click="callApiEndpoint">
        Get Public Message
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="callApiSecuredEndpoint"
      >
        Get Private Message
      </button>
    </div>

    <div v-if="apiMessage" class="mt-5">
      <h6 class="muted">Result</h6>
      <div class="container-fluid">
        <div class="row">
          <code class="col-12 text-light bg-dark p-4">
            {{ JSON.stringify(apiMessage, null, 2) }}
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
export default {
  name: "About",
  data() {
    return {
      apiMessage: null
    };
  },
  methods: {
    async callApiEndpoint() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.get("", {
          mode: "no-cors",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response);
            this.apiMessage = response.data;
          })
          .catch(e => {
            this.errors.push(e);
          });
      } catch (e) {
        console.log(e);
      }
    },
    async callApiSecuredEndpoint() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.get("protected/", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response);
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

