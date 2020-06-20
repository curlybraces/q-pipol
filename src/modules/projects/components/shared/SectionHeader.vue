<template>
  <q-toolbar class="bg-secondary text-white">
    <q-toolbar-title class="absolute-center">{{
      sectionTitle
    }}</q-toolbar-title>
  </q-toolbar>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: ['sectionTitle']
};
</script>
