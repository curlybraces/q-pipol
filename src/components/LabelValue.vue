<template>
  <q-item>
    <q-item-section class="col-3">
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ value }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "LabelValue",
  props: ["label", "value"]
};
</script>
