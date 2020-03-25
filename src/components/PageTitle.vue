<template>
  <q-toolbar class="q-mt-lg">
    <q-item-label header class="q-pl-none">
      {{ title }}
    </q-item-label>

    <q-space />

    <slot></slot>
  </q-toolbar>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['title']
};
</script>
