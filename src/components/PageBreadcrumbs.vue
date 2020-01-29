<template>
  <div>
    <div class="row text-uppercase">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          v-for="({ title, url }, index) in breadcrumbs"
          :key="index"
          :to="url"
        >
          {{ title }}
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
  </div>
</template>

<script>
export default {
  name: "PageBreadcrumbs",
  props: {
    breadcrumbs: Array
  }
};
</script>
