<template>
  <div class="row q-pa-sm">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Verify Email</span>
      <div class="text-caption">
        Verify your email to secure your account. Your email will be used to
        receive important updates from the System. Your email will also be used
        to retrieve your password. Only users with verified email can manage
        projects.
      </div>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-btn
        outline
        dense
        class="text-capitalize"
        color="primary"
        label="Verify Email"
        @click="verifyEmail"
        :loading="resendingEmail"
        v-if="!isVerified"
      ></q-btn>
      <q-btn
        color="primary"
        v-else
        label="Verified"
        outline
        icon="check_outline"
        disable
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'VerifyEmail',
  data() {
    return {
      resendingEmail: false
    };
  },
  computed: {
    ...mapState('auth', ['user']),
		...mapGetters('auth',['isVerified'])
  },
  methods: {
    ...mapActions('auth', ['resendEmailVerification']),
    verifyEmail() {
      this.resendingEmail = true;
      this.resendEmailVerification(this.user.email);
      setTimeout(() => (this.resendingEmail = false), 3000);
    }
  }
};
</script>
