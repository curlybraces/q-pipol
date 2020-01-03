<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-xl">APP_LOGO</div>
      <div class="row justify-center">
        <q-card class="my-card">
          <q-toolbar color="primary">
            <q-icon avatar name="lock"></q-icon>
            <q-toolbar-title>Login</q-toolbar-title>
          </q-toolbar>
          <q-separator />
          <q-card-section>
            <q-item-label class="q-mt-md"
              >Sign in with email and password</q-item-label
            >
            <q-form class="q-gutter-md q-mt-md" @submit="login">
              <q-input
                outlined
                dense
                placeholder="Email"
                type="email"
                v-model="email"
              >
                <template v-slot:prepend>
                  <q-icon name="person"></q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                dense
                placeholder="Password"
                :type="!passwordVisibility ? 'password' : 'text'"
                v-model="password"
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
              <q-btn type="submit" flat>Submit</q-btn>
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
      email: null,
      password: null
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    login() {
      const { email, password } = this;
      if (!email || !password) {
        alert("Please enter email and password.");
      } else {
        // login logic here
        this.loginUser({
          email: email,
          password: password
        });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
