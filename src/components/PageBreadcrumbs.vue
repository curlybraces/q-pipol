<template>
  <q-toolbar inset :class="dark ? 'bg-grey-9' : 'bg-white'" class="shadow-2">
    <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el
        v-for="({ title, url }, index) in breadcrumbs"
        :key="index"
        :to="url"
        :class="dark ? 'text-white' : null"
      >
        {{ title }}
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </q-toolbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageBreadcrumbs',
  props: {
    breadcrumbs: Array
  },
  computed: {
    ...mapState('settings', ['dark'])
  }
};
</script>
