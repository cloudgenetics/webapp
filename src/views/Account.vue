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

    <v-btn class="ma-2" @click="registerUser">
      Register
    </v-btn>
    <v-alert v-if="registerStatus === true" dense text type="success">
      User registeration <strong>successful</strong>.
    </v-alert>
    <v-alert v-if="registerStatus === false" dense text type="error">
      User registration <strong>failed.</strong> {{errmsg}}.
    </v-alert>
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
        email_verify: this.$auth.user.email_verified,
        userid: this.$auth.user.sub,
        updated_at: this.$auth.user.updated_at,
      },
      registerStatus: null,
      errmsg: null,
    }
  },
  methods: {
      async registerUser() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        HTTP.post("user/register", JSON.stringify(this.user), {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': `${redirectURL}`,
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log(response)
            if (response.data.msg == "success") {
              this.registerStatus = true;
            } else {
              this.registerStatus = false;
              this.errmsg = response.data.msg;
            }            
          })
          .catch(e => {
            this.errors.push(e);
            this.registerStatus = "fail";
            this.errmsg = e;
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>