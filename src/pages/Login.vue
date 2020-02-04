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
          <q-toolbar color="primary">
            <q-icon avatar name="lock"></q-icon>
            <q-toolbar-title>
              <span class="text-subtitle1">
                {{
                  tab == "login"
                    ? `Login to your ${appTitle} Account`
                    : "Create new account"
                }}
              </span>
            </q-toolbar-title>
          </q-toolbar>
          <q-separator spaced />
          <q-card-section class="q-pa-md">
            <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit">
              <q-input
                v-if="tab == 'signup'"
                outlined
                placeholder="Full Name"
                type="text"
                v-model="name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Name is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="person"></q-icon>
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
                >
                  {{ tab == "login" ? "Login" : "Sign up" }}
                </q-btn>
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

export default {
  name: "PageLogin",
  data() {
    return {
      passwordVisibility: false,
      appTitle: "PIP Online System",
      name: null,
      username: null,
      password: null,
      tab: "login"
    };
  },
  methods: {
    ...mapActions("auth", ["login", "create"]),
    handleSubmit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          if (this.tab == "login") {
            this.login({
              username: this.username,
              password: this.password
            });
          } else {
            this.create({
              name: this.name,
              username: this.username,
              password: this.password
            });
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
