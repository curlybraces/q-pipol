<template>
  <q-breadcrumbs
    separator=">"
    :class=" (dark) ? 'text-white': void 0 "
    :active-color=" (dark) ? 'warning': 'primary' "
    >
    <q-breadcrumbs-el
      v-for="item in breadcrumbs"
      :key="item.label"
      :icon="item.icon"
      :label="item.label"
      :to="item.link"
      />
  </q-breadcrumbs>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "BreadcrumbComponent",
    props: {
      breadcrumbs: Array
    },
    computed: {
      ...mapState("settings",["dark"])
    }
  }
</script>
