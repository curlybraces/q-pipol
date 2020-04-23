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
      }
    }
  },
  methods: {
    ...mapActions('auth', ['getCurrentUser']),
    ...mapActions('options', ['initializeOptions']),
    initialize() {
      this.getCurrentUser();
      this.initializeOptions();
    }
  },
  created() {
    console.log('initializing');
    this.initialize();
  }
};
</script>
