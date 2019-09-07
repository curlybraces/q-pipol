<template>
  <q-form @submit.prevent="submitForm" @reset="onReset" class="q-gutter-y-sm">
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      {{ tab | titleCase }} to access your account anywhere.
    </q-banner>

    <q-input
      dense
      label="Email"
      type="email"
      ref="email"
      :rules="[
        val => isValidEmailAddress(val) || 'Please enter a valid email.'
      ]"
      lazy-rules
      outlined
      stack-label
      v-model="formData.email"
    ></q-input>

    <q-input
      dense
      label="Password"
      type="password"
      ref="password"
      :rules="[
        val => val.length >= 8 || 'Password must at least be 8 characters.'
      ]"
      lazy-rules
      outlined
      stack-label
      v-model="formData.password"
    ></q-input>

    <span @click="resetPassword">
      Click here to reset your password.
    </span>

    <div class="row">
      <q-space />
      <q-btn flat type="reset" label="Reset" />
      <q-btn type="submit" color="primary" :label="tab" class="q-ml-sm">
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginRegister",
  props: ["tab"],
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("operating_units", ["loadOperatingUnits"]),
    isValidEmailAddress(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    onReset() {
      this.formData = {};
    },
    ...mapActions("auth", ["registerUser", "loginUser"]),
    resetPassword() {
      this.$emit("resetPassword");
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style></style>
