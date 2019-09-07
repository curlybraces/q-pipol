<template>
  <q-page padding class="flex flex-center">
    <q-card class="auth-tabs align-center" square>
      <q-card-section class="bg-primary text-secondary">
        <div class="row items-center">
          <q-avatar color="white" class="q-mr-sm">
            <img src="statics/da-logo.png" />
          </q-avatar>
          <q-avatar color="white">
            <img src="statics/app-logo-128x128.png" />
          </q-avatar>
          <div class="headline q-ml-md text-weight-bold">
            <span class="text-uppercase">Department of Agriculture</span>
            <br />
            <span class="text-weight-light"
              >Investment Programming &amp; Management System</span
            >
          </div>
        </div>
      </q-card-section>

      <q-tabs
        v-model="tab"
        class="bg-primary text-grey-4"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register
            :tab="tab"
            @resetPassword="resetPassword = true"
          ></login-register>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>
      </q-tab-panels>

      <q-card-section class="bg-primary">
        <q-list dense>
          <q-item class="items-center">
            <q-avatar>
              <img src="statics/firebase.png" />
            </q-avatar>
            <span class="text-white">Powered by Google Firebase</span>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-dialog v-model="resetPassword">
      <q-card class="q-pa-md" style="min-width: 400px">
        <div class="column q-gutter-y-md">
          <span class="text-center">Reset Password</span>
          <q-input outlined dense v-model="email"></q-input>
          <q-btn
            label="Send Password Reset Link"
            @click="sendResetPasswordEmail"
          >
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { firebaseAuth } from "boot/firebase";
import { Dialog } from "quasar";
import LoginRegister from "../components/Auth/LoginRegister";
export default {
  components: {
    LoginRegister
  },
  name: "PageLogin",
  data() {
    return {
      tab: "login",
      resetPassword: false,
      email: ""
    };
  },
  methods: {
    sendResetPasswordEmail() {
      firebaseAuth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          Dialog.create({
            message: "We have sent a password reset link to the email provided."
          });
          this.resetPassword = false;
        })
        .catch(err => {
          Dialog.create(err.message);
        });
    }
  }
};
</script>

<style scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
