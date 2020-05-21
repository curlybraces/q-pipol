<template>
  <q-page class="flex flex-center">
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

      <div class="row justify-center">
        Contact us
      </div>
    </div>
  </q-page>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'EmailVerify',
  data() {
    return {
      success: false
    };
  },
  beforeCreate() {
    console.log('beforeCreate');
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
          token: this.$route.query.token
        }
      })
      .then(({ data }) => {
        if (data.verifyEmail) {
          this.success = true;
        }
      })
      .catch(err => console.error(err));
  }
};
</script>
