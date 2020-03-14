<template>
  <q-toolbar inset class="bg-white">
    <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el
        v-for="({ title, url }, index) in breadcrumbs"
        :key="index"
        :to="url"
      >
        {{ title }}
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </q-toolbar>
</template>

<script>
export default {
  name: "PageBreadcrumbs",
  props: {
    breadcrumbs: Array
  }
};
</script>
