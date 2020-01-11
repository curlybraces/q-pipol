<template>
  <div>
    <span class="gt-sm q-ml-sm q-mr-md">View:</span>
    <q-btn-toggle
      v-model="view"
      dense
      push
      toggle-color="primary"
      :options="options"
      @input="toggleView"
    >
      <template v-slot:grid>
        <q-icon name="apps"></q-icon>
        <q-tooltip>Grid view</q-tooltip>
      </template>

      <template v-slot:list>
        <q-icon name="list"></q-icon>
        <q-tooltip>List view</q-tooltip>
      </template>
    </q-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "ToggleView",
  data() {
    return {
      view: "grid",
      options: [
        {
          value: "grid",
          slot: "grid"
        },
        {
          value: "list",
          slot: "list"
        }
      ]
    };
  },
  methods: {
    toggleView() {
      this.$emit("input", this.view);
    }
  }
};
</script>
