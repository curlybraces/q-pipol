<template>
  <q-item clickable @click="onClick" :disable="disabled">
    <q-item-section class="col-3" top>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
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
  props: {
    label: String,
    value: [String, Number, Array],
    caption: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
