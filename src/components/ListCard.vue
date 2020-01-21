<template>
  <q-card
    unelevated
    class="q-mx-xs cursor-pointer list-card"
    @click="handleClick"
  >
    <q-item>
      <q-item-section class="col-2">
        <slot name="image"></slot>
      </q-item-section>
      <q-item-section top>
        <slot name="item"></slot>
      </q-item-section>
      <q-item-section side top>
        <slot name="side"></slot>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: "ListCard",
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style>
.list-card:hover {
  opacity: 0.95;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(36, 33, 36, 1);
  -moz-box-shadow: 0px 0px 8px 0px rgba(36, 33, 36, 1);
  box-shadow: 0px 0px 8px 0px rgba(36, 33, 36, 1);
}
</style>
