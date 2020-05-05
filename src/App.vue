<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Notify } from 'quasar';

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
        this.$router.push('/dashboard');
      }
    }
  },
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  created() {
    this.getCurrentUser();
  }
};
</script>
