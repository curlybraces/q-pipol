<template>
  <div class="row items-start q-my-md">
    <div class="col-2 text-primary text-weight-bold">{{ label }}</div>
    <div class="col-10">
      <q-input
        dense
        type="text"
        outlined
        :placeholder="label"
        :hint="hint"
        ></q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
  	label: String,
    hint: String
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
