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
    ...mapState('auth', ['loggedIn'])
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
