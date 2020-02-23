<template>
  <q-expansion-item
    expand-separator
    icon="layers"
    :label="label"
    :caption="caption"
    default-opened
  >
    <q-card class="q-pa-md">
      <q-list>
        <slot></slot>
      </q-list>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: "ExpansionItem",
  props: ["label", "caption"]
};
</script>
