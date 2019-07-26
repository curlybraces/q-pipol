<template>
  <q-input
    type="number"
    step="0.01"
    dense
    borderless
    input-class="text-right"
    @change="onInput"
    @input="onInput"
    v-model="value"></q-input>
</template>

<script>
export default {
  name: 'TableInputComponent',
  data () {
    return {
      value: 0
    }
  },
  methods: {
  	onInput() {
  		this.$emit('input', this.value)
    }
  }
}
</script>

<style>
</style>
