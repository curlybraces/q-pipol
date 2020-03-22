<template>
  <q-page class="flex flex-center">
    <q-card style="width:360px;">
      <q-item-label class="text-weight-bold" header>Verify Email</q-item-label>
      <q-separator></q-separator>
      <q-card-section>
        <q-input outlined label="Token" v-model="token" readonly />
      </q-card-section>
      <q-card-actions class="q-pa-md">
        <q-btn
          color="primary"
          label="Verify Email"
          class="text-capitalize"
          @click="verifyMyEmail"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EmailVerify',
  data() {
    return {
      token: ''
    };
  },
  methods: {
    ...mapActions('auth', ['verifyEmail']),
    verifyMyEmail() {
      this.verifyEmail(this.token);
    }
  },
  mounted() {
    this.token = this.$route.query.token;
  }
};
</script>
