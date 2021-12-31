<template>
  <div>
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ $auth.user.name }}</h2>
        <p class="lead text-muted">{{ $auth.user.email }}</p>
      </div>
    </div>

    <div class="row">
      <pre class="col-12 text-light bg-dark p-4">{{
        JSON.stringify($auth.user, null, 2)
      }}</pre>
    </div>
    <v-btn class="ma-2" @click="registerUser">
      Register
    </v-btn>
  </div>
</template>



<script>
import { HTTP } from "@/http-common";
import { redirectURL } from '../../auth_config.json'

export default {
  name: "Account",
  data() {
    return {
      user: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        emailverify: this.$auth.user.emailverify,
        userid: this.$auth.user.sub,
      }
    }
  },
  methods: {
      async registerUser() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        console.log(JSON.stringify(this.user)),
        HTTP.post("user/register", JSON.stringify(this.user), {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': `${redirectURL}`,
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response.data)
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