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
        <q-card bordered flat class="my-card bg-info" dark square>
          <div class="row q-pa-md text-weight-light text-h6">
            {{
              tab == 'login'
                ? 'Login to your IPMS Account'
                : 'Create an IPMS Account'
            }}
          </div>

          <q-separator color="white" spaced />

          <q-card-section class="q-pa-md">
            <login-form v-if="tab === 'login'"></login-form>
            <signup-form v-else></signup-form>
          </q-card-section>
          <q-card-section class="q-gutter-md">
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
              Already have an account?
              <span
                class="text-blue text-weight-bolder cursor-pointer"
                @click="tab = 'login'"
              >
                Login
              </span>
            </div>
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
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { validateEmail } from '@/utils';

export default {
  name: 'PageLogin',
  components: { SignupForm, LoginForm },
  data() {
    return {
      appTitle: 'IP Online System',
      tab: 'login'
    };
  },
  computed: {
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', ['forgotPassword', 'register']),
    showForgotPasswordDialog() {
      this.$q
        .dialog({
          title: 'Forgot Password',
          message: 'Enter your email below.',
          prompt: {
            model: '',
            type: 'text',
            isValid: val => validateEmail(val)
          },
          cancel: true,
          persistent: true
        })
        .onOk(email => {
          this.forgotPassword(email);
        });
    }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 400px;
}

.fab.fa-google {
  color: #f44336;
}
</style>
