<template>
  <div class="row q-pa-sm">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Password</span>
      <p class="text-caption">
        Your password ensures secured access to your IPM System account and is
        used to log in.
      </p>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-form ref="changePasswordForm" @submit="updatePasswordDialog">
        <span class="text-weight-bold">Current Password</span>
        <q-input outlined dense type="password" v-model="old_password" />
        <p />
        <span class="text-weight-bold">New Password</span>
        <q-input
          outlined
          dense
          type="password"
          v-model="password"
          lazy-rules
          :rules="[
            val => val.length >= 8 || 'Password must be at least 8 characters',
            val =>
              val.toLowerCase() !== 'password' || 'Password cannot be password'
          ]"
        />
        <p />
        <span class="text-weight-bold">Confirm New Password</span>
        <q-input
          outlined
          dense
          type="password"
          v-model="password_confirmation"
          lazy-rules
          :rules="[val => val == password || 'Password does not match.']"
        />
        <p />
        <q-btn
          glossy
          label="Update Password"
          class="text-capitalize"
          dense
          color="primary"
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'UpdatePassword',
  data() {
    return {
      showPassword: false,
      old_password: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    ...mapActions('auth', ['updatePassword']),
    updatePasswordDialog() {
      const { password, old_password, password_confirmation } = this.$data;

      if (!old_password || !password || !password_confirmation) {
        alert('All fields are required.');
      } else {
        this.$q
          .dialog({
            title: 'Update Password',
            message:
              'Changing your password will log you out from the app. You will need to sign in again.',
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.updatePassword({
              old_password: old_password,
              password: password,
              password_confirmation: password_confirmation
            });
          });
      }
    }
  }
};
</script>
