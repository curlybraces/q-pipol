<template>
  <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit" greedy>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <q-banner
        inline-actions
        dense
        rounded
        class="bg-red text-white"
        v-if="error"
      >
        {{ error }}
        <template v-slot:action>
          <q-btn flat round icon="close" @click="clearError" />
        </template>
      </q-banner>
    </transition>

    <email-input
      v-model="username"
      :rules="[
        val => !!val || '* Required',
        val => validEmail(val) || 'Please enter valid email.'
      ]"
      v-test="{ id: 'username' }"
      dark
    ></email-input>

    <password-input
      placeholder="Password"
      v-model="password"
      :rules="required"
      v-test="{ id: 'password' }"
      dark
    ></password-input>

    <div class="row">
      <q-btn
        class="full-width"
        type="submit"
        :color="dark ? 'purple-1' : 'primary'"
        unelevated
        :loading="loading"
        v-test="{ id: 'login' }"
      >
        Login
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PasswordInput from '@/ui/form-inputs/PasswordInput';
import EmailInput from '@/ui/form-inputs/EmailInput';
import { validateEmail } from '@/utils';

export default {
  name: 'LoginForm',
  components: { EmailInput, PasswordInput },
  data() {
    return {
      username: null,
      password: null,
      required: [val => !!val || '* Required']
    };
  },
  computed: {
    ...mapState('settings', ['dark']),
    ...mapGetters('auth', ['loading', 'error', 'user'])
  },
  watch: {
    user(value) {
      // if user is logged in, redirect to homepage
      if (value) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    clearError() {
      this.$store.dispatch('auth/clearError');
    },
    validEmail(email) {
      return validateEmail(email);
    },
    handleSubmit() {
      // validate the form before calling login method
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const { username, password } = this.$data;

          const payload = {
            username: username,
            password: password
          };

          try {
            this.$store.dispatch('auth/signinUser', payload);
          } catch (err) {
            console.log(err.message);
          }
        }
      });
    }
  }
};
</script>
