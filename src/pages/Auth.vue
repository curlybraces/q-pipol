<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-card-section class="bg-primary text-secondary">
        <div class="row items-center">
          <q-avatar color="white">
            <img src="statics/app-logo-128x128.png" />
          </q-avatar>
          <div class="headline q-ml-md text-weight-bolder">
            <span class="text-uppercase">Department of Agriculture</span>
            <br />
            Investment Programming & Management System
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
