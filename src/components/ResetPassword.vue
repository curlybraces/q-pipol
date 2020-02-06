<template>
  <div class="row justify-center">
    <q-card class="my-card">
      <q-toolbar color="primary">
        <q-icon avatar name="lock"></q-icon>
        <q-toolbar-title>
          <span class="text-subtitle1">
            Reset Password
          </span>
        </q-toolbar-title>
      </q-toolbar>
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

          <div class="row">
            <q-btn
              size="lg"
              class="full-width btn-login"
              type="submit"
              color="red"
              unelevated
              :loading="loading"
            >
              Reset Password
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
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
