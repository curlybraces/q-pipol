<template>
  <q-toolbar>
    <q-item-label header class="q-pl-none text-h6 text-uppercase">
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
