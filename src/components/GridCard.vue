<template>
  <q-card class="fit cursor-pointer grid-card" @click="handleClick">
    <slot name="image" />
    <slot name="item" />
  </q-card>
</template>

<script>
export default {
  name: "GridCard",
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style>
.grid-card {
  transition: box-shadow 0.3s;
}

.grid-card:hover {
  opacity: 0.95;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
