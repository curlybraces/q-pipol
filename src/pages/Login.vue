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
              greedy
            >
              <q-input
                outlined
                placeholder="Full Name"
                v-model="name"
                v-if="tab == 'signup'"
                :rules="required"
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
                :rules="required"
              >
                <template v-slot:prepend>
                  <q-icon name="email"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    color="green"
                    name="done_outline"
                    v-if="availableEmail"
                  />
                </template>
              </q-input>

              <q-input
                outlined
                placeholder="Password"
                :type="!passwordVisibility ? 'password' : 'text'"
                v-model="password"
                :rules="required"
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
                :rules="required"
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
                  class="text-blue text-weight-bolder cursor-pointer"
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
        &copy; 2020 Investment Programming Division
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { laAtSolid } from '@quasar/extras/line-awesome';
import { CHECK_EMAIL_AVAILABILITY_QUERY } from '../constants/graphql';

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
      errorMessage: null,
      required: [val => !!val || '*Required']
    };
  },
  computed: {
    ...mapState('settings', ['dark']),
    availableEmail() {
      return this.checkEmail();
    }
  },
  methods: {
    ...mapActions('auth', [
      'populateUser',
      'loginUser',
      'forgotPassword',
      'register'
    ]),
    checkEmail() {
      const email = this.username;

      if (this.tab === 'signup' && this.validEmail(email)) {
        console.log('begin checking email');
        return this.$apollo
          .query({
            query: CHECK_EMAIL_AVAILABILITY_QUERY,
            variables: {
              email: email
            }
          })
          .then(res => {
            if (res.data.checkEmailAvailability.status === 'AVAILABLE') {
              return true;
            } else {
              return false;
            }
          })
          .catch(err => {
            console.log(err.message);
            return false;
          });
      }
    },
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
          this.forgotPassword(email);
        });
    },
    handleSubmit() {
      const { name, username, password, password_confirmation } = this.$data;

      this.$refs.loginForm.validate().then(success => {
        if (success) {
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
