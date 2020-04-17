<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { LocalStorage, Notify } from 'quasar';

export default {
  name: 'App',
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
    ...mapActions('auth', ['getCurrentUser']),
    ...mapActions('options', ['initializeOptions'])
  },
  created() {
    const token = LocalStorage.getItem('token');

    if (!token || token === '') {
      this.$router.push('/');
    } else {
      this.getCurrentUser();
      this.initializeOptions();
    }
  }
};
</script>
