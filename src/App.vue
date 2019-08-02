<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "App",
  methods: {
    ...mapActions('dropdown',['loadApprovalLevels','loadCategorizations','loadCipTypes','loadFundingInstitutions'])
  },
  mounted() {
    this.loadApprovalLevels();
    this.loadCategorizations();
    this.loadCipTypes();
    this.loadFundingInstitutions();
  }
};
</script>

<style></style>
