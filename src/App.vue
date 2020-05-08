<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
// import { Notify } from 'quasar';
import { mapActions } from 'vuex'

export default {
  name: 'App',
	// computed: {
  // 	...mapGetters('auth',['user'])
	// },
  // watch: {
  //   user(newValue) {
  //     if (newValue) {
  //       Notify.create({
  //         type: 'positive',
  //         message: 'Welcome back!',
  //         position: 'bottom-right',
  //         ignoreDefaults: true
  //       });
  //       this.$router.push('/');
  //     }
  //   }
  // },
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  created() {
    this.getCurrentUser();
  }
};
</script>
