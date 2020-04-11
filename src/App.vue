<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { LocalStorage, Notify } from 'quasar';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapGetters('auth', ['user'])
  },
  watch: {
    user(newValue) {
      if (newValue) {
        Notify.create({
          type: 'positive',
          message: 'Welcome back!',
          position: 'bottom-right',
          ignoreDefaults: true
        });
      }
    }
  },
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  created() {
    const token = LocalStorage.getItem('token');
    if (token) {
      this.getCurrentUser();
    }
  }
};
</script>
