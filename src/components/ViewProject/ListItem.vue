<template>
  <q-item>
    <q-item-section class="col-2" top>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section top>
      {{ value }}
    </q-item-section>
    <q-item-section top side>
      <q-btn flat round icon="chevron_right" />
    </q-item-section>
  </q-item>
</template>

<script>
  export default {
    name: "ListItem",
    props: [
      "label", "value"
    ]
  }
</script>
