<template>
  <q-item>
    <q-item-section class="col-3 gt-sm" top>
      <q-item-label>
        {{ label }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <slot></slot>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "FormElement",
  props: {
    label: String
  }
};
</script>
