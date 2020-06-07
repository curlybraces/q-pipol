<template>
  <q-page class="flex flex-center">
    <template v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>
    <template v-else>
      <div class="column q-gutter-y-xl" v-if="success">
        <div class="text-h3 text-center">
          You have successfully verified your email.
        </div>

        <div class="row justify-center">
          <q-btn size="lg" color="primary" label="Login" to="/login"></q-btn>
        </div>
      </div>
      <div v-else>
        <div class="text-h3 text-center">Something went wrong.</div>
      </div>
    </template>
  </q-page>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'EmailVerify',
  data() {
    return {
      loading: true,
      success: false
    };
  },
  created() {
    this.loading = true;

    const TOKEN = this.$route.query.token ? this.$route.query.token : null;

    if (!TOKEN) {
      this.loading = false;
      this.success = false;
      alert('Unable to retrieve token. Please check the email again.');
    } else {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation verifyEmail($token: String!) {
              verifyEmail(input: { token: $token }) {
                access_token
                refresh_token
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            token: TOKEN
          }
        })
        .then(({ data }) => {
          if (data.verifyEmail) {
            this.success = true;
          }
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
