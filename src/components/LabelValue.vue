<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>{{ label }}</q-item-label>
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
