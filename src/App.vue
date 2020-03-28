<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LocalStorage } from 'quasar';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['userLoaded']),
    ...mapState('settings', ['dark']),
    loggedIn: {
      get() {
        return LocalStorage.getItem('loggedIn');
      }
    }
  },
  methods: {
    ...mapActions('auth', ['populateUser']),
    ...mapActions('options', ['initializeOptions'])
  },
  mounted() {
    if (this.loggedIn) {
      this.populateUser();
      this.initializeOptions();
    } else {
      console.log('User is not logged in');
    }
  }
};
</script>
