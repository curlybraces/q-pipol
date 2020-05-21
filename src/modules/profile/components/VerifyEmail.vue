<template>
  <div class="row q-pa-sm q-col-gutter-lg">
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
      <submit-button
        label="Resend Email"
        @click="verifyEmail"
        v-if="!isVerified"
      ></submit-button>
      <span v-else>VERIFIED</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SubmitButton from '@/ui/buttons/SubmitButton';

export default {
  components: { SubmitButton },
  name: 'VerifyEmail',
  data() {
    return {
      resendingEmail: false
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isVerified'])
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
