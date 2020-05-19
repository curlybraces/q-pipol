<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Password</span>
      <p class="text-caption">
        Your password ensures secured access to your IPM System account and is
        used to log in.
      </p>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-form
        ref="changePasswordForm"
        @submit="handleSubmit"
        class="q-gutter-y-sm"
        greedy
      >
        <div>
          <span class="text-weight-bold">Current Password</span>
          <q-input
            outlined
            dense
            :type="showPassword ? 'text' : 'password'"
            v-model="old_password"
            placeholder="Current Password"
            :rules="[val => !!val || 'Current password is required']"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
        <div>
          <span class="text-weight-bold">New Password</span>
          <q-input
            outlined
            dense
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="New Password"
            :rules="[
              val => val.length >= 8 || 'Password must at least be 8 characters'
            ]"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
        <div>
          <span class="text-weight-bold">Confirm New Password</span>
          <q-input
            outlined
            dense
            :type="showPassword ? 'text' : 'password'"
            v-model="password_confirmation"
            placeholder="Confirm Password"
            :rules="[
              val => !!val || '* Required',
              val => val === password || 'Password does not match'
            ]"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-btn
            label="Update Password"
            color="primary"
            type="submit"
          />
        </div>
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
    handleSubmit() {
      this.$refs.changePasswordForm.validate().then(success => {
        if (success) {
          const { password, old_password, password_confirmation } = this.$data;

          const payload = {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation
          }

          this.updatePasswordDialog(payload)
        } else {
          return;
        }
      })
    },
    updatePasswordDialog(payload) {
      this.$q
        .dialog({
          title: 'Update Password',
          message:
            'Changing your password will log you out from the app. You will need to sign in again.',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$store.dispatch('auth/updatePassword', payload)
        })
    }
  }
};
</script>
