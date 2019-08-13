<template>
  <q-page padding>
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
              >Investment Programming & Management System</span
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
          <login-register :tab="tab"></login-register>
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab"></login-register>
        </q-tab-panel>
      </q-tab-panels>

      <q-card-section class="bg-primary">
        <q-list dense>
          <q-item class="items-center">
            <q-item-section avatar>
              <q-icon name="fab fa-github" color="white" size="34px" />
            </q-item-section>
            <span class="text-white">Hosted at Github.io</span>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import LoginRegister from "../components/Auth/LoginRegister";
export default {
  components: {
    LoginRegister
  },
  name: "PageLogin",
  data() {
    return {
      tab: "login"
    };
  }
};
</script>

<style scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
