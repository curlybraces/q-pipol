<template>
  <div id="q-app">
    <router-view />

    <cookie-law
      theme="blood-orange"
      buttonText="I understand"
      position="bottom"
      transitionName="fade"
    >
    </cookie-law>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CookieLaw from 'vue-cookie-law';

export default {
  components: {
    CookieLaw
  },
  name: 'App',
  computed: {
    ...mapState('auth', ['userLoaded', 'loggedIn']),
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', ['populateUser', 'logoutUser']),
    ...mapActions('options', ['initializeOptions'])
  },
  mounted() {
    this.initializeOptions();
    if (this.loggedIn) {
      this.populateUser();
    } else {
      console.log('User is not logged in');
    }
  }
};
</script>
