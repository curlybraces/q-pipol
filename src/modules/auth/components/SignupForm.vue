<template>
  <q-form ref="signupForm" class="q-gutter-md" @submit="handleSubmit" greedy>
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
        {{ error.message }}

        <template v-slot:action>
          <q-btn
            flat
            round
            icon="close"
            @click="CLEAR_ERROR"
            v-test="{ id: 'clearError' }"
          />
        </template>
      </q-banner>
    </transition>

    <q-input
      outlined
      placeholder="Full Name"
      v-model="name"
      :rules="required"
      :dense="dense"
      hide-bottom-space
      v-test="{ id: 'name' }"
      dark
    >
      <template v-slot:prepend>
        <q-icon name="alternate_email"></q-icon>
      </template>
    </q-input>

    <q-input
      outlined
      v-model="username"
      :dense="dense"
      :loading="checkingEmail"
      placeholder="Email"
      @input="checkEmail"
      :rules="emailRule"
      hide-bottom-space
      v-test="{ id: 'username' }"
      dark
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="emailAvailable ? 'done_outline' : 'cancel'"
          :color="emailAvailable ? 'primary' : 'negative'"
          v-show="username && !checkingEmail"
        />
      </template>
    </q-input>

    <password-input
      placeholder="Password"
      v-model="password"
      :rules="passwordRule"
      v-test="{ id: 'password' }"
      dark
    />

    <password-input
      placeholder="Confirm Password"
      v-model="password_confirmation"
      :rules="match"
      v-test="{ id: 'password_confirmation' }"
      dark
    ></password-input>

    <div class="row">
      <q-btn
        class="full-width"
        type="submit"
        :color="dark ? 'purple-1' : 'primary'"
        unelevated
        :loading="loading"
        :dense="dense"
      >
        Sign up
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import PasswordInput from '../../ui/form-inputs/PasswordInput';
import { validateEmail } from '@/utils'

export default {
  name: 'SignupForm',
  components: { PasswordInput },
  data() {
    return {
      name: null,
      username: null,
      password: null,
      password_confirmation: null,
      required: [val => !!val || '* Required'],
      emailRule: [
        val => !!val || '* Required',
        val => this.validEmail(val) || 'Please input valid email.'
      ],
      passwordRule: [
        val => !!val || '* Required',
        val => val.length >= 8 || 'Password must at least be 8 characters.'
      ],
      match: [
        val => !!val || '* Required',
        val => this.passwordMatch(val) || 'Password does not match'
      ],
      checkingEmail: false,
      emailAvailable: false
    };
  },
  computed: {
    ...mapState('settings', ['dense', 'dark']),
    ...mapState('auth', ['error', 'loading'])
  },
  methods: {
    ...mapActions('auth', ['checkEmailAvailability', 'register']),
    ...mapMutations('auth', ['CLEAR_ERROR']),
    passwordMatch(val) {
      return val === this.password;
    },
    validEmail(email) {
      return validateEmail(email)
    },
    checkEmail() {
      const { username } = this.$data;
      if (this.validEmail(username)) {
        this.checkingEmail = true;
        this.checkEmailAvailability(username).then(res => {
          if (res) {
            this.emailAvailable = true;
          } else {
            this.emailAvailable = false;
          }
          this.checkingEmail = false;
        });
      }
    },
    handleSubmit() {
      const { name, username, password, password_confirmation } = this.$data;

      this.$refs.signupForm.validate().then(success => {
        if (success) {
          this.register({
            name: name,
            email: username,
            password: password,
            password_confirmation: password_confirmation
          });
          this.loading = false;
        }
      });
    }
  }
};
</script>
