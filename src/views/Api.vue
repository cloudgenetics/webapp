<template>
  <div class="col-md-12 mb-3">
    <h1>Get API information</h1>
    <p>
      Fetch external API using an access token, and the API will validate it
      using the API's audience value.
    </p>
    <v-btn class="ma-2" @click="callApiEndpoint">
      Fetch Public API version
    </v-btn>
    <v-btn class="ma-2" @click="callApiSecuredEndpoint">
      Fetch Private API version
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
  </div>
</template>

<script>
import { HTTP } from "@/http-common";
import { redirectURL } from '../../auth_config.json'
export default {
  name: "Api",
  data() {
    return {
      apiMessage: null
    };
  },
  methods: {
    async callApiEndpoint() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.get("version", {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': `${redirectURL}`,
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
    },
    async callApiSecuredEndpoint() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.get("protected/version", {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': `${redirectURL}`,
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

