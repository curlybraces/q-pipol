<template>
  <q-card square class="row q-pa-md bg-white text-uppercase" elevated>
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="({ title, url }, index) in breadcrumbs"
        :key="index"
        :to="url"
      >
        {{ title }}
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </q-card>
</template>

<script>
export default {
  name: "PageBreadcrumbs",
  props: {
    breadcrumbs: Array
  }
};
</script>
