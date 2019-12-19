<template>
  <q-form class="q-pa-md">
    <div class="text-h5 font-weight-bold">
      {{ loginForm ? "Sign in" : "Sign up" }}
    </div>
    <div class="text-caption">
      <span @click="loginForm = !loginForm">
        {{ loginForm ? "or create an account" : "or sign in to your account" }}
      </span>
    </div>
    <q-input
      outlined
      class="q-my-md"
      placeholder="Name"
      v-model="displayName"
      v-if="!loginForm"
    >
    </q-input>
    <q-input outlined class="q-my-md" placeholder="Email" v-model="email">
    </q-input>
    <q-input
      outlined
      class="q-my-md"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility_off' : 'visibility'"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
    <q-checkbox
      v-if="!loginForm"
      label="I agree to the terms and conditions of this app."
      v-model="agree"
    ></q-checkbox>
    <q-btn
      :label="loginForm ? 'Sign in' : 'Sign up'"
      color="primary"
      class="full-width q-my-md"
      size="lg"
      type="submit"
      @click="submitForm"
    ></q-btn>
    <div
      v-if="loginForm"
      class="text-subtitle1 text-blue"
      @click="resetPassword"
    >
      Forgot password?
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
import { showErrorMessage } from "src/functions/function-show-error-message";

export default {
  name: "LoginForm",
  data() {
    return {
      loginForm: true,
      showPassword: false,
      email: "",
      password: "",
      displayName: "",
      agree: false
    };
  },
  methods: {
    ...mapActions("auth", [
      "loginUser",
      "registerUser",
      "resetPassword",
      "sendResetPasswordEmail"
    ]),
    resetPassword() {
      this.$q
        .dialog({
          title: "Reset Password",
          message: "Enter your email below.",
          prompt: {
            model: "",
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          console.log(data);
          this.sendResetPasswordEmail({
            email: data
          });
        });
    },
    submitForm() {
      if (!this.email || !this.password) {
        showErrorMessage("Email and password is required.");
      } else {
        if (this.loginForm) {
          this.loginUser({
            email: this.email,
            password: this.password
          });
        } else {
          if (!this.displayName) {
            showErrorMessage("Please tell us what to call you.");
          } else {
            if (!this.agree) {
              showErrorMessage(
                "You must agree with the terms and conditions of this app."
              );
            } else {
              this.registerUser({
                email: this.email,
                password: this.password,
                displayName: this.displayName
              });
            }
          }
        }
      }
    }
  }
};
</script>
