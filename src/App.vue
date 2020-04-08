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
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('options', ['initializeOptions'])
  },
	mounted() {
  	if (this.loggedIn) {
  		this.initializeOptions();
		}
	}
};
</script>
