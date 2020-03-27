<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['userLoaded', 'loggedIn']),
    ...mapState('settings', ['dark'])
  },
  methods: {
    ...mapActions('auth', ['populateUser']),
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
