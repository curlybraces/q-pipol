<template>
  <q-page padding>
    Resources Page
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PageResources',
  methods: {
    ...mapActions('resources',['fetchResources'])
  },
  mounted() {
    this.fetchResources();
  }
};
</script>
