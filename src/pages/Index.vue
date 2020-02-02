<template>
  <q-page padding>
    <page-breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card square>HOME PAGE ANALYTICS</q-card>
  </q-page>
</template>

<script>
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default {
  components: { PageBreadcrumbs },
  name: "PageIndex",
  data() {
    return {
      breadcrumbs: [
        {
          title: "Home"
        }
      ]
    };
  },
  methods: {}
};
</script>
