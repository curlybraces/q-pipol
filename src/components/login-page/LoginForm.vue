<template>
  <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit" greedy>
    <p v-if="error">An error occurred.</p>
    <email-input
      v-model="username"
      :rules="[val => validEmail(val) || 'Please enter valid email.']"
    ></email-input>

    <password-input
      placeholder="Password"
      v-model="password"
      :rules="required"
    ></password-input>

    <div class="row">
      <q-btn
        class="full-width"
        type="submit"
        :color="dark ? 'purple-1' : 'primary'"
        unelevated
        :loading="loading"
      >
        Login
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PasswordInput from '../form-inputs/PasswordInput';
import EmailInput from '../form-inputs/EmailInput';
import ValidateEmailMixins from '../../mixins/ValidateEmailMixins';

export default {
  name: 'LoginForm',
  components: { EmailInput, PasswordInput },
  mixins: [ValidateEmailMixins],
  data() {
    return {
      error: false,
      username: null,
      password: null,
      required: [val => !!val || '* Required'],
      loading: false
    };
  },
  computed: {
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    handleSubmit() {
      this.loading = true;

      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const { username, password } = this.$data;

          const payload = {
            username: username,
            password: password
          };

          this.loginUser(payload);
        } else {
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
};
</script>
