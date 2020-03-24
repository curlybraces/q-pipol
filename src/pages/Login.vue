<template>
  <q-page padding>
    <div class="full-width column justify-center">
      <div class="row justify-center q-my-lg">
        <div class="column text-center">
          <div>
            <q-img src="statics/app-logo-128x128.png" width="128px" />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <q-card class="my-card">
          <div class="row q-pa-md text-weight-light text-h6">
            {{
              tab == 'login'
                ? 'Login to your account'
                : 'Sign up to create account'
            }}
          </div>

          <q-separator spaced />

          <q-card-section class="q-pa-md">
            <q-form
              ref="loginForm"
              class="q-gutter-md"
              @submit="handleSubmit"
              novalidate="true"
            >
              <div v-if="error" class="text-center text-red">
                An error occurred: {{ errorMessage }}
              </div>

              <q-input
                outlined
                placeholder="Full Name"
                v-model="name"
                lazy-rules
                v-if="tab == 'signup'"
                :rules="[val => !!val || 'Name is required.']"
              >
                <template v-slot:prepend>
                  <q-icon :name="laAtSolid"></q-icon>
                </template>
              </q-input>

              <q-input
                outlined
                placeholder="Email"
                type="email"
                v-model="username"
                lazy-rules
                :rules="[
                  val => validEmail(val) || 'Email is invalid.',
                  val => !!val || 'Email is required.'
                ]"
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
                :rules="[val => !!val || 'Password is required.']"
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

              <q-input
                v-if="tab == 'signup'"
                outlined
                placeholder="Confirm Password"
                :type="!passwordVisibility ? 'password' : 'text'"
                v-model="password_confirmation"
                lazy-rules
                :rules="[
                  val => passwordMatch(val) || 'Password does not match.'
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
                  :color="dark ? 'purple-1' : 'primary'"
                  unelevated
                  :loading="loading"
                >
                  {{ tab == 'login' ? 'Login' : 'Sign up' }}
                </q-btn>
              </div>
              <div class="text-center">
                <span
                  class="text-blue text-weight-lighter cursor-pointer"
                  @click="showForgotPasswordDialog"
                >
                  Forgot password
                </span>
              </div>
              <div class="text-center" v-if="tab == 'login'">
                Don't have an account?
                <span
                  class="text-blue text-wight-bolder cursor-pointer"
                  @click="tab = 'signup'"
                  >Sign up</span
                >
              </div>
              <div class="text-center" v-else>
                Alreay have an account?
                <span
                  class="text-blue text-eight-bolder cursor-pointer"
                  @click="tab = 'login'"
                >
                  Login
                </span>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <div class="row justify-center q-my-xl">
        &copy; 2020 Mark Lester Bolotaolo
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { laAtSolid } from '@quasar/extras/line-awesome';

export default {
  name: 'PageLogin',
  data() {
    return {
      passwordVisibility: false,
      appTitle: 'IP Online System',
      name: null,
      username: null,
      password: null,
      password_confirmation: null,
      tab: 'login',
      loading: false,
      error: false,
      errorMessage: null
    };
  },
  computed: {
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', [
      'populateUser',
      'loginUser',
      'forgotPassword',
      'register'
    ]),
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    passwordMatch(password) {
      return password === this.password;
    },
    showForgotPasswordDialog() {
      this.$q
        .dialog({
          title: 'Forgot Password',
          message: 'Enter your email below.',
          prompt: {
            model: '',
            type: 'text',
            isValid: val => this.validEmail(val)
          },
          cancel: true,
          persistent: true
        })
        .onOk(email => {
          this.forgotPassword(email).then(res => console.log(res));
        });
    },
    handleSubmit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const {
            name,
            username,
            password,
            password_confirmation
          } = this.$data;

          this.username = '';
          this.password = '';

          this.loading = true;

          if (this.tab == 'login') {
            const payload = {
              username: username,
              password: password
            };

            this.loginUser(payload).then(() => {
              this.username = username;
              this.password = password;
            });
          } else {
            this.name = '';
            this.password_confirmation = '';

            this.register({
              name: name,
              email: username,
              password: password,
              password_confirmation: password_confirmation
            }).then(res => console.log(res));
          }
          // Delay removal of loading indicator since it is sometimes too fast
          setTimeout(() => (this.loading = false), 1000);
        }
      });
    }
  },
  created() {
    this.laAtSolid = laAtSolid;
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}

.btn-login {
  text-transform: nne;
  font-weight: 300;
}

.fab.fa-google {
  color: #f44336;
}
</style>
