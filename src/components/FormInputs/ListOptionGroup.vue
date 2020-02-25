<template>
  <div>
    <q-item
      tag="label"
      v-for="(option, index) in options"
      :key="index"
      v-ripple
      clickable
    >
      <q-item-section avatar>
        <q-checkbox color="orange-10" v-model="model" :val="option.value" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ option.label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "ListOptionGroup",
  props: ["options", "value"],
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
