<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
	computed: {
  	...mapState('settings',['dark'])
	},
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  created() {
    this.getCurrentUser();
    this.$q.dark.set(this.dark)
  }
};
</script>
