<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-lg">
        <div class="column text-center">
          <div>
            <q-img src="../assets/logo.svg" style="width: 60px;" />
          </div>
          <div class="q-mt-sm text-h6 text-weight-bold text-primary">
            {{ appTitle }}
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <q-card class="my-card">
          <div class="row q-pa-md text-weight-light text-h6">
            {{
              tab == "login"
                ? "Login to your account"
                : "Sign up to create account"
            }}
          </div>

          <q-separator spaced />

          <q-card-section class="q-pa-md">
            <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit">
              <q-input
                outlined
                placeholder="Full Name"
                v-model="name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Name is required']"
                v-if="tab == 'signup'"
              >
                <template v-slot:prepend>
                  <q-icon :name="laAtSolid"></q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                placeholder="Email"
                type="email"
                v-model="username"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Email is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="email"></q-icon>
                </template>
              </q-input>

              <q-input
                outlined
                placeholder="Password"
                :type="!passwordVisibility ? 'password' : 'text'"
                v-model="password"
                lazy-rule
                :rules="[
                  val => (val && val.length > 0) || 'Password is required'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="
                      !passwordVisibility ? 'visibility' : 'visibility_off'
                    "
                    @click="passwordVisibility = !passwordVisibility"
                  ></q-icon>
                </template>
              </q-input>

              <div class="row">
                <q-btn
                  size="lg"
                  class="full-width btn-login"
                  type="submit"
                  color="red"
                  unelevated
                  :loading="loading"
                >
                  {{ tab == "login" ? "Login" : "Sign up" }}
                </q-btn>
              </div>
              <div class="text-center">
                <span
                  class="text-blue text-weight-lighter cursor-pointer"
                  @click="tab = 'reset'"
                >
                  Forgot password
                </span>
              </div>
              <div class="text-center" v-if="tab == 'login'">
                Don't have an account?
                <span
                  class="text-blue text-wight-bolder cursor-pointer"
                  @click="tab = 'signup'"
                  >Sign up</span
                >
              </div>
              <div class="text-center" v-else>
                Alreay have an account?
                <span
                  class="text-blue text-eight-bolder cursor-pointer"
                  @click="tab = 'login'"
                  >Login</span
                >
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="row justify-center q-my-xl">
        &copy; 2019 Mark Lester Bolotaolo
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { laAtSolid } from "@quasar/extras/line-awesome";
// import { LocalStorage } from "quasar";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../constants/graphql";
import { showErrorMessage } from "../functions/function-show-error-message";

export default {
  name: "PageLogin",
  data() {
    return {
      passwordVisibility: false,
      appTitle: "IP Online System",
      name: null,
      username: null,
      password: null,
      tab: "login",
      loading: false
    };
  },
  methods: {
    ...mapActions("auth", ["populateUser"]),
    handleSubmit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const { name, username, password } = this.$data;
          if (this.tab == "login") {
            this.loading = true;
            this.$apollo
              .mutate({
                mutation: LOGIN_MUTATION,
                variables: {
                  username,
                  password
                }
              })
              .then(res => {
                this.populateUser(res.data.login.user);
                localStorage.setItem("token", res.data.login.access_token);
                this.$router.push({ path: "/" });
              })
              .catch(err => {
                showErrorMessage(err.message);
              })
              .finally(() => (this.loading = false));
          } else {
            this.$apollo.mutate({
              mutation: REGISTER_MUTATION
            });
            console.log(name);
          }
        }
      });
    }
  },
  created() {
    this.laAtSolid = laAtSolid;
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}

.btn-login {
  text-transform: nne;
  font-weight: 300;
}

.fab.fa-google {
  color: #f44336;
}
</style>
