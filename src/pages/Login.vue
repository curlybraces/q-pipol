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

      <reset-password v-if="tab == 'reset'"></reset-password>

      <div class="row justify-center" v-else>
        <q-card class="my-card">


          <q-separator spaced />

          <q-card-section class="q-pa-md">
            <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit">
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
                lazy-rules
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
                  class="text-blue text-weight-bolder cursor-pointer"
                  @click="tab = 'signup'"
                  >Sign up</span
                >
              </div>
              <div class="text-center" v-else>
                Already have an account?
                <span
                  class="text-blue text-weight-bolder cursor-pointer"
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
import { register } from "../functions/function-register";

export default {
  name: "PageLogin",
  data() {
    return {
      passwordVisibility: false,
      appTitle: "PIP Online System",
      name: null,
      username: null,
      password: null,
      tab: "login",
      loading: false
    };
  },
  computed: {
    title() {
      if (this.tab == "login") {
        return "Login to your account";
      } else if (this.tab == "signup") {
        return "Sign up to a new account";
      } else {
        return "Reset password";
      }
    }
  },
  methods: {
    ...mapActions("auth", ["login", "create"]),
    handleSubmit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true;
          if (this.tab == "login") {
            this.login({
              username: this.username,
              password: this.password
            });
          } else {
            register({
              name: this.name,
              email: this.username,
              password: this.password
            }).then(() => (this.loading = false));
          }
        }
      });
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}

.btn-login {
  text-transform: none;
  font-weight: 300;
}

.fab.fa-google {
  color: #f44336;
}
</style>
