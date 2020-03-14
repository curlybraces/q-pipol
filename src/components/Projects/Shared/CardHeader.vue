<template>
  <q-card-section>
    <q-toolbar>
      <q-avatar>
        <q-icon name="edit" />
      </q-avatar>
      <q-toolbar-title>
        <slot></slot>
      </q-toolbar-title>
      <q-space />
      <slot name="right"></slot>
    </q-toolbar>
    <q-separator></q-separator>
  </q-card-section>
</template>

<script>
export default {
  name: 'CardHeader'
};
</script>
